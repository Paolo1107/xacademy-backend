import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../sequelize";

type MyPlayerAttrs = {
    id: number;
    long_name: string;
    player_positions: string;
    club_name?: string | null;
    nationality_name?: string | null;
    overall_rating: number;
    pace: number;
    shooting: number;
    passing: number;
    dribbling: number;
    defending: number;
    physic: number;
    gender: "male" | "female";
    fifa_version: string;
    created_by: number;
    created_at?: Date;
};

type MyPlayerCreationAttrs = Optional<MyPlayerAttrs, "id" | "created_at" | "club_name" | "nationality_name">;

export class MyPlayer extends Model<MyPlayerAttrs, MyPlayerCreationAttrs> implements MyPlayerAttrs {
    declare id: number;
    declare long_name: string;
    declare player_positions: string;
    declare club_name: string | null;
    declare nationality_name: string | null;
    declare overall_rating: number;
    declare pace: number;
    declare shooting: number;
    declare passing: number;
    declare dribbling: number;
    declare defending: number;
    declare physic: number;
    declare gender: "male" | "female";
    declare fifa_version: string;
    declare created_by: number;
    declare created_at?: Date;
}

MyPlayer.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        long_name: { type: DataTypes.STRING, allowNull: false },
        player_positions: { type: DataTypes.STRING, allowNull: false },
        club_name: { type: DataTypes.STRING, allowNull: true },
        nationality_name: { type: DataTypes.STRING, allowNull: true },
        overall_rating: { type: DataTypes.INTEGER, allowNull: false },
        pace: { type: DataTypes.INTEGER, allowNull: false },
        shooting: { type: DataTypes.INTEGER, allowNull: false },
        passing: { type: DataTypes.INTEGER, allowNull: false },
        dribbling: { type: DataTypes.INTEGER, allowNull: false },
        defending: { type: DataTypes.INTEGER, allowNull: false },
        physic: { type: DataTypes.INTEGER, allowNull: false },
        gender: { type: DataTypes.ENUM("male", "female"), allowNull: false },
        fifa_version: { type: DataTypes.STRING(10), allowNull: false },
        created_by: { type: DataTypes.INTEGER, allowNull: false },
        created_at: { type: DataTypes.DATE, allowNull: true },
    },
    { sequelize, modelName: "MyPlayer", tableName: "my_players", timestamps: false }
);
