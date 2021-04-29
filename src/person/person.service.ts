import { Injectable, HttpException } from '@nestjs/common';

@Injectable()
export class PersonService {
  public notImplemented() {
    throw new HttpException('Not Implemented', 500);
  }
}
