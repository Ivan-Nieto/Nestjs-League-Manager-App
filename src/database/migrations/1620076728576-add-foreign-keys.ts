import { MigrationInterface, QueryRunner } from 'typeorm';

export class addForeignKeys1620076728576 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Run query to add foreign key to given table
    const altTable = (
      table: string,
      constraint: string,
      refTable: string,
      cascade?: boolean,
    ): string =>
      `ALTER TABLE ${table} ADD CONSTRAINT ${constraint} FOREIGN KEY ("${constraint}") REFERENCES ${refTable}("id")${
        cascade ? ' ON DELETE CASCADE' : ''
      }`;

    // Add foreign keys
    await queryRunner.query(altTable('member', 'person_id', 'person', true));
    await queryRunner.query(altTable('member', 'team_id', 'team'));
    await queryRunner.query(altTable('team', 'coach', 'member'));
    await queryRunner.query(altTable('team', 'captain', 'member'));
    await queryRunner.query(altTable('match', 'home', 'team'));
    await queryRunner.query(altTable('match', 'team', 'team'));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove foreign keys
    await queryRunner.query(`ALTER TABLE "member" DROP CONSTRAINT "person_id"`);
    await queryRunner.query(`ALTER TABLE "member" DROP CONSTRAINT "team_id"`);
    await queryRunner.query(`ALTER TABLE "team" DROP CONSTRAINT "coach"`);
    await queryRunner.query(`ALTER TABLE "team" DROP CONSTRAINT "captain"`);
    await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "home"`);
    await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "team"`);
  }
}
