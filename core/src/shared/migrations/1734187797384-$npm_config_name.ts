import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1734187797384 implements MigrationInterface {
    name = ' $npmConfigName1734187797384'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_option" DROP CONSTRAINT "FK_1b23603644f3d5aa7f6777ee9cf"`);
        await queryRunner.query(`ALTER TABLE "product_option_value" DROP CONSTRAINT "FK_de5551c84efb565d35a7cab6411"`);
        await queryRunner.query(`ALTER TABLE "product_option" RENAME COLUMN "nameId" TO "attributeId"`);
        await queryRunner.query(`ALTER TABLE "product_option_value" RENAME COLUMN "valueId" TO "attributeValueId"`);
        await queryRunner.query(`ALTER TABLE "product_option" ADD CONSTRAINT "FK_88f208367e1eabaa5efa3875d70" FOREIGN KEY ("attributeId") REFERENCES "attribute"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_option_value" ADD CONSTRAINT "FK_443bbb9e78cb28f4b19195eebf0" FOREIGN KEY ("attributeValueId") REFERENCES "attribute_value"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_option_value" DROP CONSTRAINT "FK_443bbb9e78cb28f4b19195eebf0"`);
        await queryRunner.query(`ALTER TABLE "product_option" DROP CONSTRAINT "FK_88f208367e1eabaa5efa3875d70"`);
        await queryRunner.query(`ALTER TABLE "product_option_value" RENAME COLUMN "attributeValueId" TO "valueId"`);
        await queryRunner.query(`ALTER TABLE "product_option" RENAME COLUMN "attributeId" TO "nameId"`);
        await queryRunner.query(`ALTER TABLE "product_option_value" ADD CONSTRAINT "FK_de5551c84efb565d35a7cab6411" FOREIGN KEY ("valueId") REFERENCES "attribute_value"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_option" ADD CONSTRAINT "FK_1b23603644f3d5aa7f6777ee9cf" FOREIGN KEY ("nameId") REFERENCES "attribute"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
