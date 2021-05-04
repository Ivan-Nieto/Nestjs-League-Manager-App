import { Controller, Get, HttpException, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonIdValidationPipe } from './validationPipes/PersonIdValidationPipe';
import { Person } from './models/person.entity';

@Controller('person')
export class PersonController {
  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
  ) {}

  @Get()
  getPeople() {
    return this.personRepository.find();
  }

  @Get(':personId')
  getPerson(@Param('personId', PersonIdValidationPipe) personId: string) {
    return this.personRepository.findOne(personId).catch(() => {
      throw new HttpException('Not Found', 404);
    });
  }
}
