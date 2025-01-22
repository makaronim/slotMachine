import {createPool} from 'mysql2/promise';

export const databaseProvider = createPool({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'example',
    database: 'casino_db'
})
