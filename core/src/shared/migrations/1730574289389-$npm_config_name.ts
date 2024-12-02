import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1730574289389 implements MigrationInterface {
    name = ' $npmConfigName1730574289389'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product_category_category" ("productId" integer NOT NULL, "categoryId" integer NOT NULL, CONSTRAINT "PK_f4340e51cf15d253111ae3bc5da" PRIMARY KEY ("productId", "categoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7345bf754167ef603701fca9e6" ON "product_category_category" ("productId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9f6058f88651acb9c6fd62e589" ON "product_category_category" ("categoryId") `);
        await queryRunner.query(`ALTER TABLE "product_category_category" ADD CONSTRAINT "FK_7345bf754167ef603701fca9e6e" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_category_category" ADD CONSTRAINT "FK_9f6058f88651acb9c6fd62e5890" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_category_category" DROP CONSTRAINT "FK_9f6058f88651acb9c6fd62e5890"`);
        await queryRunner.query(`ALTER TABLE "product_category_category" DROP CONSTRAINT "FK_7345bf754167ef603701fca9e6e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9f6058f88651acb9c6fd62e589"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7345bf754167ef603701fca9e6"`);
        await queryRunner.query(`DROP TABLE "product_category_category"`);
    }

}
