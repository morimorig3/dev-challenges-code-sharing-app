import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1762439340826 implements MigrationInterface {
  name = 'InitialSchema1762439340826';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "snippets" ("id" character varying(21) NOT NULL, "code" text NOT NULL, "language" character varying(50) NOT NULL, "theme" character varying(50) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_da592ff802b6af1369e622402a6" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "snippets"`);
  }
}
