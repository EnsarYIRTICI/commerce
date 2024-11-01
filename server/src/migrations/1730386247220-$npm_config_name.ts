import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1730386247220 implements MigrationInterface {
    name = ' $npmConfigName1730386247220'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product_attribute_value" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "value" character varying NOT NULL, "productAttributeId" integer, CONSTRAINT "UQ_c9370c3dbe5c9af44a182fcbea4" UNIQUE ("name"), CONSTRAINT "PK_b95764a58737e9768a0a79ff1a6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_variant_value_set" ("id" SERIAL NOT NULL, "variantId" integer, "valueId" integer, CONSTRAINT "PK_53bc5a69bd00f6ab8161d0fddac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product_attribute_value" ADD CONSTRAINT "FK_c711bba5afd50a326a70865bfa3" FOREIGN KEY ("productAttributeId") REFERENCES "product_attribute"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_variant_value_set" ADD CONSTRAINT "FK_1f050ef2571f364c75f21b081ce" FOREIGN KEY ("variantId") REFERENCES "product_variant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_variant_value_set" ADD CONSTRAINT "FK_bf45a25cabce96bca55097f7520" FOREIGN KEY ("valueId") REFERENCES "product_attribute_value"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_variant_value_set" DROP CONSTRAINT "FK_bf45a25cabce96bca55097f7520"`);
        await queryRunner.query(`ALTER TABLE "product_variant_value_set" DROP CONSTRAINT "FK_1f050ef2571f364c75f21b081ce"`);
        await queryRunner.query(`ALTER TABLE "product_attribute_value" DROP CONSTRAINT "FK_c711bba5afd50a326a70865bfa3"`);
        await queryRunner.query(`DROP TABLE "product_variant_value_set"`);
        await queryRunner.query(`DROP TABLE "product_attribute_value"`);
    }

}
