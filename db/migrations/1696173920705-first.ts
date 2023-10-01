import { MigrationInterface, QueryRunner } from 'typeorm';

export class First1696173920705 implements MigrationInterface {
  name = 'First1696173920705';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "train" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_0590a6e4276dfef1c8ba49f1c08" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "travel" ("id" SERIAL NOT NULL, "time_departure" TIMESTAMP WITH TIME ZONE NOT NULL, "time_arrival" TIMESTAMP NOT NULL, "place_departure" character varying NOT NULL, "place_arrival" character varying NOT NULL, "duration" TIMESTAMP NOT NULL, "trainId" integer, "ticketId" integer, CONSTRAINT "REL_8d8a0056a858380170d4f15cc3" UNIQUE ("ticketId"), CONSTRAINT "PK_657b63ec7adcf2ecf757a490a67" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "ticket" ("id" SERIAL NOT NULL, "cost" integer NOT NULL, "quantity" integer NOT NULL, CONSTRAINT "PK_d9a0835407701eb86f874474b7c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "travel" ADD CONSTRAINT "FK_8a6b3500ec71b9b50d8e7a20fd1" FOREIGN KEY ("trainId") REFERENCES "train"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "travel" ADD CONSTRAINT "FK_8d8a0056a858380170d4f15cc3c" FOREIGN KEY ("ticketId") REFERENCES "ticket"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "travel" DROP CONSTRAINT "FK_8d8a0056a858380170d4f15cc3c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "travel" DROP CONSTRAINT "FK_8a6b3500ec71b9b50d8e7a20fd1"`,
    );
    await queryRunner.query(`DROP TABLE "ticket"`);
    await queryRunner.query(`DROP TABLE "travel"`);
    await queryRunner.query(`DROP TABLE "train"`);
  }
}
