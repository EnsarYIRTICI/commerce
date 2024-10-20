import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1729427516079 implements MigrationInterface {
    name = ' $npmConfigName1729427516079'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updatedAt" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updatedAt" SET NOT NULL`);
    }

}
