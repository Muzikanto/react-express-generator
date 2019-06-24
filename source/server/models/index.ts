import {Pool} from "pg";

const config = require('../../config.json');
const pool = new Pool({
    connectionString: config.postgresSqlUrl,
    ssl: true
});

function getQuery() {
    const session = `
        create table if not exists session (
            sid varchar NOT NULL COLLATE "default",
            sess json NOT NULL,
            expire timestamp(6) NOT NULL
        );
    `;

    const users = `
        create table if not exists users (
            id SERIAL PRIMARY KEY,
            nick varchar(50) NOT NULL,
            email varchar(30) NOT NULL UNIQUE,
            hashed_password varchar(50) NOT NULL,
            created timestamp DEFAULT CURRENT_TIMESTAMP
        );
    `;

    return session + users;
}

pool.query(getQuery(), (err: Error) => {
    err && console.log('Error Create Tables', err);
});

export {
    pool,
};
