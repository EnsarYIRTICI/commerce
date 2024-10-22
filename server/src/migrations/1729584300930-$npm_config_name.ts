import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1729584300930 implements MigrationInterface {
    name = ' $npmConfigName1729584300930'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "price_history" RENAME COLUMN "changeDate" TO "createdAt"`);
        await queryRunner.query(`ALTER TABLE "product_image" ADD "format" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_image" DROP COLUMN "format"`);
        await queryRunner.query(`ALTER TABLE "price_history" RENAME COLUMN "createdAt" TO "changeDate"`);
    }

}
