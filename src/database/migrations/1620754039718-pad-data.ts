import { MigrationInterface, QueryRunner } from 'typeorm';

export class padData1620754039718 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE "person" SET "status"='unknown' WHERE NOT ("status" = ANY(ARRAY['injured','active','inactive','suspended','unknown']))`,
    );

    await queryRunner.query(
      `UPDATE "match" SET "location"='unknown' WHERE NOT ("location" = ANY(ARRAY['Argentina','Brazil','Canada','Chile','England','France','Germany','Italy','Japan','South_Korea','Mexico','Qatar','Russia','South_Africa','Spain','Sweden','Switzerland','United_States','Uruguay','unknown']))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Do nothing
  }
}
