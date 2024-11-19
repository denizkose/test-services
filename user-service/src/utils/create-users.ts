import { Client } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const client = new Client({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

async function seedUsers() {
    try {
        await client.connect();

        const batchSize = 5000;
        const totalUsers = 1000000;
        const insertQuery = 'INSERT INTO users ("first_name", "last_name", "age", "gender", "has_problems") VALUES ';
        let values: string[] = [];

        for (let i = 0; i < totalUsers; i++) {
            values.push(`('Name${i}', 'Surname${i}', ${Math.floor(Math.random() * 60) + 18}, 'M', ${Math.random() > 0.7})`);

            if (values.length === batchSize) {
                await client.query(insertQuery + values.join(','));
                console.log(i + 1)
                values = [];
            }
        }

        if (values.length > 0) {
            await client.query(insertQuery + values.join(','));
        }

        console.log('User data inserted successfully');
    } catch (error) {
        console.error('Error inserting users:', error);
    } finally {
        await client.end();
    }
}
seedUsers();