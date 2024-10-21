import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1729494123446 implements MigrationInterface {
    name = ' $npmConfigName1729494123446'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address_detail" DROP CONSTRAINT "FK_d973dae98bc7d0745f33a44ac6f"`);
        await queryRunner.query(`CREATE TABLE "order_status" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "UQ_96a7efa43bbc9ad9bc137016d8b" UNIQUE ("name"), CONSTRAINT "PK_8ea75b2a26f83f3bc98b9c6aaf6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "payment_detail" DROP COLUMN "expirationDate"`);
        await queryRunner.query(`ALTER TABLE "payment_detail" DROP CONSTRAINT "UQ_e5134cf5237a75bfb8ea70a8f27"`);
        await queryRunner.query(`ALTER TABLE "payment_detail" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "payment_detail" DROP COLUMN "cardNumber"`);
        await queryRunner.query(`ALTER TABLE "payment_detail" DROP COLUMN "securityCode"`);
        await queryRunner.query(`ALTER TABLE "address_detail" DROP COLUMN "orderId"`);
        await queryRunner.query(`ALTER TABLE "shipment_detail" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "totalPrice"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "UQ_abcf3e22c7bde40de76b993294e"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "payment_detail" ADD "paymentType" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment_detail" ADD "cardType" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment_detail" ADD "shippingFee" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment_detail" ADD "totalPrice" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address_detail" ADD "city" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address_detail" ADD "postalCode" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address_detail" ADD "addressLine1" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address_detail" ADD "addressLine2" character varying`);
        await queryRunner.query(`ALTER TABLE "order" ADD "orderNumber" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "UQ_4e9f8dd16ec084bca97b3262edb" UNIQUE ("orderNumber")`);
        await queryRunner.query(`ALTER TABLE "order" ADD "statusId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD "shippingAddressId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD "billingAddressId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment_detail" DROP CONSTRAINT "FK_a3771bd86dcdde381af8dda4022"`);
        await queryRunner.query(`ALTER TABLE "payment_detail" ALTER COLUMN "orderId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "createdAt" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "updatedAt" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_d25f1ea79e282cc8a42bd616aa3"`);
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "activity_log" DROP CONSTRAINT "FK_d19abacc8a508c0429478ad166b"`);
        await queryRunner.query(`ALTER TABLE "activity_log" DROP CONSTRAINT "FK_eb283be1c8fe57c935ea5f9423c"`);
        await queryRunner.query(`ALTER TABLE "activity_log" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "activity_log" ALTER COLUMN "actionTypeId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment_detail" ADD CONSTRAINT "FK_a3771bd86dcdde381af8dda4022" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_3b6667bfe775fa39753ca6af2dc" FOREIGN KEY ("statusId") REFERENCES "order_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_a9e568150eecef07380e7f5fc7c" FOREIGN KEY ("shippingAddressId") REFERENCES "address_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_24170e5e670d4ee3a573c259203" FOREIGN KEY ("billingAddressId") REFERENCES "address_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_d25f1ea79e282cc8a42bd616aa3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "activity_log" ADD CONSTRAINT "FK_d19abacc8a508c0429478ad166b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "activity_log" ADD CONSTRAINT "FK_eb283be1c8fe57c935ea5f9423c" FOREIGN KEY ("actionTypeId") REFERENCES "action_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "activity_log" DROP CONSTRAINT "FK_eb283be1c8fe57c935ea5f9423c"`);
        await queryRunner.query(`ALTER TABLE "activity_log" DROP CONSTRAINT "FK_d19abacc8a508c0429478ad166b"`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_d25f1ea79e282cc8a42bd616aa3"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_24170e5e670d4ee3a573c259203"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_a9e568150eecef07380e7f5fc7c"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_3b6667bfe775fa39753ca6af2dc"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"`);
        await queryRunner.query(`ALTER TABLE "payment_detail" DROP CONSTRAINT "FK_a3771bd86dcdde381af8dda4022"`);
        await queryRunner.query(`ALTER TABLE "activity_log" ALTER COLUMN "actionTypeId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "activity_log" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "activity_log" ADD CONSTRAINT "FK_eb283be1c8fe57c935ea5f9423c" FOREIGN KEY ("actionTypeId") REFERENCES "action_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "activity_log" ADD CONSTRAINT "FK_d19abacc8a508c0429478ad166b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_d25f1ea79e282cc8a42bd616aa3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "updatedAt" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "createdAt" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment_detail" ALTER COLUMN "orderId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment_detail" ADD CONSTRAINT "FK_a3771bd86dcdde381af8dda4022" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "billingAddressId"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "shippingAddressId"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "statusId"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "UQ_4e9f8dd16ec084bca97b3262edb"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "orderNumber"`);
        await queryRunner.query(`ALTER TABLE "address_detail" DROP COLUMN "addressLine2"`);
        await queryRunner.query(`ALTER TABLE "address_detail" DROP COLUMN "addressLine1"`);
        await queryRunner.query(`ALTER TABLE "address_detail" DROP COLUMN "postalCode"`);
        await queryRunner.query(`ALTER TABLE "address_detail" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "payment_detail" DROP COLUMN "totalPrice"`);
        await queryRunner.query(`ALTER TABLE "payment_detail" DROP COLUMN "shippingFee"`);
        await queryRunner.query(`ALTER TABLE "payment_detail" DROP COLUMN "cardType"`);
        await queryRunner.query(`ALTER TABLE "payment_detail" DROP COLUMN "paymentType"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "UQ_abcf3e22c7bde40de76b993294e" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "order" ADD "status" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD "totalPrice" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shipment_detail" ADD "address" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address_detail" ADD "orderId" integer`);
        await queryRunner.query(`ALTER TABLE "payment_detail" ADD "securityCode" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment_detail" ADD "cardNumber" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment_detail" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment_detail" ADD CONSTRAINT "UQ_e5134cf5237a75bfb8ea70a8f27" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "payment_detail" ADD "expirationDate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`DROP TABLE "order_status"`);
        await queryRunner.query(`ALTER TABLE "address_detail" ADD CONSTRAINT "FK_d973dae98bc7d0745f33a44ac6f" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
