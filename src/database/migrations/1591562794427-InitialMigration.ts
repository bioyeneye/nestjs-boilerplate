import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1591562794427 implements MigrationInterface {
    name = 'InitialMigration1591562794427'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "EmailVerifications" ("Id" uuid NOT NULL DEFAULT uuid_generate_v4(), "CreatedDate" TIMESTAMP NOT NULL, "EmailToken" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_1426aa38875ad00549c8f5635f9" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "SmsVerifications" ("Id" uuid NOT NULL DEFAULT uuid_generate_v4(), "CreatedDate" TIMESTAMP NOT NULL, "SmsToken" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_4cdb8f454ae6a20ab5f467d22f3" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "AuditSections" ("Id" uuid NOT NULL DEFAULT uuid_generate_v4(), "CreatedDate" TIMESTAMP NOT NULL, "Name" character varying NOT NULL, CONSTRAINT "PK_0c419331140a5f26a389977c522" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "AuditActions" ("Id" uuid NOT NULL DEFAULT uuid_generate_v4(), "CreatedDate" TIMESTAMP NOT NULL, "Name" character varying NOT NULL, "SectionId" integer NOT NULL, "auditSectionId" uuid, CONSTRAINT "PK_da977aa0d526b77c8c9d4c15644" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "AuditTrails" ("Id" uuid NOT NULL DEFAULT uuid_generate_v4(), "CreatedDate" TIMESTAMP NOT NULL, "UserIp" character varying, "Details" character varying, "TimeStamp" TIMESTAMP NOT NULL, "IsMobile" boolean NOT NULL, "BrowserName" character varying, "UserId" integer NOT NULL, "auditActionId" uuid, "userId" uuid, CONSTRAINT "PK_96eef4917ec7612be5127b3b241" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "Users" ("Id" uuid NOT NULL DEFAULT uuid_generate_v4(), "CreatedDate" TIMESTAMP NOT NULL, "UpdatedDate" TIMESTAMP, "UserName" character varying NOT NULL, "FirstName" character varying NOT NULL, "LastName" character varying NOT NULL, "PhoneNumber" character varying NOT NULL, "PhoneNumberConfirmed" boolean NOT NULL DEFAULT false, "email" character varying NOT NULL, "EmailConfirmed" boolean NOT NULL DEFAULT false, "PasswordHash" character varying NOT NULL, "PhoneNumberVerificationCode" character varying, "EmailVerificationToken" character varying, "DOB" TIMESTAMP, "LockoutEnabled" boolean NOT NULL DEFAULT false, "LockoutEndDateUtc" TIMESTAMP, "AccessFailedCount" integer NOT NULL DEFAULT 0, CONSTRAINT "UQ_3c3ab3f49a87e6ddb607f3c4945" UNIQUE ("email"), CONSTRAINT "PK_329bb2946729a51bd2b19a5159f" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`ALTER TABLE "EmailVerifications" ADD CONSTRAINT "FK_698db894d76998a1758296be277" FOREIGN KEY ("userId") REFERENCES "Users"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "SmsVerifications" ADD CONSTRAINT "FK_d9e47dcd76a2b924bc9fad6e9e3" FOREIGN KEY ("userId") REFERENCES "Users"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "AuditActions" ADD CONSTRAINT "FK_ebbfd558fcb07fbfd34b822e489" FOREIGN KEY ("auditSectionId") REFERENCES "AuditSections"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "AuditTrails" ADD CONSTRAINT "FK_06cc80128dfd5e18a1a07df1907" FOREIGN KEY ("auditActionId") REFERENCES "AuditActions"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "AuditTrails" ADD CONSTRAINT "FK_7e347fc5675a90e9261a94c798a" FOREIGN KEY ("userId") REFERENCES "Users"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "AuditTrails" DROP CONSTRAINT "FK_7e347fc5675a90e9261a94c798a"`);
        await queryRunner.query(`ALTER TABLE "AuditTrails" DROP CONSTRAINT "FK_06cc80128dfd5e18a1a07df1907"`);
        await queryRunner.query(`ALTER TABLE "AuditActions" DROP CONSTRAINT "FK_ebbfd558fcb07fbfd34b822e489"`);
        await queryRunner.query(`ALTER TABLE "SmsVerifications" DROP CONSTRAINT "FK_d9e47dcd76a2b924bc9fad6e9e3"`);
        await queryRunner.query(`ALTER TABLE "EmailVerifications" DROP CONSTRAINT "FK_698db894d76998a1758296be277"`);
        await queryRunner.query(`DROP TABLE "Users"`);
        await queryRunner.query(`DROP TABLE "AuditTrails"`);
        await queryRunner.query(`DROP TABLE "AuditActions"`);
        await queryRunner.query(`DROP TABLE "AuditSections"`);
        await queryRunner.query(`DROP TABLE "SmsVerifications"`);
        await queryRunner.query(`DROP TABLE "EmailVerifications"`);
    }

}
