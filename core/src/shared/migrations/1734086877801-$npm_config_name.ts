import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1734086877801 implements MigrationInterface {
    name = ' $npmConfigName1734086877801'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_option" DROP CONSTRAINT "FK_2ca1aab0a82e9c0058d8465ad02"`);
        await queryRunner.query(`ALTER TABLE "product_option" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "stock" DROP COLUMN "reservedStock"`);
        await queryRunner.query(`ALTER TABLE "sku" ADD "barcode" integer`);
        await queryRunner.query(`ALTER TABLE "sku" ADD CONSTRAINT "UQ_0c3b6227313ef824222160d2a7d" UNIQUE ("barcode")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sku" DROP CONSTRAINT "UQ_0c3b6227313ef824222160d2a7d"`);
        await queryRunner.query(`ALTER TABLE "sku" DROP COLUMN "barcode"`);
        await queryRunner.query(`ALTER TABLE "stock" ADD "reservedStock" integer DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "product_option" ADD "productId" integer`);
        await queryRunner.query(`ALTER TABLE "product_option" ADD CONSTRAINT "FK_2ca1aab0a82e9c0058d8465ad02" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
