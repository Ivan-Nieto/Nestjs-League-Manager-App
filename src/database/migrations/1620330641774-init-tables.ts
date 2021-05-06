import { MigrationInterface, QueryRunner } from 'typeorm';

export class initTables1620330641774 implements MigrationInterface {
  name = 'initTables1620330641774';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "person" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "last_name" character varying NOT NULL, "phone" bigint , "email" character varying , "dob" TIMESTAMP, "role" character varying NOT NULL, "status" character varying NOT NULL, "age" integer, "balance" integer, "team_id" uuid, "stats" jsonb, "type" character varying NOT NULL, CONSTRAINT "PK_5fdaf670315c4b7e70cce85daa3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7968479009dcf6ffc61af19ae2" ON "person" ("type") `,
    );
    await queryRunner.query(
      `CREATE TABLE "team" ("id" uuid NOT NULL, "name" character varying NOT NULL, "coach" uuid NOT NULL, "captain" uuid, "status" character varying NOT NULL, CONSTRAINT "PK_f57d8293406df4af348402e4b74" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "match" ("id" uuid NOT NULL, "home" uuid NOT NULL, "team" uuid NOT NULL, "home-score" integer NOT NULL, "away-score" integer NOT NULL, "played" TIMESTAMP NOT NULL, "location" character varying NOT NULL, CONSTRAINT "PK_92b6c3a6631dd5b24a67c69f69d" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "match"`);
    await queryRunner.query(`DROP TABLE "team"`);
    await queryRunner.query(`DROP INDEX "IDX_7968479009dcf6ffc61af19ae2"`);
    await queryRunner.query(`DROP TABLE "person"`);
  }
}
