import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1731426989350 implements MigrationInterface {
    name = ' $npmConfigName1731426989350'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_b046318e0b341a7f72110b75857"`);
        await queryRunner.query(`CREATE TABLE "refunds" ("id" SERIAL NOT NULL, "stripeRefundId" character varying NOT NULL, "amount" integer NOT NULL, "status" character varying NOT NULL DEFAULT 'pending', "reason" character varying, "failureReason" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "paymentId" integer, CONSTRAINT "PK_5106efb01eeda7e49a78b869738" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shipment" ("id" SERIAL NOT NULL, "trackingNumber" character varying NOT NULL, "shippingStatus" character varying NOT NULL, "estimatedDelivery" TIMESTAMP NOT NULL, "shippingFee" numeric(10,2) NOT NULL, "freeShipping" boolean NOT NULL, "carrierId" integer, "orderId" integer, CONSTRAINT "UQ_7ff24933d56b16307681c3b67b4" UNIQUE ("trackingNumber"), CONSTRAINT "PK_f51f635db95c534ca206bf7a0a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "invoice" ("id" SERIAL NOT NULL, "stripeInvoiceId" character varying NOT NULL, "amountDue" integer NOT NULL, "currency" character varying NOT NULL, "status" character varying NOT NULL DEFAULT 'open', "description" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "subscriptionId" integer, CONSTRAINT "PK_15d25c200d9bcd8a33f698daf18" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subscription" ("id" SERIAL NOT NULL, "stripeSubscriptionId" character varying NOT NULL, "status" character varying NOT NULL, "currentPeriodStart" TIMESTAMP, "currentPeriodEnd" TIMESTAMP, "cancelAtPeriodEnd" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_8c3e00ebd02103caa1174cd5d9d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "UQ_06a96865bf0d5a224c8dc13c653"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "method"`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "currencyCode" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "referenceNumber" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "paymentGatewayType" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "paymentProviderType" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "confirmed" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "status" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "createdDate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "archivedDate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "paymentMethodId" integer`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "orderId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "refunds" ADD CONSTRAINT "FK_a276dea330e561499e4a6e1b309" FOREIGN KEY ("paymentId") REFERENCES "payment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_fb76bf2f52ca15e599f50bb34ae" FOREIGN KEY ("paymentMethodId") REFERENCES "payment_method"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_d09d285fe1645cd2f0db811e293" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shipment" ADD CONSTRAINT "FK_c66ee40226626c4f62b018f7671" FOREIGN KEY ("carrierId") REFERENCES "carrier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shipment" ADD CONSTRAINT "FK_93ba0beada3eb709bc83dc0b9af" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invoice" ADD CONSTRAINT "FK_1ca5dce89a3293e6b88cd14c0ca" FOREIGN KEY ("subscriptionId") REFERENCES "subscription"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subscription" ADD CONSTRAINT "FK_cc906b4bc892b048f1b654d2aa0" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscription" DROP CONSTRAINT "FK_cc906b4bc892b048f1b654d2aa0"`);
        await queryRunner.query(`ALTER TABLE "invoice" DROP CONSTRAINT "FK_1ca5dce89a3293e6b88cd14c0ca"`);
        await queryRunner.query(`ALTER TABLE "shipment" DROP CONSTRAINT "FK_93ba0beada3eb709bc83dc0b9af"`);
        await queryRunner.query(`ALTER TABLE "shipment" DROP CONSTRAINT "FK_c66ee40226626c4f62b018f7671"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_d09d285fe1645cd2f0db811e293"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_fb76bf2f52ca15e599f50bb34ae"`);
        await queryRunner.query(`ALTER TABLE "refunds" DROP CONSTRAINT "FK_a276dea330e561499e4a6e1b309"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "orderId"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "paymentMethodId"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "archivedDate"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "createdDate"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "confirmed"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "paymentProviderType"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "paymentGatewayType"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "referenceNumber"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "currencyCode"`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "method" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "UQ_06a96865bf0d5a224c8dc13c653" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "userId" integer`);
        await queryRunner.query(`DROP TABLE "subscription"`);
        await queryRunner.query(`DROP TABLE "invoice"`);
        await queryRunner.query(`DROP TABLE "shipment"`);
        await queryRunner.query(`DROP TABLE "refunds"`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_b046318e0b341a7f72110b75857" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
