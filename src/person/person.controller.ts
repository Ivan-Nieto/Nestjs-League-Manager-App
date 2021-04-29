import { Controller, Get, Param } from '@nestjs/common';
import { PersonIdValidationPipe } from './validationPipes/PersonIdValidationPipe';
import { PersonService } from './person.service';

@Controller('person')
export class PersonController {
  constructor(private personService: PersonService) {}

  @Get(':personId')
  getPerson(@Param('personId', PersonIdValidationPipe) personId: string) {
    console.log('GET /person/:personId', personId);
    return this.personService.notImplemented();
  }
}
