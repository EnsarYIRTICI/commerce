import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1729507390681 implements MigrationInterface {
    name = ' $npmConfigName1729507390681'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product_variant_attribute_values_attribute_value" ("productVariantId" integer NOT NULL, "attributeValueId" integer NOT NULL, CONSTRAINT "PK_6f74d7423be4373e2f16b89f8d2" PRIMARY KEY ("productVariantId", "attributeValueId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fcec4bedf47d7bef84dd058397" ON "product_variant_attribute_values_attribute_value" ("productVariantId") `);
        await queryRunner.query(`CREATE INDEX "IDX_6af09cc2c22ad830e11bd7c6a7" ON "product_variant_attribute_values_attribute_value" ("attributeValueId") `);
        await queryRunner.query(`ALTER TABLE "category" ADD "parentCategoryId" integer`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "updatedAt" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_ff0c0301a95e517153df97f6812"`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "updatedAt" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "categoryId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_9e5435ba76dbc1f1a0705d4db43" FOREIGN KEY ("parentCategoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_variant_attribute_values_attribute_value" ADD CONSTRAINT "FK_fcec4bedf47d7bef84dd0583976" FOREIGN KEY ("productVariantId") REFERENCES "product_variant"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_variant_attribute_values_attribute_value" ADD CONSTRAINT "FK_6af09cc2c22ad830e11bd7c6a73" FOREIGN KEY ("attributeValueId") REFERENCES "attribute_value"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_variant_attribute_values_attribute_value" DROP CONSTRAINT "FK_6af09cc2c22ad830e11bd7c6a73"`);
        await queryRunner.query(`ALTER TABLE "product_variant_attribute_values_attribute_value" DROP CONSTRAINT "FK_fcec4bedf47d7bef84dd0583976"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_ff0c0301a95e517153df97f6812"`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_9e5435ba76dbc1f1a0705d4db43"`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "categoryId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "updatedAt" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "updatedAt" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "parentCategoryId"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6af09cc2c22ad830e11bd7c6a7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fcec4bedf47d7bef84dd058397"`);
        await queryRunner.query(`DROP TABLE "product_variant_attribute_values_attribute_value"`);
    }

}
