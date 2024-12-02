import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1732803841253 implements MigrationInterface {
    name = ' $npmConfigName1732803841253'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_a9e568150eecef07380e7f5fc7c"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_24170e5e670d4ee3a573c259203"`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "shippingAddressId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "billingAddressId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_a9e568150eecef07380e7f5fc7c" FOREIGN KEY ("shippingAddressId") REFERENCES "address_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_24170e5e670d4ee3a573c259203" FOREIGN KEY ("billingAddressId") REFERENCES "address_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_24170e5e670d4ee3a573c259203"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_a9e568150eecef07380e7f5fc7c"`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "billingAddressId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "shippingAddressId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_24170e5e670d4ee3a573c259203" FOREIGN KEY ("billingAddressId") REFERENCES "address_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_a9e568150eecef07380e7f5fc7c" FOREIGN KEY ("shippingAddressId") REFERENCES "address_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
