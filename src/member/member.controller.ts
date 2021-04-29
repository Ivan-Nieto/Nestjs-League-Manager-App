import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MemberIdValidationPipe } from './validationPipes/MemberIdValidationPipe';
import { CreateMemberValidationPipe } from './validationPipes/CreateMemberValidationPipe';
import { PaymentValidationPipe } from './validationPipes/PaymentValidationPipe';
import { MemberService } from './member.service';
@Controller('member')
export class MemberController {
  constructor(private memberService: MemberService) {}

  @Get()
  getMembers() {
    console.log('GET member/');
    return this.memberService.notImplemented();
  }

  @Get('/:memberId')
  getMember(@Param('memberId', MemberIdValidationPipe) memberId: string) {
    console.log(`GET member/:memberId`, memberId);
    return this.memberService.notImplemented();
  }

  @Get('/free-agent')
  getFreeAgents() {
    console.log('GET member/free-agent');
    return this.memberService.notImplemented();
  }

  @Post()
  addMember(@Body(CreateMemberValidationPipe) member: any) {
    console.log('POST member/', member);
    return this.memberService.notImplemented();
  }

  @Post('/:memberId/payment')
  addMemberPayment(
    @Param('memberId', MemberIdValidationPipe) memberId: string,
    @Body(PaymentValidationPipe) payment: any,
  ) {
    console.log(`POST member/:memberId/payment`, memberId, payment);
    return this.memberService.notImplemented();
  }

  @Patch('/:memberId')
  patchMember(
    @Param('memberId', MemberIdValidationPipe) memberId: string,
    @Body() data: Record<string, any>,
  ) {
    console.log(`PATCH member/:memberId`, memberId, data);
    return this.memberService.notImplemented();
  }

  @Patch('/status')
  patchStatus(@Body() status: string) {
    console.log(`PATCH member/status`, status);
    return this.memberService.notImplemented();
  }
  @Delete('/:memberId')
  deleteMember(@Param('memberId', MemberIdValidationPipe) memberId: string) {
    console.log(`DELETE member/:memberId`, memberId);
    return this.memberService.notImplemented();
  }
}
