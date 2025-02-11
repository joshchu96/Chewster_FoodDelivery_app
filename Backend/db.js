import pkg from "pg";
import dotenv from "dotenv";

dotenv.config(); //grab data from the .env file in the root folder directory

const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
});

const db = {
  query: (text, params) => pool.query(text, params),
};

export default db;
