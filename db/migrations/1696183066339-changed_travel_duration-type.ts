import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangedTravelDurationType1696183066339 implements MigrationInterface {
    name = 'ChangedTravelDurationType1696183066339'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "travel" DROP COLUMN "time_arrival"`);
        await queryRunner.query(`ALTER TABLE "travel" ADD "time_arrival" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "travel" DROP COLUMN "duration"`);
        await queryRunner.query(`ALTER TABLE "travel" ADD "duration" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "travel" DROP COLUMN "duration"`);
        await queryRunner.query(`ALTER TABLE "travel" ADD "duration" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "travel" DROP COLUMN "time_arrival"`);
        await queryRunner.query(`ALTER TABLE "travel" ADD "time_arrival" TIMESTAMP NOT NULL`);
    }

}
