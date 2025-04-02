import { MigrationInterface, QueryRunner } from "typeorm";

export class Professional1743552424743 implements MigrationInterface {
    name = 'Professional1743552424743'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "professionals" (
                "id" SERIAL NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                "name" character varying NOT NULL,
                "email" character varying NOT NULL,
                "phone" character varying NOT NULL,
                "document" character varying NOT NULL,
                "specialty" character varying NOT NULL,
                CONSTRAINT "UQ_abe951107d83dd7866cfc4907b0" UNIQUE ("email"),
                CONSTRAINT "PK_d7dc8473b49fcd938def2799387" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "professionals"
        `);
    }

}
