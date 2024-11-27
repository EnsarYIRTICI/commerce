import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1732699729886 implements MigrationInterface {
    name = ' $npmConfigName1732699729886'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "lastLogin" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "user" ADD "iyzipayId" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "phoneNumber" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "identityNumber" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "identityNumber"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phoneNumber"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "iyzipayId"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastLogin"`);
    }

}
