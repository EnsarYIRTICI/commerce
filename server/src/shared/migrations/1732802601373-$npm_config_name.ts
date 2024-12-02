import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1732802601373 implements MigrationInterface {
    name = ' $npmConfigName1732802601373'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "confirmed"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "archivedDate"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "currencyCode"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "referenceNumber"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "paymentGatewayType"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "paymentProviderType"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_c2704326ac03123ea970d31e8ca"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_fb76bf2f52ca15e599f50bb34ae"`);
        await queryRunner.query(`ALTER TABLE "payment" ALTER COLUMN "statusId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment" ALTER COLUMN "paymentMethodId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_c2704326ac03123ea970d31e8ca" FOREIGN KEY ("statusId") REFERENCES "payment_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_fb76bf2f52ca15e599f50bb34ae" FOREIGN KEY ("paymentMethodId") REFERENCES "payment_method"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_fb76bf2f52ca15e599f50bb34ae"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_c2704326ac03123ea970d31e8ca"`);
        await queryRunner.query(`ALTER TABLE "payment" ALTER COLUMN "paymentMethodId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment" ALTER COLUMN "statusId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_fb76bf2f52ca15e599f50bb34ae" FOREIGN KEY ("paymentMethodId") REFERENCES "payment_method"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_c2704326ac03123ea970d31e8ca" FOREIGN KEY ("statusId") REFERENCES "payment_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "paymentProviderType" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "paymentGatewayType" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "referenceNumber" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "currencyCode" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "archivedDate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "confirmed" boolean NOT NULL`);
    }

}
