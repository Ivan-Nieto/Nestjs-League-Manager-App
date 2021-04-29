import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class MemberService {
  public notImplemented() {
    throw new HttpException('Not Implemented', 500);
  }
}
