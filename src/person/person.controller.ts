import { Controller, Get, Param } from '@nestjs/common';
import { PersonIdValidationPipe } from './validationPipes/PersonIdValidationPipe';
import { PersonService } from './person.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('person')
@ApiTags('Person')
export class PersonController {
  constructor(private personService: PersonService) {}

  @Get()
  public async getPeople() {
    return this.personService.getPeople();
  }

  @Get(':personId')
  public async getPerson(
    @Param('personId', PersonIdValidationPipe) personId: string,
  ) {
    return this.personService.getPerson(personId);
  }
}
