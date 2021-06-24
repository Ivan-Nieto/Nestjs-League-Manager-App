import { MigrationInterface, QueryRunner } from 'typeorm';

export class staffAndAudit1620674423708 implements MigrationInterface {
  name = 'staffAndAudit1620674423708';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "audit" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "entity" character varying NOT NULL, "action" character varying NOT NULL, "modified_at" TIMESTAMP NOT NULL, "new_value" jsonb NOT NULL, CONSTRAINT "PK_1d3d120ddaf7bc9b1ed68ed463a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "person" DROP COLUMN "age"`);
    await queryRunner.query(`ALTER TABLE "person" ADD "wage" integer`);
    await queryRunner.query(`ALTER TABLE "person" ADD "hire_date" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "match" ADD "referee" uuid`);

    await queryRunner.query(
      `ALTER TABLE "person" ALTER COLUMN "dob" SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "person" ALTER COLUMN "dob" DROP NOT NULL`,
    );

    await queryRunner.query(`ALTER TABLE "match" DROP COLUMN "referee"`);
    await queryRunner.query(`ALTER TABLE "person" DROP COLUMN "hire_date"`);
    await queryRunner.query(`ALTER TABLE "person" DROP COLUMN "wage"`);
    await queryRunner.query(`ALTER TABLE "person" ADD "age" integer`);
    await queryRunner.query(`DROP TABLE "audit"`);
  }
}
