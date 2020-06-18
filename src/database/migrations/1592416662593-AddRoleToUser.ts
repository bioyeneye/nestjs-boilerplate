import {MigrationInterface, QueryRunner} from "typeorm";

export class AddRoleToUser1592416662593 implements MigrationInterface {
    name = 'AddRoleToUser1592416662593'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "Users_role_enum" AS ENUM('role', 'admin')`);
        await queryRunner.query(`ALTER TABLE "Users" ADD "Role" "Users_role_enum" NOT NULL DEFAULT 'role'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "Role"`);
        await queryRunner.query(`DROP TYPE "Users_role_enum"`);
    }

}
