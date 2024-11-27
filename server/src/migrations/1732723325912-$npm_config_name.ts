import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1732723325912 implements MigrationInterface {
    name = ' $npmConfigName1732723325912'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "refund_status" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "UQ_0db42b3899ae3f8fa96527c2e9b" UNIQUE ("code"), CONSTRAINT "PK_fa085d7386785ed92417426bfc8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "payment_status" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "UQ_6769bc95a05a93acca1f319e275" UNIQUE ("code"), CONSTRAINT "PK_b59e2e874b077ea7acf724e4711" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "refunds" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "refunds" DROP COLUMN "stripeRefundId"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "refunds" ADD "iyzicoRefundId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "refunds" ADD "statusId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "basketId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "UQ_c04f12e2d7414040627cbd3eb1e" UNIQUE ("basketId")`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "statusId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_fb76bf2f52ca15e599f50bb34ae"`);
        await queryRunner.query(`ALTER TABLE "payment" ALTER COLUMN "paymentMethodId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "refunds" ADD CONSTRAINT "FK_4598f8ccf13d66de355670d5ece" FOREIGN KEY ("statusId") REFERENCES "refund_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_c2704326ac03123ea970d31e8ca" FOREIGN KEY ("statusId") REFERENCES "payment_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_fb76bf2f52ca15e599f50bb34ae" FOREIGN KEY ("paymentMethodId") REFERENCES "payment_method"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_fb76bf2f52ca15e599f50bb34ae"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_c2704326ac03123ea970d31e8ca"`);
        await queryRunner.query(`ALTER TABLE "refunds" DROP CONSTRAINT "FK_4598f8ccf13d66de355670d5ece"`);
        await queryRunner.query(`ALTER TABLE "payment" ALTER COLUMN "paymentMethodId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_fb76bf2f52ca15e599f50bb34ae" FOREIGN KEY ("paymentMethodId") REFERENCES "payment_method"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "statusId"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "UQ_c04f12e2d7414040627cbd3eb1e"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "basketId"`);
        await queryRunner.query(`ALTER TABLE "refunds" DROP COLUMN "statusId"`);
        await queryRunner.query(`ALTER TABLE "refunds" DROP COLUMN "iyzicoRefundId"`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "status" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "refunds" ADD "stripeRefundId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "refunds" ADD "status" character varying NOT NULL DEFAULT 'pending'`);
        await queryRunner.query(`DROP TABLE "payment_status"`);
        await queryRunner.query(`DROP TABLE "refund_status"`);
    }

}
