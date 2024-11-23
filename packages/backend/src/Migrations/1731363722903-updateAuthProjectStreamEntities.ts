import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateAuthProjectStreamEntities1731363722903
  implements MigrationInterface
{
  name = 'UpdateAuthProjectStreamEntities1731363722903';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`auth_accounts\` ADD \`stream_tokens\` text NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`auth_accounts\` ADD \`notifications\` text NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`streams\` CHANGE \`status\` \`status\` enum ('Idle', 'Live', 'Suspended', 'Ended') NOT NULL DEFAULT 'Idle'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`streams\` CHANGE \`status\` \`status\` enum ('Idle', 'Live', 'Suspended') NOT NULL DEFAULT 'Idle'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`auth_accounts\` DROP COLUMN \`notifications\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`auth_accounts\` DROP COLUMN \`stream_tokens\``,
    );
  }
}
