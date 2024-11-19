import { DataSource } from 'typeorm';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
    imports: [],
    providers: [
        {
            provide: DataSource,
            inject: [],
            useFactory: async () => {
                try {
                    const dataSource = new DataSource({
                        type: 'postgres',
                        host: process.env.DB_HOST,
                        port: Number(process.env.DB_PORT),
                        password: process.env.DB_PASSWORD,
                        username: process.env.DB_USER,
                        database: process.env.DB_NAME,
                        synchronize: true,
                        logging: true,
                        entities: [__dirname + '/**/**/*.entity{.js, .ts}'],
                        migrations: [__dirname + '/migrations/*{.js, .ts}']
                    });
                    await dataSource.initialize();
                    console.log('Database connected successfully');
                    return dataSource;
                } catch (error) {
                    console.log('Error connecting to database');
                    throw error;
                }
            },
        },
    ],
    exports: [DataSource],
})
export class TypeOrmModule { }