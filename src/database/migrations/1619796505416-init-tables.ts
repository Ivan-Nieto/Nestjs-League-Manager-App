import { MigrationInterface, QueryRunner } from 'typeorm';

export class initTables1619796505416 implements MigrationInterface {
  name = 'initTables1619796505416';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create tables

    await queryRunner.query(
      `CREATE TABLE "member" ("id" uuid NOT NULL, "person_id" uuid NOT NULL, "role" character varying  NOT NULL, "status" character varying  NOT NULL, "balance" integer  NOT NULL, "team_id" uuid, "stats" jsonb, PRIMARY KEY ("id") )`,
    );
    await queryRunner.query(
      `CREATE TABLE "person" ("id" uuid NOT NULL, "name" character varying  NOT NULL, "last_name" character varying  NOT NULL, "phone" BIGINT  NOT NULL, "email" character varying  NOT NULL, "dob" TIMESTAMP NOT NULL, "age" character varying, PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "status_enum" AS ENUM('active', 'inactive')`,
    );
    await queryRunner.query(
      `CREATE TABLE "team" ("id" uuid NOT NULL, "name" character varying NOT NULL, "coach" uuid NOT NULL, "captain" uuid, "status" "status_enum", PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "match" ("id" uuid NOT NULL, "home" uuid NOT NULL, "team" uuid NOT NULL, "home-score" integer, "away-score" integer, "played" TIMESTAMP, "location" "status_enum", PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "member" DROP CONSTRAINT "person_id"`);
    await queryRunner.query(`ALTER TABLE "member" DROP CONSTRAINT "team_id"`);
    await queryRunner.query(`ALTER TABLE "team" DROP CONSTRAINT "coach"`);
    await queryRunner.query(`ALTER TABLE "team" DROP CONSTRAINT "captain"`);
    await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "home"`);
    await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "team"`);

    // Drop all tables
    await queryRunner.query(`DROP TABLE "member"`);
    await queryRunner.query(`DROP TABLE "person"`);
    await queryRunner.query(`DROP TABLE "team"`);
    await queryRunner.query(`DROP TABLE "match"`);
  }
}
