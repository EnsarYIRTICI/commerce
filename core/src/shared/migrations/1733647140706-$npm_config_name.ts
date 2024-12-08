import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1733647140706 implements MigrationInterface {
    name = ' $npmConfigName1733647140706'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_review" ADD CONSTRAINT "UQ_ddac00c2e232e622762b74eab02" UNIQUE ("productVariantId", "userId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_review" DROP CONSTRAINT "UQ_ddac00c2e232e622762b74eab02"`);
    }

}
