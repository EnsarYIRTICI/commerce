import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1729412017121 implements MigrationInterface {
    name = ' $npmConfigName1729412017121'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "role" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "status" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "UQ_95ff138b88fdd8a7c9ebdb97a32" UNIQUE ("name"), CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_variant" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "sku" character varying NOT NULL, "price" integer NOT NULL, "productId" integer, CONSTRAINT "UQ_6b011a858bfcd83fde87abf1899" UNIQUE ("name"), CONSTRAINT "PK_1ab69c9935c61f7c70791ae0a9f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_image" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "url" character varying NOT NULL, "productId" integer, CONSTRAINT "UQ_337e1b4d2dc42cd7f55d7888751" UNIQUE ("name"), CONSTRAINT "PK_99d98a80f57857d51b5f63c8240" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "price_history" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "price" integer NOT NULL, "changeDate" TIMESTAMP NOT NULL, "productId" integer, CONSTRAINT "UQ_a40014a00110354d015681dbdbc" UNIQUE ("name"), CONSTRAINT "PK_e41e25472373d4b574b153229e9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "wishlist" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "title" character varying NOT NULL, "userId" integer, CONSTRAINT "UQ_9e361dc28d34dc87e51127adecb" UNIQUE ("name"), CONSTRAINT "PK_620bff4a240d66c357b5d820eaa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "wishlist_item" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "quantity" integer NOT NULL, "wishlistId" integer, "productId" integer, CONSTRAINT "UQ_2ec3a7f71809c5b5800ba05caaf" UNIQUE ("name"), CONSTRAINT "PK_dc473007d691690801365193b72" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shopping_cart" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, "userId" integer, CONSTRAINT "UQ_c4af62096a4f47fea286bbc2a77" UNIQUE ("name"), CONSTRAINT "PK_40f9358cdf55d73d8a2ad226592" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart_item" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "quantity" integer NOT NULL, "shoppingCartId" integer, "productId" integer, CONSTRAINT "UQ_2b4dcaae72716e20236beeaf9c3" UNIQUE ("name"), CONSTRAINT "PK_bd94725aa84f8cf37632bcde997" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shipment_detail" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "address" character varying NOT NULL, "estimatedDelivery" TIMESTAMP NOT NULL, "orderId" integer, CONSTRAINT "UQ_445dac50cc37d1c25fb6406ce8d" UNIQUE ("name"), CONSTRAINT "PK_c8ed04d3eddee75fabdbd4feafd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "payment_detail" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "cardNumber" character varying NOT NULL, "expirationDate" TIMESTAMP NOT NULL, "securityCode" character varying NOT NULL, "orderId" integer, CONSTRAINT "UQ_e5134cf5237a75bfb8ea70a8f27" UNIQUE ("name"), CONSTRAINT "PK_baeeedc69241f6ea2ee27443dc9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "address_detail" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "country" character varying NOT NULL, "region" character varying NOT NULL, "orderId" integer, CONSTRAINT "UQ_b6e6ac6849fc4699ac3639a6dea" UNIQUE ("name"), CONSTRAINT "PK_30d6456017efe972dcd5d2e45ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "totalPrice" integer NOT NULL, "status" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, "userId" integer, CONSTRAINT "UQ_abcf3e22c7bde40de76b993294e" UNIQUE ("name"), CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_item" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "quantity" integer NOT NULL, "price" integer NOT NULL, "orderId" integer, "productId" integer, CONSTRAINT "UQ_5cfd66eecf44588e49292127a8c" UNIQUE ("name"), CONSTRAINT "PK_d01158fe15b1ead5c26fd7f4e90" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "price" integer NOT NULL, "stock" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, "categoryId" integer, CONSTRAINT "UQ_22cc43e9a74d7498546e9a63e77" UNIQUE ("name"), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_review" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "rating" integer NOT NULL, "comment" character varying NOT NULL, "productId" integer, "userId" integer, CONSTRAINT "UQ_3c728e314a43f37e4be512b222a" UNIQUE ("name"), CONSTRAINT "PK_6c00bd3bbee662e1f7a97dbce9a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "payment" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "amount" integer NOT NULL, "method" character varying NOT NULL, "userId" integer, CONSTRAINT "UQ_06a96865bf0d5a224c8dc13c653" UNIQUE ("name"), CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "address" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "street" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "postalCode" character varying NOT NULL, "userId" integer, CONSTRAINT "UQ_7c28df07c7324228126a1e97285" UNIQUE ("name"), CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "action_type" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "UQ_51595da4c6d8dfb095403091a18" UNIQUE ("name"), CONSTRAINT "PK_d1c2e72ba9b5780623b78dde3f5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "activity_log" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "log" character varying NOT NULL, "timestamp" TIMESTAMP NOT NULL, "userId" integer, "actionTypeId" integer, CONSTRAINT "UQ_b661911b24c0786c6187e7ed86c" UNIQUE ("name"), CONSTRAINT "PK_067d761e2956b77b14e534fd6f1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "coupon" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "code" character varying NOT NULL, "discountPercentage" integer NOT NULL, "userId" integer, CONSTRAINT "UQ_0ecadaa094a214e25334625f696" UNIQUE ("name"), CONSTRAINT "PK_fcbe9d72b60eed35f46dc35a682" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, "roleId" integer, "statusId" integer, CONSTRAINT "UQ_065d4d8f3b5adb4a08841eae3c8" UNIQUE ("name"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "attribute_value" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "value" character varying NOT NULL, "productAttributeId" integer, CONSTRAINT "UQ_8e67e4a5f711d20c8168f316f59" UNIQUE ("name"), CONSTRAINT "PK_dff76d9cc1db2684732acdb9ca7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_attribute" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_05d080e931ec850c1e0219ee111" UNIQUE ("name"), CONSTRAINT "PK_f9b91f38df3dbbe481d9e056e5e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product_variant" ADD CONSTRAINT "FK_6e420052844edf3a5506d863ce6" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_image" ADD CONSTRAINT "FK_40ca0cd115ef1ff35351bed8da2" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "price_history" ADD CONSTRAINT "FK_bb9573da9c027e4b93c0746c513" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "wishlist" ADD CONSTRAINT "FK_f6eeb74a295e2aad03b76b0ba87" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "wishlist_item" ADD CONSTRAINT "FK_921ac5bf6c7c3b94000f105a86d" FOREIGN KEY ("wishlistId") REFERENCES "wishlist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "wishlist_item" ADD CONSTRAINT "FK_3318c9b2fa01dd1e9d05dbb4875" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shopping_cart" ADD CONSTRAINT "FK_bee83828c1e181ac7ba97267ca2" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_item" ADD CONSTRAINT "FK_35ef5236f5544edfa7dff86d1eb" FOREIGN KEY ("shoppingCartId") REFERENCES "shopping_cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_item" ADD CONSTRAINT "FK_75db0de134fe0f9fe9e4591b7bf" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shipment_detail" ADD CONSTRAINT "FK_c0d44db70ad9a16be34720b3f32" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment_detail" ADD CONSTRAINT "FK_a3771bd86dcdde381af8dda4022" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "address_detail" ADD CONSTRAINT "FK_d973dae98bc7d0745f33a44ac6f" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_904370c093ceea4369659a3c810" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_review" ADD CONSTRAINT "FK_06e7335708b5e7870f1eaa608d2" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_review" ADD CONSTRAINT "FK_db21a1dc776b455ee83eb7ff88e" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_b046318e0b341a7f72110b75857" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_d25f1ea79e282cc8a42bd616aa3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "activity_log" ADD CONSTRAINT "FK_d19abacc8a508c0429478ad166b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "activity_log" ADD CONSTRAINT "FK_eb283be1c8fe57c935ea5f9423c" FOREIGN KEY ("actionTypeId") REFERENCES "action_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "coupon" ADD CONSTRAINT "FK_03de14bf5e5b4410fced2ca9935" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_dc18daa696860586ba4667a9d31" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attribute_value" ADD CONSTRAINT "FK_d3fc0019b2c6c94656cb8b05938" FOREIGN KEY ("productAttributeId") REFERENCES "product_attribute"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attribute_value" DROP CONSTRAINT "FK_d3fc0019b2c6c94656cb8b05938"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_dc18daa696860586ba4667a9d31"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`);
        await queryRunner.query(`ALTER TABLE "coupon" DROP CONSTRAINT "FK_03de14bf5e5b4410fced2ca9935"`);
        await queryRunner.query(`ALTER TABLE "activity_log" DROP CONSTRAINT "FK_eb283be1c8fe57c935ea5f9423c"`);
        await queryRunner.query(`ALTER TABLE "activity_log" DROP CONSTRAINT "FK_d19abacc8a508c0429478ad166b"`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_d25f1ea79e282cc8a42bd616aa3"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_b046318e0b341a7f72110b75857"`);
        await queryRunner.query(`ALTER TABLE "product_review" DROP CONSTRAINT "FK_db21a1dc776b455ee83eb7ff88e"`);
        await queryRunner.query(`ALTER TABLE "product_review" DROP CONSTRAINT "FK_06e7335708b5e7870f1eaa608d2"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_ff0c0301a95e517153df97f6812"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_904370c093ceea4369659a3c810"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"`);
        await queryRunner.query(`ALTER TABLE "address_detail" DROP CONSTRAINT "FK_d973dae98bc7d0745f33a44ac6f"`);
        await queryRunner.query(`ALTER TABLE "payment_detail" DROP CONSTRAINT "FK_a3771bd86dcdde381af8dda4022"`);
        await queryRunner.query(`ALTER TABLE "shipment_detail" DROP CONSTRAINT "FK_c0d44db70ad9a16be34720b3f32"`);
        await queryRunner.query(`ALTER TABLE "cart_item" DROP CONSTRAINT "FK_75db0de134fe0f9fe9e4591b7bf"`);
        await queryRunner.query(`ALTER TABLE "cart_item" DROP CONSTRAINT "FK_35ef5236f5544edfa7dff86d1eb"`);
        await queryRunner.query(`ALTER TABLE "shopping_cart" DROP CONSTRAINT "FK_bee83828c1e181ac7ba97267ca2"`);
        await queryRunner.query(`ALTER TABLE "wishlist_item" DROP CONSTRAINT "FK_3318c9b2fa01dd1e9d05dbb4875"`);
        await queryRunner.query(`ALTER TABLE "wishlist_item" DROP CONSTRAINT "FK_921ac5bf6c7c3b94000f105a86d"`);
        await queryRunner.query(`ALTER TABLE "wishlist" DROP CONSTRAINT "FK_f6eeb74a295e2aad03b76b0ba87"`);
        await queryRunner.query(`ALTER TABLE "price_history" DROP CONSTRAINT "FK_bb9573da9c027e4b93c0746c513"`);
        await queryRunner.query(`ALTER TABLE "product_image" DROP CONSTRAINT "FK_40ca0cd115ef1ff35351bed8da2"`);
        await queryRunner.query(`ALTER TABLE "product_variant" DROP CONSTRAINT "FK_6e420052844edf3a5506d863ce6"`);
        await queryRunner.query(`DROP TABLE "product_attribute"`);
        await queryRunner.query(`DROP TABLE "attribute_value"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "coupon"`);
        await queryRunner.query(`DROP TABLE "activity_log"`);
        await queryRunner.query(`DROP TABLE "action_type"`);
        await queryRunner.query(`DROP TABLE "address"`);
        await queryRunner.query(`DROP TABLE "payment"`);
        await queryRunner.query(`DROP TABLE "product_review"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "order_item"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "address_detail"`);
        await queryRunner.query(`DROP TABLE "payment_detail"`);
        await queryRunner.query(`DROP TABLE "shipment_detail"`);
        await queryRunner.query(`DROP TABLE "cart_item"`);
        await queryRunner.query(`DROP TABLE "shopping_cart"`);
        await queryRunner.query(`DROP TABLE "wishlist_item"`);
        await queryRunner.query(`DROP TABLE "wishlist"`);
        await queryRunner.query(`DROP TABLE "price_history"`);
        await queryRunner.query(`DROP TABLE "product_image"`);
        await queryRunner.query(`DROP TABLE "product_variant"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "status"`);
        await queryRunner.query(`DROP TABLE "role"`);
    }

}
