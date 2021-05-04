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
import {
  UpdateMemberValidationPipe,
  UpdateObject,
} from './validationPipes/UpdateMemberValidationPipe';
import { MemberService } from './member.service';
import { MemberDto } from './member.dto';
import { PatchMemberStatusValidationPipe } from './validationPipes/PatchMemberStatusValidationPipe';

@Controller('member')
export class MemberController {
  constructor(private memberService: MemberService) {}

  @Get()
  getMembers() {
    return this.memberService.getMembers();
  }

  @Get('/free-agent')
  getFreeAgents() {
    return this.memberService.getFreeAgents();
  }

  @Get(':memberId')
  getMember(@Param('memberId', MemberIdValidationPipe) memberId: string) {
    return this.memberService.getMember(memberId);
  }

  @Post()
  addMember(@Body(CreateMemberValidationPipe) member: MemberDto) {
    return this.memberService.createMember(member);
  }

  @Post('/:memberId/payment')
  addMemberPayment(
    @Param('memberId', MemberIdValidationPipe) memberId: string,
    @Body(PaymentValidationPipe) payment: number,
  ) {
    return this.memberService.makePayment(memberId, payment);
  }

  @Patch(':memberId/status')
  patchStatus(
    @Param('memberId', MemberIdValidationPipe) memberId: string,
    @Body(PatchMemberStatusValidationPipe) status: string,
  ) {
    return this.memberService.patchUserStatus(memberId, status);
  }

  @Patch('/:memberId')
  patchMember(
    @Param('memberId', MemberIdValidationPipe) memberId: string,
    @Body(UpdateMemberValidationPipe) data: UpdateObject,
  ) {
    return this.memberService.updateMember(memberId, data);
  }

  @Delete('/:memberId')
  deleteMember(@Param('memberId', MemberIdValidationPipe) memberId: string) {
    return this.memberService.deleteMember(memberId);
  }
}
