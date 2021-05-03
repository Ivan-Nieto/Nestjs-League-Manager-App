import { MigrationInterface, QueryRunner } from 'typeorm';

export class initTables1619796505416 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const run = queryRunner.query;

    // Create tables
    await Promise.all([
      run(
        `CREATE TABLE IF NOT EXISTS "member" ("id" uuid NOT NULL, "person_id" uuid NOT NULL, "role" character  NOT NULL, "status" character  NOT NULL, "balance" integer  NOT NULL, "team_id" uuid, "stats" jsonb  NOT NULL, PRIMARY KEY ("id") )`,
      ),
      run(
        `CREATE TABLE IF NOT EXISTS "person" ("id" uuid NOT NULL, "name" character  NOT NULL, "last_name" character  NOT NULL, "phone" integer  NOT NULL, "email" character  NOT NULL, "dob" TIMESTAMP NOT NULL, "age" character NOT NULL,  PRIMARY KEY ("id"))`,
      ),
      run(
        `CREATE TABLE IF NOT EXISTS "team" ("id" uuid NOT NULL, "name" character NOT NULL, "coach" uuid NOT NULL, "captain" uuid, "status" AS ENUM('active', 'inactive'), PRIMARY KEY ("id"))`,
      ),
      run(
        `CREATE TABLE IF NOT EXISTS "match" ("id" uuid NOT NULL, "home" uuid NOT NULL, "team" uuid NOT NULL, "home-score" integer, "away-score" integer, "played" TIMESTAMP NOT NULL, "location" AS ENUM('active', 'inactive'),  PRIMARY KEY ("id"))`,
      ),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const run = queryRunner.query;

    // Drops all provided keys from given table
    const dropFks = (table: string, keys: string[]): Array<any> =>
      keys.map((e) => run(`ALTER TABLE "${table}" DROP CONSTRAINT "${e}"`));

    // Remove foreign keys
    await Promise.all([
      ...dropFks('member', ['person_id', 'team_id']),
      ...dropFks('team', ['coach', 'captain']),
      ...dropFks('match', ['home', 'team']),
    ]);

    // Drop all tables
    const tables = ['member', 'person', 'team', 'match'];
    await Promise.all(tables.map((e) => run(`DROP TABLE "${e}"`)));
  }
}
