import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './models/team.entity';
import { Match } from '../match/models/match.entity';
import { Member } from '../member/models/member.entity';
import { TeamDto } from './team.dto';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private connection: Repository<Team>,
  ) {}

  private notFound(): never {
    throw new HttpException('Not Found', 404);
  }

  private async exists(teamId: string) {
    return this.connection
      .findOne(teamId)
      .then((data) => {
        if (!data) this.notFound();
        return data;
      })
      .catch(() => {
        this.notFound();
      });
  }

  public async getTeams() {
    return this.connection.find();
  }

  public async createTeam(data: TeamDto) {
    const team = new Team(data);

    // Make sure member is a free-agent or already part of team
    const partOfTeam = (team_id: string | null, title: string): boolean => {
      if (team_id == null || team_id === team.id) return true;
      throw new HttpException(
        `Cannot assign ${title} from a different team`,
        400,
      );
    };

    const updateMember = async (id: string) =>
      this.connection.manager
        .update(Member, id, { team_id: team.id })
        .catch((error) => {
          console.error(error);
          throw new HttpException('Failed to run update', 500);
        });

    // Make sure coach and captain exists and can be assigned to team
    let captain;
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

    let coach;
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

    // Create team
    await this.connection.save(team).catch(() => {
      throw new HttpException('Failed to create team', 500);
    });

    // Assign coach/captain to this team
    try {
      if (captain && captain.team_id == null) await updateMember(captain.id);
      if (coach && coach.team_id == null && data.captain !== data.coach)
        await updateMember(coach.id);
    } catch (error) {
      console.error(error);
      await this.connection.delete(team.id).catch(console.error);
      throw new HttpException('Failed to update dependent member', 500);
    }

    return 'Done';
  }

  public async getTeam(teamId: string) {
    return this.exists(teamId);
  }

  public async getTeamMatches(teamId: string) {
    await this.exists(teamId);
    return this.connection.manager.find(Match, {
      where: [{ home: teamId }, { team: teamId }], // OR
    });
  }

  public async getMembers(team_id: string, status?: string, role?: string) {
    await this.exists(team_id);

    return this.connection.manager.find(Member, {
      where: {
        team_id,
        ...(status ? { status } : {}),
        ...(role ? { role } : {}),
      },
    });
  }

  public async getStats(team_id: string) {
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

  public async updateTeam(teamId: string, data: Record<string, any>) {
    // Make sure team exists
    await this.exists(teamId);

    const internal = (error?: any): never => {
      console.error(error);
      throw new HttpException('Failed to update team', 500);
    };

    const checkUser = (mem: string, member: any) => {
      if (!member) throw new HttpException(`${mem} not found`, 404);
      if (member.team_id !== teamId)
        throw new HttpException(`Cannot assign ${mem} from another team`, 400);
      return member;
    };

    // If updating coach or captain make sure those members exists
    // Also make sure coach and captain belong to this team
    if (data.captain) {
      const captain = await this.connection.manager
        .findOne(Member, data.captain)
        .catch(internal);
      checkUser('captain', captain);
    }

    if (data.coach) {
      const coach = await this.connection.manager
        .findOne(Member, data.coach)
        .catch(internal);
      checkUser('coach', coach);
    }

    return this.connection
      .update(teamId, data)
      .then(() => 'Done')
      .catch(internal);
  }

  public async deleteTeam(teamId: string) {
    await this.exists(teamId);
    return this.connection
      .delete(teamId)
      .then(() => 'Done')
      .catch((error) => {
        console.error(error);
        throw new HttpException('Failed to delete team', 500);
      });
  }

  public notImplemented() {
    throw new HttpException('Not Implemented', 500);
  }
}
