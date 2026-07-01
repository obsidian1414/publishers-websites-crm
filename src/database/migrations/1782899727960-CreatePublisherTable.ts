import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePublisherTable1782899727960 implements MigrationInterface {
  name = 'CreatePublisherTable1782899727960';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "publisher" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "contact_name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_9dc496f2e5b912da9edd2aa4455" UNIQUE ("name"), CONSTRAINT "PK_70a5936b43177f76161724da3e6" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "publisher"`);
  }
}
