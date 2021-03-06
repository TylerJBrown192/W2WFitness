import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { PostgresNumericColumnTransformer } from '../utils/PostgresNumericColumnTransformer';
import { User } from './User';


@Entity()
export class Log {

    @PrimaryGeneratedColumn()
    public id: number;

    // column format: "2017-06-21"
    // TODO: Test passing a Date in here instead of a string
    @Column('date')
    public date: string;

    // Precision is the number of digits in a number.
    // Scale is the number of digits to the right of the decimal point in a number (and must not be greater than precision).
    // https://github.com/typeorm/typeorm/blob/master/src/decorator/options/ColumnNumericOptions.ts
    @Column('decimal', { precision: 5, scale: 2, transformer: new PostgresNumericColumnTransformer() })
    public weight: number;

    // TODO: postgres' node driver converts `decimal` types to strings coming out of the DB (due to js number sizing limitations?)
    // Let's not mess with the `pg` node driver, instead create a basic Transformer class and attach it to every `decimal` column
    // https://github.com/typeorm/typeorm/issues/873#issuecomment-424643086
    @Column('decimal', { precision: 3, scale: 1, transformer: new PostgresNumericColumnTransformer() })
    public sleepHours: number;

    // TODO: Add a min & max constraint
    //// https://github.com/typeorm/typeorm/blob/master/docs/decorator-reference.md#check
    @Column('int2')
    public emotionalRating: number;

    @Column('int2')
    public physicalRating: number;

    @Column()
    public notes: string;

    @Column('decimal', { precision: 5, scale: 1, transformer: new PostgresNumericColumnTransformer() })
    public calories: number;

    @Column('decimal', { precision: 4, scale: 1, transformer: new PostgresNumericColumnTransformer() })
    public fatGrams: number;

    @Column('decimal', { precision: 4, scale: 1, transformer: new PostgresNumericColumnTransformer() })
    public carbohydrateGrams: number;

    @Column('decimal', { precision: 4, scale: 1, transformer: new PostgresNumericColumnTransformer() })
    public proteinGrams: number;

    @ManyToOne((type) => User, (user: User) => user.dailyLogs)
    public user: User;
    // The userId column is automatically created via TypeORM with the relationship declaration above
    // but without the property being explicitly declared within this model, some relational operations become harder
    public userId: number;

    @CreateDateColumn()
    public createdAt: Date;
    @UpdateDateColumn()
    public updatedAt: Date;
}
