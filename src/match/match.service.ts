import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from './models/match.entity';
import { Team } from '../team/models/team.entity';
import { CreateMatchDto, PatchMatchDto } from './match.dto';

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
    await this.exists(matchId);

    // If updating a team make sure it exists
    if (data.home) {
      const home = await this.connection.manager
        .findOne(Team, data.home)
        .catch((error) => {
          console.error(error);
          throw new HttpException('Failed to validate home team', 500);
        });
      if (!home) throw new HttpException('Home team not found', 404);
    }

    if (data.team) {
      const team = await this.connection.manager
        .findOne(Team, data.team)
        .catch((error) => {
          console.error(error);
          throw new HttpException('Failed to validate team team', 500);
        });
      if (!team) throw new HttpException('Team not found', 404);
    }

    return this.connection
      .update(matchId, data)
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
