import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1733136408092 implements MigrationInterface {
    name = ' $npmConfigName1733136408092'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" RENAME COLUMN "basketId" TO "conversationId"`);
        await queryRunner.query(`ALTER TABLE "payment" RENAME CONSTRAINT "UQ_c04f12e2d7414040627cbd3eb1e" TO "UQ_9cae47192906221a10cca42399b"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" RENAME CONSTRAINT "UQ_9cae47192906221a10cca42399b" TO "UQ_c04f12e2d7414040627cbd3eb1e"`);
        await queryRunner.query(`ALTER TABLE "payment" RENAME COLUMN "conversationId" TO "basketId"`);
    }

}
