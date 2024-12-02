import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1731000512768 implements MigrationInterface {
    name = ' $npmConfigName1731000512768'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_variant" ADD "slug" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product_variant" ADD CONSTRAINT "UQ_4076f2a463058f7b56375f7d7eb" UNIQUE ("slug")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_variant" DROP CONSTRAINT "UQ_4076f2a463058f7b56375f7d7eb"`);
        await queryRunner.query(`ALTER TABLE "product_variant" DROP COLUMN "slug"`);
    }

}
