import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();
const mysqlPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Kahoo_z2003BINTE",
  database: "fish_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
export default mysqlPool;
