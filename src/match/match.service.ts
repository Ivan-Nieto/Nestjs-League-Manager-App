import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from './models/match.entity';
import { Team } from '../team/models/team.entity';
import { CreateMatchDto, PatchMatchDto } from './match.dto';
import { Staff } from '../staff/models/staff.entity';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Match)
    private connection: Repository<Match>,
  ) {}

  /**
   * @description Throws a 404 not found error
   * @private
   *
   * @param {string} [message] Error message body
   */
  private notFound(message?: string): never {
    throw new HttpException(message || 'Not Found', 404);
  }

  /**
   * @description Checks if a team exists
   * @throws
   *
   * @param teamId Team uuid
   * @returns {Team}
   */
  private async teamExists(teamId: string): Promise<Team> {
    const team = await this.connection.manager
      .findOne(Team, teamId)
      .catch((error) => {
        console.error(error);
        this.notFound('Team not found');
      });
    if (!team) this.notFound('Team not found');
    return team;
  }

  /**
   * @description Finds a match by id and throws a 404 error if not found
   * @private
   *
   * @param {string} matchId Match uuid
   * @returns {Match}
   */
  private async exists(matchId: string): Promise<Match> {
    const match = await this.connection.findOne(matchId).catch((error) => {
      console.error(error);
      this.notFound('Match not found');
    });
    if (!match) this.notFound('Match not found');
    return match;
  }

  /**
   * @description Creates a match
   *
   * @param {CreateMatchDto} data Match data
   * @returns {string} Done
   */
  public async addMatch(data: CreateMatchDto): Promise<string> {
    // Make sure home and away team are different
    if (data.home === data.team)
      throw new HttpException(
        'Cannot create match with identical away and home team',
        400,
      );

    // Make sure home team exists
    await this.connection.manager
      .findOne(Team, { id: data.home })
      .then((data) => (data ? null : this.notFound('Home team not found')))
      .catch(this.notFound);

    // Make sure away team exists
    await this.connection.manager
      .findOne(Team, { id: data.team })
      .then((data) => (data ? null : this.notFound('Away team not found')))
      .catch(this.notFound);

    const match = new Match(data);

    // Make sure location/time is available +/- 1hr
    const endDate = new Date(match.played);
    const startDate = new Date(match.played);
    endDate.setHours(endDate.getHours() + 1);
    startDate.setHours(startDate.getHours() - 1);

    const prevMatch = await this.connection
      .createQueryBuilder('match')
      .where(`match.played < :endDate AND match.played > :startDate`, {
        endDate,
        startDate,
      })
      .andWhere('match.location = :location', {
        location: match.location,
      })
      .getOne()
      .catch((error) => {
        console.error(error);
        throw new HttpException(
          'Failed to validate location availability',
          500,
        );
      });

    if (prevMatch)
      throw new HttpException(
        'Match already scheduled for this time/location',
        400,
      );

    return this.connection
      .save(match)
      .then(() => 'Done')
      .catch((error) => {
        console.error(error);
        throw new HttpException('Failed to save match', 500);
      });
  }

  /**
   * @description Gets all matches
   *
   * @returns {Array<Match>} All matches
   */
  public getAllMatches(): Promise<Array<Match>> {
    return this.connection.find();
  }

  /**
   * @description Finds a match by it's uuid
   *
   * @param {string} matchId Match uuid
   * @returns {Match}
   */
  public async getMatch(matchId: string): Promise<Match> {
    return this.exists(matchId);
  }

  /**
   * @description Updates match data
   *
   * @param {string} matchId Match uuid
   * @param {PatchMemberDto} data Update data
   * @returns {string} Done
   */
  public async updateMatch(
    matchId: string,
    data: PatchMatchDto,
  ): Promise<string> {
    // Make sure match exists
    const match = await this.exists(matchId);

    // If updating a team make sure it exists
    if (data.home) await this.teamExists(data.home);

    if (data.team) await this.teamExists(data.team);

    // If referee is being updated make sure they exist
    if (data.referee) {
      const referee = await this.connection.manager
        .findOne(Staff, data.referee)
        .catch((error) => {
          console.error(error);
          throw new HttpException('Failed to validate referee', 500);
        });
      if (!referee) this.notFound('Referee not found');
    }

    // If the match date/location is being updated
    // make sure no other games are scheduled for the same time
    if (data?.location || data?.played) {
      // Make sure location/time is available +/- 1hr
      const endDate = new Date(data.played || match.played);
      const startDate = new Date(data.played || match.played);
      endDate.setHours(endDate.getHours() + 1);
      startDate.setHours(startDate.getHours() - 1);

      const prevMatches = await this.connection
        .createQueryBuilder('match')
        .where(`match.played < :endDate AND match.played > :startDate`, {
          endDate,
          startDate,
        })
        .andWhere('match.location = :location', {
          location: data.location || match.location,
        })
        .getMany()
        .catch((error) => {
          console.error(error);
          throw new HttpException(
            'Failed to validate location availability',
            500,
          );
        });

      if (prevMatches.length > 0 && prevMatches.some((m) => m.id !== match.id))
        throw new HttpException(
          'Match already scheduled for this time/location',
          400,
        );
    }

    match.update(data);
    return this.connection
      .save(match)
      .then(() => 'Done')
      .catch((error) => {
        console.error(error);
        throw new HttpException('Failed to update match', 500);
      });
  }

  /**
   * @description Deletes a given match
   *
   * @param {string} matchId Match uuid
   * @returns {string} Done
   */
  public async delete(matchId: string): Promise<string> {
    await this.exists(matchId);
    return this.connection
      .delete(matchId)
      .then(() => 'Done')
      .catch((error) => {
        console.error(error);
        throw new HttpException('Failed to delete match', 500);
      });
  }
}
