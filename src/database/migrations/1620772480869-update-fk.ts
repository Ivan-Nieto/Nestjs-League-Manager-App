import {MigrationInterface, QueryRunner} from "typeorm";

export class updateFk1620772480869 implements MigrationInterface {
    name = 'updateFk1620772480869'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "person" DROP CONSTRAINT "team_id"`);
        await queryRunner.query(`ALTER TABLE "team" DROP CONSTRAINT "coach"`);
        await queryRunner.query(`ALTER TABLE "team" DROP CONSTRAINT "captain"`);
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "home"`);
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "team"`);
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "referee"`);
        await queryRunner.query(`ALTER TABLE "audit" DROP COLUMN "entity"`);
        await queryRunner.query(`CREATE TYPE "audit_entity_enum" AS ENUM('match', 'member', 'person', 'team', 'staff')`);
        await queryRunner.query(`ALTER TABLE "audit" ADD "entity" "audit_entity_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "audit" DROP COLUMN "action"`);
        await queryRunner.query(`CREATE TYPE "audit_action_enum" AS ENUM('add', 'update', 'delete')`);
        await queryRunner.query(`ALTER TABLE "audit" ADD "action" "audit_action_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "person" DROP COLUMN "status"`);
        await queryRunner.query(`CREATE TYPE "person_status_enum" AS ENUM('injured', 'active', 'inactive', 'suspended', 'unknown')`);
        await queryRunner.query(`ALTER TABLE "person" ADD "status" "person_status_enum" NOT NULL DEFAULT 'unknown'`);
        await queryRunner.query(`ALTER TABLE "team" ADD CONSTRAINT "UQ_f8b24917e3cacae2527807861e9" UNIQUE ("coach")`);
        await queryRunner.query(`ALTER TABLE "team" ADD CONSTRAINT "UQ_931a179d47a1c15584993678051" UNIQUE ("captain")`);
        await queryRunner.query(`ALTER TABLE "team" DROP COLUMN "status"`);
        await queryRunner.query(`CREATE TYPE "team_status_enum" AS ENUM('active', 'inactive', 'unknown')`);
        await queryRunner.query(`ALTER TABLE "team" ADD "status" "team_status_enum" NOT NULL DEFAULT 'unknown'`);
        await queryRunner.query(`ALTER TABLE "match" DROP COLUMN "location"`);
        await queryRunner.query(`CREATE TYPE "match_location_enum" AS ENUM('Argentina', 'Brazil', 'Canada', 'Chile', 'England', 'France', 'Germany', 'Italy', 'Japan', 'South_Korea', 'Mexico', 'Qatar', 'Russia', 'South_Africa', 'Spain', 'Sweden', 'Switzerland', 'United_States', 'Uruguay', 'unknown')`);
        await queryRunner.query(`ALTER TABLE "match" ADD "location" "match_location_enum" NOT NULL DEFAULT 'unknown'`);
        await queryRunner.query(`ALTER TABLE "person" ADD CONSTRAINT "FK_cb033a3b70363fb8a5de534fbc7" FOREIGN KEY ("team_id") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "team" ADD CONSTRAINT "FK_f8b24917e3cacae2527807861e9" FOREIGN KEY ("coach") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "team" ADD CONSTRAINT "FK_931a179d47a1c15584993678051" FOREIGN KEY ("captain") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_3a48977577ccf2a2de439e4b119" FOREIGN KEY ("home") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_57b87be5c2b9ec0d7390188951a" FOREIGN KEY ("team") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_de7fddf46d61cf0a8ef1f3741ee" FOREIGN KEY ("referee") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_de7fddf46d61cf0a8ef1f3741ee"`);
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_57b87be5c2b9ec0d7390188951a"`);
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_3a48977577ccf2a2de439e4b119"`);
        await queryRunner.query(`ALTER TABLE "team" DROP CONSTRAINT "FK_931a179d47a1c15584993678051"`);
        await queryRunner.query(`ALTER TABLE "team" DROP CONSTRAINT "FK_f8b24917e3cacae2527807861e9"`);
        await queryRunner.query(`ALTER TABLE "person" DROP CONSTRAINT "FK_cb033a3b70363fb8a5de534fbc7"`);
        await queryRunner.query(`ALTER TABLE "match" DROP COLUMN "location"`);
        await queryRunner.query(`DROP TYPE "match_location_enum"`);
        await queryRunner.query(`ALTER TABLE "match" ADD "location" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "team_status_enum"`);
        await queryRunner.query(`ALTER TABLE "team" ADD "status" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" DROP CONSTRAINT "UQ_931a179d47a1c15584993678051"`);
        await queryRunner.query(`ALTER TABLE "team" DROP CONSTRAINT "UQ_f8b24917e3cacae2527807861e9"`);
        await queryRunner.query(`ALTER TABLE "person" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "person_status_enum"`);
        await queryRunner.query(`ALTER TABLE "person" ADD "status" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "audit" DROP COLUMN "action"`);
        await queryRunner.query(`DROP TYPE "audit_action_enum"`);
        await queryRunner.query(`ALTER TABLE "audit" ADD "action" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "audit" DROP COLUMN "entity"`);
        await queryRunner.query(`DROP TYPE "audit_entity_enum"`);
        await queryRunner.query(`ALTER TABLE "audit" ADD "entity" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "referee" FOREIGN KEY ("referee") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "team" FOREIGN KEY ("team") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "home" FOREIGN KEY ("home") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "team" ADD CONSTRAINT "captain" FOREIGN KEY ("captain") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "team" ADD CONSTRAINT "coach" FOREIGN KEY ("coach") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "person" ADD CONSTRAINT "team_id" FOREIGN KEY ("team_id") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
