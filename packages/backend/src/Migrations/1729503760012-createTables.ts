import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1729503760012 implements MigrationInterface {
    name = 'CreateTables1729503760012'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`streams\` (\`id\` int NOT NULL AUTO_INCREMENT, \`identifier\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`is_active\` tinyint NOT NULL DEFAULT 1, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`status\` enum ('Idle', 'Live', 'Suspended') NOT NULL DEFAULT 'Idle', \`viewers\` int NOT NULL DEFAULT '0', \`last_seen\` timestamp NOT NULL, \`live_url\` varchar(255) NOT NULL, \`encrypted_stream_data\` text NULL, \`project_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`projects\` (\`id\` int NOT NULL AUTO_INCREMENT, \`identifier\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`is_active\` tinyint NOT NULL DEFAULT 1, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`title\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`image_url\` varchar(255) NULL, \`peers_roles\` text NOT NULL, \`owner_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`auth_accounts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`identifier\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`is_active\` tinyint NOT NULL DEFAULT 1, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`user_id\` varchar(255) NOT NULL, \`auth_provider\` enum ('google', 'github', 'metamask') NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_projects\` (\`project_id\` int NOT NULL, \`auth_account_id\` int NOT NULL, INDEX \`IDX_4c6aaf014ba0d66a74bb552272\` (\`project_id\`), INDEX \`IDX_ed807e4b5594cfd60a47139881\` (\`auth_account_id\`), PRIMARY KEY (\`project_id\`, \`auth_account_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`streams\` ADD CONSTRAINT \`FK_7922c6ee27fb212df1c819e3605\` FOREIGN KEY (\`project_id\`) REFERENCES \`projects\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`projects\` ADD CONSTRAINT \`FK_b1bd2fbf5d0ef67319c91acb5cf\` FOREIGN KEY (\`owner_id\`) REFERENCES \`auth_accounts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_projects\` ADD CONSTRAINT \`FK_4c6aaf014ba0d66a74bb5522726\` FOREIGN KEY (\`project_id\`) REFERENCES \`projects\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_projects\` ADD CONSTRAINT \`FK_ed807e4b5594cfd60a471398815\` FOREIGN KEY (\`auth_account_id\`) REFERENCES \`auth_accounts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_projects\` DROP FOREIGN KEY \`FK_ed807e4b5594cfd60a471398815\``);
        await queryRunner.query(`ALTER TABLE \`user_projects\` DROP FOREIGN KEY \`FK_4c6aaf014ba0d66a74bb5522726\``);
        await queryRunner.query(`ALTER TABLE \`projects\` DROP FOREIGN KEY \`FK_b1bd2fbf5d0ef67319c91acb5cf\``);
        await queryRunner.query(`ALTER TABLE \`streams\` DROP FOREIGN KEY \`FK_7922c6ee27fb212df1c819e3605\``);
        await queryRunner.query(`DROP INDEX \`IDX_ed807e4b5594cfd60a47139881\` ON \`user_projects\``);
        await queryRunner.query(`DROP INDEX \`IDX_4c6aaf014ba0d66a74bb552272\` ON \`user_projects\``);
        await queryRunner.query(`DROP TABLE \`user_projects\``);
        await queryRunner.query(`DROP TABLE \`auth_accounts\``);
        await queryRunner.query(`DROP TABLE \`projects\``);
        await queryRunner.query(`DROP TABLE \`streams\``);
    }

}
