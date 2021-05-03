import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Member } from '../../member/models/member.entity';

@Entity()
export class Team {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  @OneToOne(() => Member)
  @JoinColumn()
  coach: string;

  @Column()
  @OneToOne(() => Member)
  @JoinColumn()
  captain: string | null;

  @Column()
  status: 'active' | 'inactive';
}
