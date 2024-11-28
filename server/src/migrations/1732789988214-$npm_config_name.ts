import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1732789988214 implements MigrationInterface {
    name = ' $npmConfigName1732789988214'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shopping_cart" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "shopping_cart" ADD CONSTRAINT "UQ_bee83828c1e181ac7ba97267ca2" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "shopping_cart" ADD CONSTRAINT "FK_bee83828c1e181ac7ba97267ca2" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shopping_cart" DROP CONSTRAINT "FK_bee83828c1e181ac7ba97267ca2"`);
        await queryRunner.query(`ALTER TABLE "shopping_cart" DROP CONSTRAINT "UQ_bee83828c1e181ac7ba97267ca2"`);
        await queryRunner.query(`ALTER TABLE "shopping_cart" DROP COLUMN "userId"`);
    }

}
