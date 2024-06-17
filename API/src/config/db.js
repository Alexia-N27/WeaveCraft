import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PSWD,
  port: process.env.DB_PORT
});

pool.getConnection()
    .then(response => console.log(`Connected to the database ${response.config.database}`));

export default pool;
