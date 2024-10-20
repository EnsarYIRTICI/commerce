import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1729420631869 implements MigrationInterface {
    name = ' $npmConfigName1729420631869'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "lastname" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "lastPasswordChange" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_065d4d8f3b5adb4a08841eae3c8"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_065d4d8f3b5adb4a08841eae3c8" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastPasswordChange"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastname"`);
    }

}
