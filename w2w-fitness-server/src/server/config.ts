import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { Log } from './entity/Log';
import { Terminology } from './entity/Terminology';

const typeOrmConfig: PostgresConnectionOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: process.env.POSTGRES_DB_USERNAME,
    password: process.env.POSTGRES_DB_PASSWORD,
    database: process.env.POSTGRES_DB_NAME,
    synchronize: process.env.NODE_ENV !== 'production',
    logging: true,
    entities: [
        Terminology,
        Log,
    ],
};

export default typeOrmConfig;
