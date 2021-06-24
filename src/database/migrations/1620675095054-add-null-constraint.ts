import { MigrationInterface, QueryRunner } from 'typeorm';

export class addNullConstraint1620675095054 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "match" ALTER COLUMN "referee" SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "match" ALTER COLUMN "referee" DROP NOT NULL`,
    );
  }
}
