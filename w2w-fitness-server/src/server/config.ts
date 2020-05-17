import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { Log } from './entity/Log';
import { Terminology } from './entity/Terminology';
import { User } from './entity/User';

const typeOrmConfig: PostgresConnectionOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_DB_HOST,
    port: parseInt(process.env.POSTGRES_DB_PORT as string, 10),
    username: process.env.POSTGRES_DB_USERNAME,
    password: process.env.POSTGRES_DB_PASSWORD,
    database: process.env.POSTGRES_DB_NAME,
    migrations: ['src/server/migration/**/*.ts'],
    migrationsTransactionMode: 'all',
    migrationsRun: process.env.NODE_ENV !== 'production',
    synchronize: process.env.NODE_ENV !== 'production', // Update database automatically based on Entities
    logging: true,
    entities: [
        Terminology,
        Log,
        User,
    ],
};

// This is a TypeScript module hack to get typeorm's CLI to play nicely with this config object
// https://github.com/typeorm/typeorm/issues/4068
export = typeOrmConfig;
