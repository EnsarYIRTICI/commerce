import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1730804886378 implements MigrationInterface {
    name = ' $npmConfigName1730804886378'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_image" DROP CONSTRAINT "FK_40ca0cd115ef1ff35351bed8da2"`);
        await queryRunner.query(`CREATE TABLE "product_categories_category" ("productId" integer NOT NULL, "categoryId" integer NOT NULL, CONSTRAINT "PK_17f2a361443184000ee8d79f240" PRIMARY KEY ("productId", "categoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_342d06dd0583aafc156e076379" ON "product_categories_category" ("productId") `);
        await queryRunner.query(`CREATE INDEX "IDX_15520e638eb4c46c4fb2c61c4b" ON "product_categories_category" ("categoryId") `);
        await queryRunner.query(`ALTER TABLE "product_image" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "product_image" DROP COLUMN "url"`);
        await queryRunner.query(`ALTER TABLE "product_image" DROP COLUMN "format"`);
        await queryRunner.query(`ALTER TABLE "product_image" ADD "productVariantId" integer`);
        await queryRunner.query(`ALTER TABLE "product_image" ADD CONSTRAINT "FK_c73b8527a67e80b2f5067582878" FOREIGN KEY ("productVariantId") REFERENCES "product_variant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_categories_category" ADD CONSTRAINT "FK_342d06dd0583aafc156e0763790" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_categories_category" ADD CONSTRAINT "FK_15520e638eb4c46c4fb2c61c4b4" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_categories_category" DROP CONSTRAINT "FK_15520e638eb4c46c4fb2c61c4b4"`);
        await queryRunner.query(`ALTER TABLE "product_categories_category" DROP CONSTRAINT "FK_342d06dd0583aafc156e0763790"`);
        await queryRunner.query(`ALTER TABLE "product_image" DROP CONSTRAINT "FK_c73b8527a67e80b2f5067582878"`);
        await queryRunner.query(`ALTER TABLE "product_image" DROP COLUMN "productVariantId"`);
        await queryRunner.query(`ALTER TABLE "product_image" ADD "format" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product_image" ADD "url" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product_image" ADD "productId" integer`);
        await queryRunner.query(`DROP INDEX "public"."IDX_15520e638eb4c46c4fb2c61c4b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_342d06dd0583aafc156e076379"`);
        await queryRunner.query(`DROP TABLE "product_categories_category"`);
        await queryRunner.query(`ALTER TABLE "product_image" ADD CONSTRAINT "FK_40ca0cd115ef1ff35351bed8da2" FOREIGN KEY ("productId") REFERENCES "product_variant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
