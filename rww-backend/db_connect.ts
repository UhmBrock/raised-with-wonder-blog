import { Pool } from 'pg';
import { config } from 'dotenv';

export default class DatabaseConnection {
    static getDatabaseConnection() {
        const result = config();

        if(result.error) {
            throw result.error;
        }

        const port = Number.parseInt(process.env.DB_PORT || '5000');
        const username = process.env.DB_USER;
        const password = process.env.DB_PASS;
        const host = process.env.DB_HOST;
        const database = process.env.DB_NAME;
        const pool = new Pool({
            user: username,
            host: host,
            database: database,
            password: password,
            port: port,
          });
        return pool;
    }
}