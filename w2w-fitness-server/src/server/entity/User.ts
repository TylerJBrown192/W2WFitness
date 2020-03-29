import bcrypt from 'bcryptjs';
import { IsEmail, Length } from 'class-validator';
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    public id: number;

    // Length derived from https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
    @Column({ unique: true, length: 320 })
    @IsEmail()
    @Length(3, 320)
    public email: string;

    @Column({ length: 50 })
    @Length(1, 50)
    public password: string;

    @Column({ length: 50 })
    @Length(1, 50)
    public firstName: string;

    @Column({ length: 50 })
    @Length(1, 50)
    public lastName: string;

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
