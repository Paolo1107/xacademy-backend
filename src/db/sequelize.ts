import { Sequelize } from "sequelize";
import "dotenv/config";

export const sequelize = new Sequelize(
  process.env.DB_NAME ?? "",
  process.env.DB_USER ?? "",
  process.env.DB_PASS ?? "",
  {
    host: process.env.DB_HOST ?? "localhost",
    port: Number(process.env.DB_PORT ?? 3306),
    dialect: "mysql",
    logging: false,
  }
);


export async function testConnection() {
  try{
    await sequelize.authenticate();
    console.log("✅ Conexión a MySQL OK");
  }catch(err){
    console.error("❌ Error de conexión:", err);
  }
  
}