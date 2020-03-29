import {getRepository, MigrationInterface, QueryRunner} from 'typeorm';
import { User } from '../entity/User';

export class CreateAdminUser1585450787289 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const user = new User();
        user.email = 'admin@admin';
        user.password = 'admin';
        await user.hashPassword();
        const userRepository = getRepository<User>(User);
        await userRepository.save(user);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        const userRepository = getRepository<User>(User);
        await userRepository.delete({ email: 'admin@admin' });
    }
}
