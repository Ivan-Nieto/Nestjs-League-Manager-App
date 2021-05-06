import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from './models/match.entity';
import { Team } from '../team/models/team.entity';
import { MatchDto } from './match.dto';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Match)
    private connection: Repository<Match>,
  ) {}

  private notFound(message?: string): never {
    throw new HttpException(message || 'Not Found', 404);
  }

  private async exists(matchId: string) {
    return this.connection
      .findOne(matchId)
      .then((m) => {
        if (!m) this.notFound('Match not found');
        return m;
      })
      .catch((error) => {
        console.error(error);
        this.notFound('Match not found');
      });
  }

  public async addMatch(data: MatchDto) {
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

  public getAllMatches() {
    return this.connection.find();
  }

  public async getMatch(matchId: string) {
    return this.exists(matchId);
  }

  public async updateMatch(matchId: string, data: Partial<MatchDto>) {
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

  public async delete(matchId: string) {
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
