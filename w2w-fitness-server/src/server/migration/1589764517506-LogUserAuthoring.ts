import {MigrationInterface, QueryRunner} from 'typeorm';

export class LogUserAuthoring1589764517506 implements MigrationInterface {
    public name = 'LogUserAuthoring1589764517506';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "log" ADD "userId" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "log" ADD CONSTRAINT "FK_cea2ed3a494729d4b21edbd2983" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "log" DROP CONSTRAINT "FK_cea2ed3a494729d4b21edbd2983"`, undefined);
        await queryRunner.query(`ALTER TABLE "log" DROP COLUMN "userId"`, undefined);
    }

}
