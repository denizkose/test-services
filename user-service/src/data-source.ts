import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from './user/entities/user.entity';
dotenv.config({ path: '../.env' });

const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    password: process.env.DB_PASSWORD,
    username: process.env.DB_USER,
    entities: [User],
    database: process.env.DB_NAME,
    synchronize: false,
    logging: true,
    migrations: [__dirname + '/migrations/*{.js, .ts}'],
});

export default AppDataSource;
