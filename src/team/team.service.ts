import { Injectable, HttpException } from '@nestjs/common';

@Injectable()
export class TeamService {
  public notImplemented() {
    throw new HttpException('Not Implemented', 500);
  }
}
