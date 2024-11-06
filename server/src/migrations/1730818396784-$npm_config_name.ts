import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1730818396784 implements MigrationInterface {
    name = ' $npmConfigName1730818396784'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product_category_set" ("productId" integer NOT NULL, "categoryId" integer NOT NULL, CONSTRAINT "PK_09789169e85425e6249713ad7e6" PRIMARY KEY ("productId", "categoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f1f9574e026974e78dbbefc97c" ON "product_category_set" ("productId") `);
        await queryRunner.query(`CREATE INDEX "IDX_fc4929aa28efe38ec68e8887bd" ON "product_category_set" ("categoryId") `);
        await queryRunner.query(`CREATE TABLE "product_variant_value_set" ("productVariantId" integer NOT NULL, "productAttributeValueId" integer NOT NULL, CONSTRAINT "PK_bbe7f760d6971e1ced69d639d9b" PRIMARY KEY ("productVariantId", "productAttributeValueId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c5a3034e827de6e9060ec1e00a" ON "product_variant_value_set" ("productVariantId") `);
        await queryRunner.query(`CREATE INDEX "IDX_30248a68e9f76667e8b00d3496" ON "product_variant_value_set" ("productAttributeValueId") `);
        await queryRunner.query(`ALTER TABLE "product_category_set" ADD CONSTRAINT "FK_f1f9574e026974e78dbbefc97c9" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_category_set" ADD CONSTRAINT "FK_fc4929aa28efe38ec68e8887bde" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_variant_value_set" ADD CONSTRAINT "FK_c5a3034e827de6e9060ec1e00ac" FOREIGN KEY ("productVariantId") REFERENCES "product_variant"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_variant_value_set" ADD CONSTRAINT "FK_30248a68e9f76667e8b00d34961" FOREIGN KEY ("productAttributeValueId") REFERENCES "product_attribute_value"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_variant_value_set" DROP CONSTRAINT "FK_30248a68e9f76667e8b00d34961"`);
        await queryRunner.query(`ALTER TABLE "product_variant_value_set" DROP CONSTRAINT "FK_c5a3034e827de6e9060ec1e00ac"`);
        await queryRunner.query(`ALTER TABLE "product_category_set" DROP CONSTRAINT "FK_fc4929aa28efe38ec68e8887bde"`);
        await queryRunner.query(`ALTER TABLE "product_category_set" DROP CONSTRAINT "FK_f1f9574e026974e78dbbefc97c9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_30248a68e9f76667e8b00d3496"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c5a3034e827de6e9060ec1e00a"`);
        await queryRunner.query(`DROP TABLE "product_variant_value_set"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fc4929aa28efe38ec68e8887bd"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f1f9574e026974e78dbbefc97c"`);
        await queryRunner.query(`DROP TABLE "product_category_set"`);
    }

}
