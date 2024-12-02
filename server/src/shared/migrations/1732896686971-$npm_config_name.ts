import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1732896686971 implements MigrationInterface {
    name = ' $npmConfigName1732896686971'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_item" DROP CONSTRAINT "FK_35ef5236f5544edfa7dff86d1eb"`);
        await queryRunner.query(`ALTER TABLE "cart_item" RENAME COLUMN "shoppingCartId" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "cart_item" ADD CONSTRAINT "FK_158f0325ccf7f68a5b395fa2f6a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_item" DROP CONSTRAINT "FK_158f0325ccf7f68a5b395fa2f6a"`);
        await queryRunner.query(`ALTER TABLE "cart_item" RENAME COLUMN "userId" TO "shoppingCartId"`);
        await queryRunner.query(`ALTER TABLE "cart_item" ADD CONSTRAINT "FK_35ef5236f5544edfa7dff86d1eb" FOREIGN KEY ("shoppingCartId") REFERENCES "shopping_cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
