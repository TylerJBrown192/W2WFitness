import bcrypt from 'bcryptjs';
import { IsEmail, Length } from 'class-validator';
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Log } from './Log';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    public id: number;

    // Length derived from https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
    @Column({ unique: true, length: 320 })
    @IsEmail()
    @Length(3, 320)
    public email: string;

    @Column({ length: 200 })
    @Length(1, 50)
    public password: string;

    @Column({ length: 50 })
    @Length(1, 50)
    public firstName: string;

    @Column({ length: 50 })
    @Length(1, 50)
    public lastName: string;

    @OneToMany((type) => Log, (log: Log) => log.user)
    public dailyLogs: Log[];

    @CreateDateColumn()
    public createdAt: Date;
    @UpdateDateColumn()
    public updatedAt: Date;

    public async hashPassword(): Promise<void> {
        await bcrypt.hash(this.password, 8)
            .then((hashedPassword: string) => this.password = hashedPassword);
    }

    public checkPasswordValidity(unencryptedPassword: string): Promise<boolean> {
        return bcrypt.compare(unencryptedPassword, this.password);
    }
}
