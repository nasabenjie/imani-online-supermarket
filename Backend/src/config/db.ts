import pkg from "pg";

const { Pool } = pkg;

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "imani_supermarket",
  password: "1234",
  port: 5432,
});
