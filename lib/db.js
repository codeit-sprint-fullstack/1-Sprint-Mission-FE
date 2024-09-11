import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import pkg from "pg";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, "..", ".env") });

const { Pool } = pkg;

const connectionSettings = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
};

const pool = new Pool(connectionSettings);

export default pool;
