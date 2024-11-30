import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1732957485968 implements MigrationInterface {
    name = ' $npmConfigName1732957485968'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wishlist_item" DROP CONSTRAINT "FK_921ac5bf6c7c3b94000f105a86d"`);
        await queryRunner.query(`ALTER TABLE "wishlist_item" DROP COLUMN "wishlistId"`);
        await queryRunner.query(`ALTER TABLE "wishlist_item" ADD "wishlistId" uuid`);
        await queryRunner.query(`ALTER TABLE "wishlist" DROP CONSTRAINT "PK_620bff4a240d66c357b5d820eaa"`);
        await queryRunner.query(`ALTER TABLE "wishlist" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "wishlist" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "wishlist" ADD CONSTRAINT "PK_620bff4a240d66c357b5d820eaa" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "wishlist_item" ADD CONSTRAINT "FK_921ac5bf6c7c3b94000f105a86d" FOREIGN KEY ("wishlistId") REFERENCES "wishlist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wishlist_item" DROP CONSTRAINT "FK_921ac5bf6c7c3b94000f105a86d"`);
        await queryRunner.query(`ALTER TABLE "wishlist" DROP CONSTRAINT "PK_620bff4a240d66c357b5d820eaa"`);
        await queryRunner.query(`ALTER TABLE "wishlist" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "wishlist" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "wishlist" ADD CONSTRAINT "PK_620bff4a240d66c357b5d820eaa" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "wishlist_item" DROP COLUMN "wishlistId"`);
        await queryRunner.query(`ALTER TABLE "wishlist_item" ADD "wishlistId" integer`);
        await queryRunner.query(`ALTER TABLE "wishlist_item" ADD CONSTRAINT "FK_921ac5bf6c7c3b94000f105a86d" FOREIGN KEY ("wishlistId") REFERENCES "wishlist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
