import { DataTypes, Model } from "sequelize";
import { sequelize } from "../sequelize";

export class PlayerFlat extends Model {}

PlayerFlat.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    fifa_version: DataTypes.STRING,
    long_name: DataTypes.STRING,
    player_positions: DataTypes.STRING,
    club_name: DataTypes.STRING,
    nationality_name: DataTypes.STRING,
    overall_rating: DataTypes.INTEGER,
    pace: DataTypes.INTEGER,
    shooting: DataTypes.INTEGER,
    passing: DataTypes.INTEGER,
    dribbling: DataTypes.INTEGER,
    defending: DataTypes.INTEGER,
    physic: DataTypes.INTEGER,
    gender: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "PlayerFlat",
    tableName: "v_players_flat", // vista unificada que se creo para visualizar tanto male como female juntos
    timestamps: false,
  }
);
