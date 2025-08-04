import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();
const mysqlPool = mysql.createPool({
  host: "sp6xl8zoyvbumaa2.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  user: "trm0hwsbhrph94ai",
  password: "fcurj8kar46ilc68",
  database: "r01y3xllus2pnoo3",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
export default mysqlPool;
//mysql://trm0hwsbhrph94ai:fcurj8kar46ilc68@sp6xl8zoyvbumaa2.cbetxkdyhwsb.us-east-
