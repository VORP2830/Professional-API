import models from 'src/models/models';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const PostgresDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [...models],
    migrations: ['dist/migrations/*'],
    migrationsRun: true,
    synchronize: true,
});
