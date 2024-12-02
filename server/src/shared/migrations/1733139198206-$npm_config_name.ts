import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1733139198206 implements MigrationInterface {
    name = ' $npmConfigName1733139198206'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_fb76bf2f52ca15e599f50bb34ae"`);
        await queryRunner.query(`CREATE TABLE "payment_currency" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "name" character varying NOT NULL, "exchangeRate" numeric(10,2) NOT NULL, CONSTRAINT "UQ_f41553459a4b1491c9893ebc921" UNIQUE ("code"), CONSTRAINT "PK_0c2788c000c47176b48596cad1a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "paymentMethodId"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "UQ_4e9f8dd16ec084bca97b3262edb"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "orderNumber"`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "currencyId" integer`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "methodId" integer`);
        await queryRunner.query(`ALTER TABLE "refunds" DROP CONSTRAINT "FK_a276dea330e561499e4a6e1b309"`);
        await queryRunner.query(`ALTER TABLE "refunds" DROP COLUMN "paymentId"`);
        await queryRunner.query(`ALTER TABLE "refunds" ADD "paymentId" uuid`);
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_d09d285fe1645cd2f0db811e293"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "orderId"`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "orderId" uuid`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "PK_1031171c13130102495201e3e20"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "orderId"`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD "orderId" uuid`);
        await queryRunner.query(`ALTER TABLE "refunds" ADD CONSTRAINT "FK_a276dea330e561499e4a6e1b309" FOREIGN KEY ("paymentId") REFERENCES "payment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_8bd02879aabfa095f531e9482f3" FOREIGN KEY ("currencyId") REFERENCES "payment_currency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_28fc985bf30366ec34ff1072a59" FOREIGN KEY ("methodId") REFERENCES "payment_method"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_d09d285fe1645cd2f0db811e293" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_d09d285fe1645cd2f0db811e293"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_28fc985bf30366ec34ff1072a59"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_8bd02879aabfa095f531e9482f3"`);
        await queryRunner.query(`ALTER TABLE "refunds" DROP CONSTRAINT "FK_a276dea330e561499e4a6e1b309"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "orderId"`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD "orderId" integer`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "PK_1031171c13130102495201e3e20"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "orderId"`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "orderId" integer`);
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_d09d285fe1645cd2f0db811e293" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "refunds" DROP COLUMN "paymentId"`);
        await queryRunner.query(`ALTER TABLE "refunds" ADD "paymentId" integer`);
        await queryRunner.query(`ALTER TABLE "refunds" ADD CONSTRAINT "FK_a276dea330e561499e4a6e1b309" FOREIGN KEY ("paymentId") REFERENCES "payment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "methodId"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "currencyId"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "orderNumber" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "UQ_4e9f8dd16ec084bca97b3262edb" UNIQUE ("orderNumber")`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "paymentMethodId" integer`);
        await queryRunner.query(`DROP TABLE "payment_currency"`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_fb76bf2f52ca15e599f50bb34ae" FOREIGN KEY ("paymentMethodId") REFERENCES "payment_method"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
