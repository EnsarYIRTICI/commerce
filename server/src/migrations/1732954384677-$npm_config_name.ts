import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1732954384677 implements MigrationInterface {
    name = ' $npmConfigName1732954384677'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wishlist" ADD "name" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wishlist" DROP COLUMN "name"`);
    }

}
