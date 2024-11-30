import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1732972468948 implements MigrationInterface {
    name = ' $npmConfigName1732972468948'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "shipment_status" ("id" SERIAL NOT NULL, "status" character varying NOT NULL, CONSTRAINT "PK_11a707c6528655e1e43e3817cde" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "carrier" DROP COLUMN "website"`);
        await queryRunner.query(`ALTER TABLE "carrier" DROP COLUMN "region"`);
        await queryRunner.query(`ALTER TABLE "carrier" DROP COLUMN "contactNumber"`);
        await queryRunner.query(`ALTER TABLE "shipment" DROP COLUMN "freeShipping"`);
        await queryRunner.query(`ALTER TABLE "shipment" DROP COLUMN "shippingStatus"`);
        await queryRunner.query(`ALTER TABLE "shipment" ADD "statusId" integer`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "UQ_23c05c292c439d77b0de816b500"`);
        await queryRunner.query(`ALTER TABLE "shipment" ADD CONSTRAINT "FK_4232c6cf51cf46f26d2757dcee4" FOREIGN KEY ("statusId") REFERENCES "shipment_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shipment" DROP CONSTRAINT "FK_4232c6cf51cf46f26d2757dcee4"`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "shipment" DROP COLUMN "statusId"`);
        await queryRunner.query(`ALTER TABLE "shipment" ADD "shippingStatus" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shipment" ADD "freeShipping" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "carrier" ADD "contactNumber" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "carrier" ADD "region" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "carrier" ADD "website" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "shipment_status"`);
    }

}
