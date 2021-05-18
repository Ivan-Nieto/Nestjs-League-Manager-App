import { MigrationInterface, QueryRunner } from 'typeorm';

export class wageUpdate1621281347399 implements MigrationInterface {
  name = 'wageUpdate1621281347399';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "person" DROP COLUMN "wage"`);
    await queryRunner.query(`ALTER TABLE "person" ADD "wage" numeric`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "person" DROP COLUMN "wage"`);
    await queryRunner.query(`ALTER TABLE "person" ADD "wage" integer`);
  }
}
