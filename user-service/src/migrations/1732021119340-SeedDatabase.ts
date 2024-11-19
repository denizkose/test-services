import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedDatabase1732021119340 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const batchSize = 5000;
        const totalUsers = 1000000;
        const insertQuery = 'INSERT INTO users ("first_name", "last_name", "age", "gender", "has_problems") VALUES ';
        let values: string[] = [];

        for (let i = 0; i < totalUsers; i++) {
            values.push(`('Name${i}', 'Surname${i}', ${Math.floor(Math.random() * 60) + 18}, 'M', ${Math.random() > 0.7})`);

            if (values.length === batchSize) {
                await queryRunner.query(insertQuery + values.join(','));
                console.log(i + 1)
                values = [];
            }
        }

        if (values.length > 0) {
            await queryRunner.query(insertQuery + values.join(','));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
