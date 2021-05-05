import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from './models/match.entity';
import { Team } from '../team/models/team.entity';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Match)
    private connection: Repository<Match>,
  ) {}

  private notFound(): never {
    throw new HttpException('Not Found', 404);
  }

  public async addMatch(data: Record<string, any>) {
    // Make sure home team exists
    await this.connection.manager
      .findOne(Team, { id: data.home })
      .then((data) => (data ? null : this.notFound()))
      .catch(this.notFound);

    await this.connection.manager
      .findOne(Team, { id: data.team })
      .then((data) => (data ? null : this.notFound()))
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
    return this.connection
      .findOne(matchId)
      .then((m) => {
        if (!m) this.notFound();
        return m;
      })
      .catch((error) => {
        console.error(error);
        this.notFound();
      });
  }

  public notImplemented() {
    throw new HttpException('Not Implemented', 500);
  }
}
