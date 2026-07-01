import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateWebsiteTable1782903295232 implements MigrationInterface {
    name = 'CreateWebsiteTable1782903295232'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "website" ("id" SERIAL NOT NULL, "publisher_id" integer NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_979e53e64186ccd315cf09b3b14" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "website" ADD CONSTRAINT "FK_3337f62b22bc6ff65c88852f722" FOREIGN KEY ("publisher_id") REFERENCES "publisher"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "website" DROP CONSTRAINT "FK_3337f62b22bc6ff65c88852f722"`);
        await queryRunner.query(`DROP TABLE "website"`);
    }

}
