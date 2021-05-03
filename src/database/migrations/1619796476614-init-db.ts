import { MigrationInterface, QueryRunner } from 'typeorm';

export class initDb1619796476614 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `GRANT connect ON DATABASE ${process.env.POSTGRES_DB} TO ${process.env.POSTGRES_USER};`,
    );
    await queryRunner.query(
      `ALTER ROLE ${process.env.POSTGRES_USER} SET search_path TO public;`,
    );
    await queryRunner.query(
      `GRANT USAGE ON SCHEMA public TO ${process.env.POSTGRES_USER};`,
    );
    await queryRunner.query(
      `alter default privileges in schema public grant all on tables to ${process.env.POSTGRES_USER};`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP SCHEMA IF EXISTS audit CASCADE;');
  }
}
