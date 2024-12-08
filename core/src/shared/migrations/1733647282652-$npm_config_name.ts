import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1733647282652 implements MigrationInterface {
    name = ' $npmConfigName1733647282652'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_review" DROP CONSTRAINT "UQ_3c728e314a43f37e4be512b222a"`);
        await queryRunner.query(`ALTER TABLE "product_review" DROP COLUMN "name"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_review" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product_review" ADD CONSTRAINT "UQ_3c728e314a43f37e4be512b222a" UNIQUE ("name")`);
    }

}
