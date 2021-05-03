import { MigrationInterface, QueryRunner } from 'typeorm';

export class initTablesFk1619796505416 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const run = queryRunner.query;

    // Run query to add foreign key to given table
    const altTable = (
      table: string,
      constraint: string,
      refTable: string,
    ): Promise<any> =>
      run(
        `ALTER TABLE ${table} ADD CONSTRAINT ${constraint} FOREIGN KEY ("fk_${constraint}") REFERENCES ${refTable}("id")`,
      );

    // Add foreign keys
    await Promise.all([
      altTable('member', 'person_id', 'person'),
      altTable('member', 'team_id', 'team'),
      altTable('team', 'coach', 'member'),
      altTable('team', 'captain', 'member'),
      altTable('match', 'home', 'team'),
      altTable('match', 'team', 'team'),
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
  }
}
