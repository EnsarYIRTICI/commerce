import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1732803980373 implements MigrationInterface {
    name = ' $npmConfigName1732803980373'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address_detail" DROP CONSTRAINT "UQ_b6e6ac6849fc4699ac3639a6dea"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address_detail" ADD CONSTRAINT "UQ_b6e6ac6849fc4699ac3639a6dea" UNIQUE ("name")`);
    }

}
