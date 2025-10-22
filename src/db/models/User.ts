import { DataTypes, Model } from "sequelize";
import { sequelize } from "../sequelize";

export class User extends Model {
    declare id: number;
    declare email: string;
    declare password_hash: string;
    declare role: "admin" | "user";
}


User.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        email: { type: DataTypes.STRING(120), allowNull: false, unique: true },
        password_hash: { type: DataTypes.STRING(255), allowNull: false },
        role: { type: DataTypes.ENUM("admin", "user"), allowNull: false, defaultValue: "user" },
    },
    { sequelize, modelName: "User", tableName: "users", timestamps: false }
);