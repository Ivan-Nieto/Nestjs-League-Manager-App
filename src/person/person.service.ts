import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from './models/person.entity';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private connection: Repository<Person>,
  ) {}

  /**
   * @description Get all Persons
   * @throws
   *
   * @return {Array<Person>}
   */
  public async getPeople(): Promise<Array<Person>> {
    return this.connection.find().catch((error) => {
      console.error(error);
      throw new HttpException('Failed to fetch data', 500);
    });
  }

  /**
   * @description Gets a Person by uuid
   * @throws
   *
   * @param {string} personId Person uuid
   * @return {Person}
   */
  public async getPerson(personId: string): Promise<Person> {
    return this.connection
      .findOne(personId)
      .then((person) => {
        if (!person) throw new HttpException('Not found', 404);
        return person;
      })
      .catch((error) => {
        console.error(error);
        throw new HttpException('Failed to fetch data', 500);
      });
  }
}
