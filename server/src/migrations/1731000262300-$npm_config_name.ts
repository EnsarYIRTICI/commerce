import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1731000262300 implements MigrationInterface {
    name = ' $npmConfigName1731000262300'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_attribute_value" DROP CONSTRAINT "UQ_c9370c3dbe5c9af44a182fcbea4"`);
        await queryRunner.query(`ALTER TABLE "product_attribute_value" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "slug" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "UQ_8cfaf4a1e80806d58e3dbe69224" UNIQUE ("slug")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "UQ_8cfaf4a1e80806d58e3dbe69224"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "slug"`);
        await queryRunner.query(`ALTER TABLE "product_attribute_value" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product_attribute_value" ADD CONSTRAINT "UQ_c9370c3dbe5c9af44a182fcbea4" UNIQUE ("name")`);
    }

}
