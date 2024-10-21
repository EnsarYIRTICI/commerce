import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1729514246760 implements MigrationInterface {
    name = ' $npmConfigName1729514246760'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_9e5435ba76dbc1f1a0705d4db43"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "parentCategoryId"`);
        await queryRunner.query(`ALTER TABLE "category" ADD "mpath" character varying DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "category" ADD "parentId" integer`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_d5456fd7e4c4866fec8ada1fa10" FOREIGN KEY ("parentId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_d5456fd7e4c4866fec8ada1fa10"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "parentId"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "mpath"`);
        await queryRunner.query(`ALTER TABLE "category" ADD "parentCategoryId" integer`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_9e5435ba76dbc1f1a0705d4db43" FOREIGN KEY ("parentCategoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
