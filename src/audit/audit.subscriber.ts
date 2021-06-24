import {
  Connection,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
  RemoveEvent,
  EventSubscriber,
  Repository,
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from '../match/models/match.entity';
import { Member } from '../member/models/member.entity';
import { Team } from '../team/models/team.entity';
import { Staff } from '../staff/models/staff.entity';
import { Audit } from './models/audit.entity';
import { actions, entities } from '../utils/enums';

type Entities = Match | Member | Team | Staff;

@EventSubscriber()
export class Subscriber implements EntitySubscriberInterface<Entities> {
  constructor(
    connection: Connection,
    @InjectRepository(Audit)
    private db: Repository<Audit>,
  ) {
    connection.subscribers.push(this);
  }

  /**
   * @description
   *
   * @param {'add' | 'update' | 'delete'} action Action being performed
   * @param { InsertEvent<Entities> | UpdateEvent<Entities> | RemoveEvent<Entities> } event Action event
   */
  private saveEvent(
    action: string,
    event:
      | InsertEvent<Entities>
      | UpdateEvent<Entities>
      | RemoveEvent<Entities>,
    new_value: Record<string, any>,
  ) {
    // Ignore updates to audit table
    if (event?.metadata?.name?.toLowerCase() === 'audit') return;

    const audit = new Audit({
      entity: event?.metadata?.name?.toLowerCase() as entities,
      action: action as actions,
      modified_at: new Date(Date.now()).toISOString(),
      new_value,
    });
    this.db.save(audit).catch(console.error);
  }

  /**
   * @description Called after entity insertion.
   */
  afterInsert(event: InsertEvent<Entities>) {
    this.saveEvent('add', event, event.entity);
  }

  /**
   * @description Called after entity update.
   */
  afterUpdate(event: UpdateEvent<Entities>) {
    this.saveEvent('update', event, event?.entity || {});
  }

  /**
   * @description Called after entity removal.
   */
  afterRemove(event: RemoveEvent<Entities>) {
    this.saveEvent('delete', event, {});
  }
}
