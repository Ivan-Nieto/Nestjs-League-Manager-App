import { Repository } from 'typeorm';
import { HttpException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Member as MemberEntity } from './member.entity';
import { Person } from '../../person/models/person.entity';

interface MemberFields {
  id?: string;
  role?: string;
  status?: string;
  balance?: number;
  team_id?: string | null;
  stats?: {
    shots_on_goal: number;
  };
  person_id?: string;
  name?: string;
  last_name?: string;
  phone?: number;
  email?: string;
  dob?: Date;
  age?: number;
}

export class Member {
  private _isValid = false;

  // Member fields
  private _id: string;
  private _role: string;
  private _status: string;
  private _balance: number;
  private _team_id: string | null;
  private _stats: {
    shots_on_goal: number;
  };

  // Person fields
  private _person_id: string;
  private _name: string;
  private _last_name: string;
  private _phone: number;
  private _email: string;
  private _dob: Date;
  private _age: number;

  constructor(
    private connection: Repository<MemberEntity>,
    details?: MemberFields,
  ) {
    if (!details) return;

    // Set this objects variables if they are in details
    [
      'id',
      'role',
      'status',
      'balance',
      'team_id',
      'stats',
      'person_id',
      'name',
      'last_name',
      'phone',
      'email',
      'dob',
      'age',
    ].forEach((field) => {
      // Set private field if it's counterpart is in details
      if (details[field] == null) return;
      this[`_${field}`] = details[field];
    });

    this.valid();
  }

  valid(): { valid: boolean; missingFields?: Array<string> } {
    const requiredFields = [
      '_id',
      '_name',
      '_last_name',
      '_phone',
      '_email',
      '_dob',
      '_role',
    ];

    const missingFields = requiredFields.filter((e) => this[e] == null);
    this._isValid = !Boolean(missingFields.length);

    return {
      valid: !Boolean(missingFields.length),
      missingFields,
    };
  }

  get IsValid() {
    return this._isValid;
  }

  async create() {
    if (!this._isValid)
      throw new HttpException('Member configuration is not valid', 400);

    // Create a member
    const member = new MemberEntity();
    const person = new Person();

    // Member config
    member.id = this._id;
    member.role = this._role;
    member.status = this._status || 'unknown';
    member.balance = this._balance || 0;
    member.team_id = this._team_id || null;
    member.stats = this._stats || { shots_on_goal: 0 };

    // Person config
    person.name = this._name;
    person.last_name = this._last_name;
    person.phone = this._phone;
    person.email = this._email;
    person.dob = this._dob;
    person.age = this._age || null;

    // Save new person to db
    const personObject = await this.connection.manager
      .save(person)
      .catch((error) => {
        console.error(error);
        throw new HttpException('Failed to save new person', 500);
      });

    // Save new member to db
    const { error, newMember: memberObject } = await this.connection.manager
      .save(member)
      .then((newMember) => {
        return { newMember, error: false };
      })
      .catch((error) => {
        console.error(error);
        return { error: true, newMember: {} };
      });

    // Catch failure to add member entry
    if (error) {
      //   // Delete person
      //   await this.connection.delete(personObject.id).catch((err) => {
      //     console.error(err);
      //     throw new HttpException(
      //       'Failed to save new member and failed to revert creation of person',
      //       500,
      //     );
      //   });

      throw new HttpException('Failed to save new member', 500);
    }

    return {
      member: memberObject,
      person: personObject,
    };
  }

  public toObject() {
    return {
      id: this._id,
      role: this._role,
      status: this._status,
      balance: this._balance,
      team_id: this._team_id,
      stats: this._stats,
      person_id: this._person_id,
      name: this._name,
      last_name: this._last_name,
      phone: this._phone,
      email: this._email,
      dob: this._dob,
      age: this._age,
    };
  }
}
