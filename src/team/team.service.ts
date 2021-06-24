import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './models/team.entity';
import { Match } from '../match/models/match.entity';
import { Member } from '../member/models/member.entity';
import { CreateTeamDto, PatchTeamDto } from './team.dto';

export const MAX_MEMBERS_PER_TEAM = 10;

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private connection: Repository<Team>,
  ) {}

  /**
   * @description Throws a not found error
   * @throws
   *
   * @param {string} [message] Error message
   */
  private notFound(message?: string): never {
    throw new HttpException(message || 'Not Found', 404);
  }

  /**
   * @description Counts the number of members in a team that can still be created
   * @throws
   *
   * @param teamId Team uuid
   * @returns {number} Number of available members left before max is reached
   */
  public async getNumMembersLeft(teamId: string): Promise<number> {
    return this.connection.manager
      .count(Member, {
        where: { team_id: teamId },
      })
      .then((num: number) => {
        return MAX_MEMBERS_PER_TEAM - num;
      })
      .catch((error) => {
        console.error(error);
        throw new HttpException(
          'Failed to count number of members in team',
          500,
        );
      });
  }

  /**
   * @description Updates a member entity
   * @throws
   *
   * @param {Member} mem Member entity
   * @param {Object} data Update data
   * @returns {string} Done
   */
  private async updateMember(
    mem: Member,
    data: Record<string, any>,
  ): Promise<string> {
    mem.update(data);
    return this.connection.manager
      .save(mem)
      .then(() => 'Done')
      .catch((error) => {
        console.error(error);
        throw new HttpException('Failed to run update', 500);
      });
  }

  /**
   * @description Finds a Team by uuid and throws a 404 error if not found
   * @throws
   *
   * @param {string} teamId Team uuid
   * @returns {Team}
   */
  public async exists(teamId: string): Promise<Team> {
    const data = await this.connection.findOne(teamId).catch((error) => {
      console.error(error);
      this.notFound();
    });
    if (!data) this.notFound();
    return data;
  }

  /**
   * @description Gets all Teams
   * @throws
   *
   * @returns {Array<Team>}
   */
  public async getTeams(): Promise<Array<Team>> {
    return this.connection.find();
  }

  /**
   * @description Creates a new Team
   * @throws
   *
   * @param {CreateTeamDto} data Team information
   * @returns {string}
   */
  public async createTeam(data: CreateTeamDto): Promise<string> {
    const team = new Team(data);

    // Make sure member is a free-agent or already part of team
    const partOfTeam = (team_id: string | null, title: string): boolean => {
      if (team_id == null || team_id === team.id) return true;
      throw new HttpException(
        `Cannot assign ${title} from a different team`,
        400,
      );
    };

    // Make sure coach and captain exists and can be assigned to team
    let captain: Member;
    if (data.captain) {
      captain = await this.connection.manager
        .findOne(Member, data.captain)
        .catch((error) => {
          console.error(error);
          throw new HttpException('Failed to validate captain', 500);
        });
      if (!captain) throw new HttpException('Captain not found', 404);
      partOfTeam(captain?.team_id, 'captain');
    }

    let coach: Member;
    if (data.coach && data.captain !== data.coach) {
      coach = await this.connection.manager
        .findOne(Member, data.coach)
        .catch((error) => {
          console.error(error);
          throw new HttpException('Failed to validate coach', 500);
        });
      if (!coach) throw new HttpException('Coach not found', 404);
      partOfTeam(coach?.team_id, 'coach');
    }

    // Make sure team name is unique
    const teamName = await this.connection
      .findOne({
        where: {
          name: data.name,
        },
      })
      .catch((error) => {
        console.error(error);
        throw new HttpException('Failed to validate team name', 500);
      });

    if (teamName)
      throw new HttpException('Team with this name already exists', 400);

    // Create team
    await this.connection.save(team).catch(() => {
      throw new HttpException('Failed to create team', 500);
    });

    // Assign coach/captain to this team
    try {
      if (captain && captain.team_id == null)
        await this.updateMember(captain, { team_id: team.id });
      if (coach && coach.team_id == null && data.captain !== data.coach)
        await this.updateMember(coach, { team_id: team.id });
    } catch (error) {
      console.error(error);
      await this.connection.delete(team.id).catch(console.error);
      throw new HttpException('Failed to update dependent member', 500);
    }

    return 'Done';
  }

  /**
   * @description Finds Team by uuid
   * @throws
   *
   * @param {string} teamId Team uuid
   * @returns {Team}
   */
  public async getTeam(teamId: string): Promise<Team> {
    return this.exists(teamId);
  }

  /**
   * @description Gets all Matches played by a given Team
   * @throws
   *
   * @param {string} teamId Team uuid
   * @returns {Array<Match>}
   */
  public async getTeamMatches(teamId: string): Promise<Array<Match>> {
    await this.exists(teamId);
    return this.connection.manager.find(Match, {
      where: [{ home: teamId }, { team: teamId }], // OR
    });
  }

  /**
   * @description Gets all Members for a given team that match the given optional parameters
   * @throws
   *
   * @param {string} teamId Team uuid
   * @param {string} [status] Person status
   * @param {string} [role] Person role
   * @returns {Array<Member>}
   */
  public async getMembers(
    team_id: string,
    status?: string,
    role?: string,
  ): Promise<Array<Member>> {
    await this.exists(team_id);

    return this.connection.manager.find(Member, {
      where: {
        team_id,
        ...(status ? { status } : {}),
        ...(role ? { role } : {}),
      },
    });
  }

  /**
   * @description Gets a given Teams statistics
   * @throws
   *
   * @param {string} teamId Team uuid
   * @returns {{wins, losses, matches, players}}
   */
  public async getStats(
    team_id: string,
  ): Promise<{
    wins: number;
    losses: number;
    matches: number;
    players: number;
  }> {
    // Make sure team exists
    await this.exists(team_id);

    const internal = (error: any): never => {
      console.error(error);
      throw new HttpException('Failed to get team stats', 500);
    };

    // Count all wins
    const wins = await this.connection.manager
      .createQueryBuilder(Match, 'match')
      .where(
        '(team = :team_id AND "away-score" > "home-score") OR (home = :team_id AND "home-score" > "away-score")',
        { team_id },
      )
      .getCount()
      .catch(internal);

    // Count all losses
    const losses = await this.connection.manager
      .createQueryBuilder(Match, 'match')
      .where(
        '(team = :team_id AND "away-score" < "home-score") OR (home = :team_id AND "home-score" < "away-score")',
        { team_id },
      )
      .getCount()
      .catch(internal);

    // Count all matches
    // Not simply adding wins / losses so we can account for draws and any entries not caught by > or <
    const matches = await this.connection.manager
      .createQueryBuilder(Match, 'match')
      .where('team = :team_id OR home = :team_id', { team_id })
      .getCount()
      .catch(internal);

    // Count all players
    const players = await this.connection.manager
      .createQueryBuilder(Member, 'member')
      .where('team_id = :team_id', { team_id })
      .getCount()
      .catch(internal);

    return {
      wins,
      losses,
      matches,
      players,
    };
  }

  /**
   * @description Updates a Team
   * @throws
   *
   * @param {string} teamId Team uuid
   * @param {PatchTeamDto} data Update data
   * @returns {string}
   */
  public async updateTeam(teamId: string, data: PatchTeamDto): Promise<string> {
    // Make sure team exists
    const team = await this.exists(teamId);
    team.update(data);

    const internal = (error?: any): never => {
      console.error(error);
      throw new HttpException('Failed to update team', 500);
    };

    const checkUser = (mem: string, member: any) => {
      if (!member) throw new HttpException(`${mem} not found`, 404);
      if (member.team_id && member.team_id !== teamId)
        throw new HttpException(`Cannot assign ${mem} from another team`, 400);
      return member;
    };

    // If updating coach or captain make sure those members exists
    // Also make sure coach and captain belong to this team
    let captain: Member;
    if (data.captain) {
      captain = await this.connection.manager
        .findOne(Member, data.captain)
        .catch(internal);
      checkUser('captain', captain);
    }

    let coach: Member;
    if (data.coach) {
      coach = await this.connection.manager
        .findOne(Member, data.coach)
        .catch(internal);
      checkUser('coach', coach);
    }

    // Make sure team name is unique if it's being updated
    if (data.name) {
      const teamName = await this.connection
        .findOne({
          where: {
            name: data.name,
          },
        })
        .catch((error) => {
          console.error(error);
          throw new HttpException('Failed to validate team name', 500);
        });

      if (teamName)
        throw new HttpException('Team with this name already exists', 400);
    }

    // Make sure max number of team members has not been reached;
    if (captain || coach) {
      let newMembersAdded = 0;

      // Count number of free-agents being re-assigned to this team
      if (captain && captain.team_id !== teamId) newMembersAdded += 1;
      if (coach && coach.team_id !== teamId) newMembersAdded += 1;

      if (newMembersAdded !== 0) {
        const membersLeft = await this.getNumMembersLeft(teamId);
        if (membersLeft - newMembersAdded < 0)
          throw new HttpException('Max number of team members exceeded', 400);
      }
    }

    await this.connection.save(team).catch(internal);

    // Update captain if necessary
    if (captain) await this.updateMember(captain, { team_id: team.id });

    // Update coach if necessary
    if (coach) await this.updateMember(coach, { team_id: team.id });

    return 'Done';
  }

  /**
   * @description Deletes a given Team
   * @throws
   *
   * @param {string} teamId Team uuid
   * @returns {string}
   */
  public async deleteTeam(teamId: string): Promise<string> {
    await this.exists(teamId);

    // Update all member accounts belonging to this team
    await this.connection.manager
      .update(Member, { team_id: teamId }, { team_id: null })
      .catch((error) => {
        console.error(error);
        throw new HttpException('Failed to update team members', 500);
      });

    await this.connection.delete(teamId).catch((error) => {
      console.error(error);
      throw new HttpException('Failed to delete team', 500);
    });

    return 'Done';
  }
}
