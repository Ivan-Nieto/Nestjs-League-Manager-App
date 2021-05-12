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
import { MemberService } from './member.service';
import { UpdatePersonStatusDto } from '../person/person.dto';
import { PostMemberDto, PatchMemberDto, PostPaymentDto } from './member.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  ValidateDtoPipe,
  ValidateDtoValuePipe,
} from '../utils/ValidateDtoPipe';
import { status } from '../utils/enums';

@Controller('member')
@ApiTags('Member')
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
  addMember(@Body(CreateMemberValidationPipe) member: PostMemberDto) {
    return this.memberService.createMember(member);
  }

  @Post('/:memberId/payment')
  addMemberPayment(
    @Param('memberId', MemberIdValidationPipe) memberId: string,
    @Body(new ValidateDtoPipe(PostPaymentDto)) payment: PostPaymentDto,
  ) {
    return this.memberService.makePayment(memberId, payment.amount);
  }

  @Patch(':memberId/status')
  patchStatus(
    @Param('memberId', MemberIdValidationPipe) memberId: string,
    @Body(new ValidateDtoValuePipe(UpdatePersonStatusDto, 'status'))
    status: status,
  ) {
    return this.memberService.patchUserStatus(memberId, status);
  }

  @Patch('/:memberId')
  patchMember(
    @Param('memberId', MemberIdValidationPipe) memberId: string,
    @Body(new ValidateDtoPipe(PatchMemberDto)) data: PatchMemberDto,
  ) {
    return this.memberService.updateMember(memberId, data);
  }

  @Delete('/:memberId')
  deleteMember(@Param('memberId', MemberIdValidationPipe) memberId: string) {
    return this.memberService.deleteMember(memberId);
  }
}
