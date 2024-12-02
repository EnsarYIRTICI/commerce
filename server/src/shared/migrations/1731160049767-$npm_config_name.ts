import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1731160049767 implements MigrationInterface {
    name = ' $npmConfigName1731160049767'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "payment_method" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, CONSTRAINT "UQ_6101666760258a840e115e1bb11" UNIQUE ("name"), CONSTRAINT "PK_7744c2b2dd932c9cf42f2b9bc3a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "carrier" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "contactNumber" character varying NOT NULL, "website" character varying NOT NULL, "region" character varying NOT NULL, CONSTRAINT "PK_f615ebd1906f0270d41b3a5a8b0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "payment_detail" DROP COLUMN "shippingFee"`);
        await queryRunner.query(`ALTER TABLE "payment_detail" DROP COLUMN "totalPrice"`);
        await queryRunner.query(`ALTER TABLE "payment_detail" DROP COLUMN "paymentType"`);
        await queryRunner.query(`ALTER TABLE "payment_detail" DROP COLUMN "cardType"`);
        await queryRunner.query(`ALTER TABLE "shipment_detail" DROP CONSTRAINT "UQ_445dac50cc37d1c25fb6406ce8d"`);
        await queryRunner.query(`ALTER TABLE "shipment_detail" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "UQ_5cfd66eecf44588e49292127a8c"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "street"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "payment_detail" ADD "transactionId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment_detail" ADD "amount" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment_detail" ADD "paymentDate" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment_detail" ADD "paymentStatus" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment_detail" ADD "paymentMethodId" integer`);
        await queryRunner.query(`ALTER TABLE "shipment_detail" ADD "trackingNumber" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shipment_detail" ADD CONSTRAINT "UQ_d937a0c0d907025c0ca61c516db" UNIQUE ("trackingNumber")`);
        await queryRunner.query(`ALTER TABLE "shipment_detail" ADD "shippingStatus" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shipment_detail" ADD "shippingFee" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shipment_detail" ADD "freeShipping" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shipment_detail" ADD "carrierId" integer`);
        await queryRunner.query(`ALTER TABLE "address" ADD "country" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD "region" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD "addressLine1" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD "addressLine2" character varying`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "createdAt" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "updatedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "payment_detail" ADD CONSTRAINT "FK_4664f4acc226b1ce56f47d884ae" FOREIGN KEY ("paymentMethodId") REFERENCES "payment_method"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shipment_detail" ADD CONSTRAINT "FK_58efa21c83101a81557d1c919d8" FOREIGN KEY ("carrierId") REFERENCES "carrier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shipment_detail" DROP CONSTRAINT "FK_58efa21c83101a81557d1c919d8"`);
        await queryRunner.query(`ALTER TABLE "payment_detail" DROP CONSTRAINT "FK_4664f4acc226b1ce56f47d884ae"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "updatedAt" date`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "createdAt" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "addressLine2"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "addressLine1"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "region"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "country"`);
        await queryRunner.query(`ALTER TABLE "shipment_detail" DROP COLUMN "carrierId"`);
        await queryRunner.query(`ALTER TABLE "shipment_detail" DROP COLUMN "freeShipping"`);
        await queryRunner.query(`ALTER TABLE "shipment_detail" DROP COLUMN "shippingFee"`);
        await queryRunner.query(`ALTER TABLE "shipment_detail" DROP COLUMN "shippingStatus"`);
        await queryRunner.query(`ALTER TABLE "shipment_detail" DROP CONSTRAINT "UQ_d937a0c0d907025c0ca61c516db"`);
        await queryRunner.query(`ALTER TABLE "shipment_detail" DROP COLUMN "trackingNumber"`);
        await queryRunner.query(`ALTER TABLE "payment_detail" DROP COLUMN "paymentMethodId"`);
        await queryRunner.query(`ALTER TABLE "payment_detail" DROP COLUMN "paymentStatus"`);
        await queryRunner.query(`ALTER TABLE "payment_detail" DROP COLUMN "paymentDate"`);
        await queryRunner.query(`ALTER TABLE "payment_detail" DROP COLUMN "amount"`);
        await queryRunner.query(`ALTER TABLE "payment_detail" DROP COLUMN "transactionId"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "state" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD "street" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "UQ_5cfd66eecf44588e49292127a8c" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "shipment_detail" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shipment_detail" ADD CONSTRAINT "UQ_445dac50cc37d1c25fb6406ce8d" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "payment_detail" ADD "cardType" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment_detail" ADD "paymentType" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment_detail" ADD "totalPrice" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment_detail" ADD "shippingFee" numeric(10,2) NOT NULL`);
        await queryRunner.query(`DROP TABLE "carrier"`);
        await queryRunner.query(`DROP TABLE "payment_method"`);
    }

}
