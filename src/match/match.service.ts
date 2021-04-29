import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class MatchService {
  public notImplemented() {
    throw new HttpException('Not Implemented', 500);
  }
}
