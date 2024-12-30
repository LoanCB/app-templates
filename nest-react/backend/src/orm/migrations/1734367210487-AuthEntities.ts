import { MigrationInterface, QueryRunner } from 'typeorm';

export class AuthEntities1734367210487 implements MigrationInterface {
  name = 'AuthEntities1734367210487';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE "public"."role_type_enum" AS ENUM('ADMINISTRATOR', 'MANAGER', 'READ_ONLY')
        `);
    await queryRunner.query(`
            CREATE TABLE "role" (
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "id" SERIAL NOT NULL,
                "title" character varying NOT NULL,
                "type" "public"."role_type_enum" NOT NULL,
                "description" character varying NOT NULL,
                CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."user_type_enum" AS ENUM('INTERNAL', 'API')
        `);
    await queryRunner.query(`
            CREATE TABLE "user" (
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "id" SERIAL NOT NULL,
                "deleted_at" TIMESTAMP,
                "first_name" character varying NOT NULL,
                "last_name" character varying NOT NULL,
                "email" character varying NOT NULL,
                "api_key" character varying,
                "password" character varying NOT NULL,
                "type" "public"."user_type_enum" NOT NULL DEFAULT 'INTERNAL',
                "is_active" boolean NOT NULL DEFAULT true,
                "role_id" integer,
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
                CONSTRAINT "UQ_55518b11e5013893f3b9f074209" UNIQUE ("api_key"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561 "
            FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561"
        `);
    await queryRunner.query(`
            DROP TABLE "user"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."user_type_enum"
        `);
    await queryRunner.query(`
            DROP TABLE "role"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."role_type_enum"
        `);
  }
}
