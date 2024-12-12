import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1733996317442 implements MigrationInterface {
    name = ' $npmConfigName1733996317442'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wishlist_item" DROP CONSTRAINT "FK_acb085dfe252134ae370f57fd4d"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_7e2fe82497aa29798b51511ada4"`);
        await queryRunner.query(`ALTER TABLE "cart_item" DROP CONSTRAINT "FK_47b024caf15725746fe69d1f487"`);
        await queryRunner.query(`ALTER TABLE "product_image" DROP CONSTRAINT "FK_c73b8527a67e80b2f5067582878"`);
        await queryRunner.query(`ALTER TABLE "product_review" DROP CONSTRAINT "FK_de987f9289b240e8702c9b8148e"`);
        await queryRunner.query(`CREATE TABLE "attribute_type" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_591c706521c86d14d5a656da6c5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "attribute" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "typeId" integer, CONSTRAINT "UQ_350fb4f7eb87e4c7d35c97a9828" UNIQUE ("name"), CONSTRAINT "PK_b13fb7c5c9e9dff62b60e0de729" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "attribute_value" ("id" SERIAL NOT NULL, "value" character varying NOT NULL, "attributeId" integer, CONSTRAINT "PK_dff76d9cc1db2684732acdb9ca7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_option_value" ("id" SERIAL NOT NULL, "priority" integer NOT NULL DEFAULT '0', "valueId" integer, "optionId" integer, CONSTRAINT "PK_2ab71ed3b21be5800905c621535" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_option" ("id" SERIAL NOT NULL, "priority" integer NOT NULL DEFAULT '0', "nameId" integer, "productId" integer, CONSTRAINT "PK_4cf3c467e9bc764bdd32c4cd938" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "price" ("id" SERIAL NOT NULL, "basePrice" numeric(10,2) NOT NULL, "discountedPrice" numeric(10,2), "currency" character varying NOT NULL DEFAULT 'USD', "product_variant_id" uuid, CONSTRAINT "PK_d163e55e8cce6908b2e0f27cea4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "warehouse" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "location" character varying, "priority" integer NOT NULL DEFAULT '0', CONSTRAINT "UQ_d5d5470e55d4238b1239e9f154b" UNIQUE ("name"), CONSTRAINT "PK_965abf9f99ae8c5983ae74ebde8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "stock" ("id" SERIAL NOT NULL, "stock" integer NOT NULL DEFAULT '0', "safetyStock" integer DEFAULT '0', "reservedStock" integer DEFAULT '0', "skuId" uuid, "warehouseId" integer, CONSTRAINT "PK_092bc1fc7d860426a1dec5aa8e9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cf22acb2581b2684c7c4536c8d" ON "stock" ("skuId", "warehouseId") `);
        await queryRunner.query(`CREATE TABLE "sku" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "slug" character varying NOT NULL, "productId" integer, CONSTRAINT "UQ_d260c995b672b14cbab20899bad" UNIQUE ("name"), CONSTRAINT "UQ_326f8861faf224e01035f238b7e" UNIQUE ("slug"), CONSTRAINT "PK_ed102ac07c2cbc14c9a1438ecc2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "variant_option_value_set" ("variant_id" uuid NOT NULL, "option_value_id" integer NOT NULL, CONSTRAINT "PK_7fffc034a6098efa2018109d608" PRIMARY KEY ("variant_id", "option_value_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2ac9fd0eb37ce61a48d6d90356" ON "variant_option_value_set" ("variant_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_12af10c4672970407c9d28eef6" ON "variant_option_value_set" ("option_value_id") `);
        await queryRunner.query(`ALTER TABLE "wishlist_item" DROP COLUMN "productVariantId"`);
        await queryRunner.query(`ALTER TABLE "wishlist_item" ADD "productVariantId" uuid`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "productVariantId"`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD "productVariantId" uuid`);
        await queryRunner.query(`ALTER TABLE "cart_item" DROP COLUMN "productVariantId"`);
        await queryRunner.query(`ALTER TABLE "cart_item" ADD "productVariantId" uuid`);
        await queryRunner.query(`ALTER TABLE "product_image" DROP COLUMN "productVariantId"`);
        await queryRunner.query(`ALTER TABLE "product_image" ADD "productVariantId" uuid`);
        await queryRunner.query(`ALTER TABLE "product_review" DROP CONSTRAINT "UQ_ddac00c2e232e622762b74eab02"`);
        await queryRunner.query(`ALTER TABLE "product_review" DROP COLUMN "productVariantId"`);
        await queryRunner.query(`ALTER TABLE "product_review" ADD "productVariantId" uuid`);
        await queryRunner.query(`ALTER TABLE "product_review" ADD CONSTRAINT "UQ_ddac00c2e232e622762b74eab02" UNIQUE ("productVariantId", "userId")`);
        await queryRunner.query(`ALTER TABLE "attribute" ADD CONSTRAINT "FK_296ba7ab81a81af0a725f131993" FOREIGN KEY ("typeId") REFERENCES "attribute_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attribute_value" ADD CONSTRAINT "FK_123ac30d8ade936347e4099cc4a" FOREIGN KEY ("attributeId") REFERENCES "attribute"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_option_value" ADD CONSTRAINT "FK_de5551c84efb565d35a7cab6411" FOREIGN KEY ("valueId") REFERENCES "attribute_value"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_option_value" ADD CONSTRAINT "FK_0cfedcaea398f4844c568d90f09" FOREIGN KEY ("optionId") REFERENCES "product_option"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_option" ADD CONSTRAINT "FK_1b23603644f3d5aa7f6777ee9cf" FOREIGN KEY ("nameId") REFERENCES "attribute"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_option" ADD CONSTRAINT "FK_2ca1aab0a82e9c0058d8465ad02" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "wishlist_item" ADD CONSTRAINT "FK_acb085dfe252134ae370f57fd4d" FOREIGN KEY ("productVariantId") REFERENCES "sku"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_7e2fe82497aa29798b51511ada4" FOREIGN KEY ("productVariantId") REFERENCES "sku"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_item" ADD CONSTRAINT "FK_47b024caf15725746fe69d1f487" FOREIGN KEY ("productVariantId") REFERENCES "sku"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "price" ADD CONSTRAINT "FK_3d61d641f96bbd3d6e9133161cc" FOREIGN KEY ("product_variant_id") REFERENCES "sku"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stock" ADD CONSTRAINT "FK_1de0ff48ab03b4ef777ea36e5c3" FOREIGN KEY ("skuId") REFERENCES "sku"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stock" ADD CONSTRAINT "FK_2cc5be32db1259f44995d0100aa" FOREIGN KEY ("warehouseId") REFERENCES "warehouse"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_image" ADD CONSTRAINT "FK_c73b8527a67e80b2f5067582878" FOREIGN KEY ("productVariantId") REFERENCES "sku"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sku" ADD CONSTRAINT "FK_b45cf051ab6f88a0db957e5a397" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_review" ADD CONSTRAINT "FK_de987f9289b240e8702c9b8148e" FOREIGN KEY ("productVariantId") REFERENCES "sku"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "variant_option_value_set" ADD CONSTRAINT "FK_2ac9fd0eb37ce61a48d6d90356a" FOREIGN KEY ("variant_id") REFERENCES "sku"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "variant_option_value_set" ADD CONSTRAINT "FK_12af10c4672970407c9d28eef6c" FOREIGN KEY ("option_value_id") REFERENCES "product_option_value"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "variant_option_value_set" DROP CONSTRAINT "FK_12af10c4672970407c9d28eef6c"`);
        await queryRunner.query(`ALTER TABLE "variant_option_value_set" DROP CONSTRAINT "FK_2ac9fd0eb37ce61a48d6d90356a"`);
        await queryRunner.query(`ALTER TABLE "product_review" DROP CONSTRAINT "FK_de987f9289b240e8702c9b8148e"`);
        await queryRunner.query(`ALTER TABLE "sku" DROP CONSTRAINT "FK_b45cf051ab6f88a0db957e5a397"`);
        await queryRunner.query(`ALTER TABLE "product_image" DROP CONSTRAINT "FK_c73b8527a67e80b2f5067582878"`);
        await queryRunner.query(`ALTER TABLE "stock" DROP CONSTRAINT "FK_2cc5be32db1259f44995d0100aa"`);
        await queryRunner.query(`ALTER TABLE "stock" DROP CONSTRAINT "FK_1de0ff48ab03b4ef777ea36e5c3"`);
        await queryRunner.query(`ALTER TABLE "price" DROP CONSTRAINT "FK_3d61d641f96bbd3d6e9133161cc"`);
        await queryRunner.query(`ALTER TABLE "cart_item" DROP CONSTRAINT "FK_47b024caf15725746fe69d1f487"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_7e2fe82497aa29798b51511ada4"`);
        await queryRunner.query(`ALTER TABLE "wishlist_item" DROP CONSTRAINT "FK_acb085dfe252134ae370f57fd4d"`);
        await queryRunner.query(`ALTER TABLE "product_option" DROP CONSTRAINT "FK_2ca1aab0a82e9c0058d8465ad02"`);
        await queryRunner.query(`ALTER TABLE "product_option" DROP CONSTRAINT "FK_1b23603644f3d5aa7f6777ee9cf"`);
        await queryRunner.query(`ALTER TABLE "product_option_value" DROP CONSTRAINT "FK_0cfedcaea398f4844c568d90f09"`);
        await queryRunner.query(`ALTER TABLE "product_option_value" DROP CONSTRAINT "FK_de5551c84efb565d35a7cab6411"`);
        await queryRunner.query(`ALTER TABLE "attribute_value" DROP CONSTRAINT "FK_123ac30d8ade936347e4099cc4a"`);
        await queryRunner.query(`ALTER TABLE "attribute" DROP CONSTRAINT "FK_296ba7ab81a81af0a725f131993"`);
        await queryRunner.query(`ALTER TABLE "product_review" DROP CONSTRAINT "UQ_ddac00c2e232e622762b74eab02"`);
        await queryRunner.query(`ALTER TABLE "product_review" DROP COLUMN "productVariantId"`);
        await queryRunner.query(`ALTER TABLE "product_review" ADD "productVariantId" integer`);
        await queryRunner.query(`ALTER TABLE "product_review" ADD CONSTRAINT "UQ_ddac00c2e232e622762b74eab02" UNIQUE ("productVariantId", "userId")`);
        await queryRunner.query(`ALTER TABLE "product_image" DROP COLUMN "productVariantId"`);
        await queryRunner.query(`ALTER TABLE "product_image" ADD "productVariantId" integer`);
        await queryRunner.query(`ALTER TABLE "cart_item" DROP COLUMN "productVariantId"`);
        await queryRunner.query(`ALTER TABLE "cart_item" ADD "productVariantId" integer`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "productVariantId"`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD "productVariantId" integer`);
        await queryRunner.query(`ALTER TABLE "wishlist_item" DROP COLUMN "productVariantId"`);
        await queryRunner.query(`ALTER TABLE "wishlist_item" ADD "productVariantId" integer`);
        await queryRunner.query(`DROP INDEX "public"."IDX_12af10c4672970407c9d28eef6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2ac9fd0eb37ce61a48d6d90356"`);
        await queryRunner.query(`DROP TABLE "variant_option_value_set"`);
        await queryRunner.query(`DROP TABLE "sku"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cf22acb2581b2684c7c4536c8d"`);
        await queryRunner.query(`DROP TABLE "stock"`);
        await queryRunner.query(`DROP TABLE "warehouse"`);
        await queryRunner.query(`DROP TABLE "price"`);
        await queryRunner.query(`DROP TABLE "product_option"`);
        await queryRunner.query(`DROP TABLE "product_option_value"`);
        await queryRunner.query(`DROP TABLE "attribute_value"`);
        await queryRunner.query(`DROP TABLE "attribute"`);
        await queryRunner.query(`DROP TABLE "attribute_type"`);
        await queryRunner.query(`ALTER TABLE "product_review" ADD CONSTRAINT "FK_de987f9289b240e8702c9b8148e" FOREIGN KEY ("productVariantId") REFERENCES "product_variant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_image" ADD CONSTRAINT "FK_c73b8527a67e80b2f5067582878" FOREIGN KEY ("productVariantId") REFERENCES "product_variant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_item" ADD CONSTRAINT "FK_47b024caf15725746fe69d1f487" FOREIGN KEY ("productVariantId") REFERENCES "product_variant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_7e2fe82497aa29798b51511ada4" FOREIGN KEY ("productVariantId") REFERENCES "product_variant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "wishlist_item" ADD CONSTRAINT "FK_acb085dfe252134ae370f57fd4d" FOREIGN KEY ("productVariantId") REFERENCES "product_variant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
