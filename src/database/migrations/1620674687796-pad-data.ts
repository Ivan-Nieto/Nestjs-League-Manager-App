import { MigrationInterface, QueryRunner } from 'typeorm';

export class padData1620674687796 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE "match" SET "referee"='00000000-0000-4000-A000-000000000000' WHERE "referee"=null`,
    );
    await queryRunner.query(
      `ALTER TABLE match ADD CONSTRAINT referee FOREIGN KEY ("referee") REFERENCES person("id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE "match" SET "referee"=null WHERE "referee"='00000000-0000-4000-A000-000000000000'`,
    );
    await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "referee"`);
  }
}
