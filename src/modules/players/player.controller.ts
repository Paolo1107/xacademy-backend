import { Request, Response } from "express";
import { PlayerFlat } from "../../db/models/PlayerFlat";
import { Op } from "sequelize";

export async function listPlayers(req: Request, res: Response) {
  const {
    page = "1",
    pageSize = "20",
    name = "",
    club = "",
    position = "",
    gender = "",
    version = "",
  } = req.query as Record<string, string>;

  const pageNum = Math.max(Number(page) || 1, 1);
  const sizeNum = Math.min(Math.max(Number(pageSize) || 20, 1), 100);
  const offset = (pageNum - 1) * sizeNum;

  const where: any = {};
  if (gender) where.gender = gender;             // 'male' | 'female'
  if (version) where.fifa_version = version;
  if (name) where.long_name = { [Op.like]: `%${name}%` };
  if (club) where.club_name = { [Op.like]: `%${club}%` };
  if (position) where.player_positions = { [Op.like]: `%${position}%` };

  const { rows, count } = await PlayerFlat.findAndCountAll({
    where,
    order: [["long_name", "ASC"]],
    limit: sizeNum,
    offset,
  });

  res.json({
    data: rows,
    page: pageNum,
    pageSize: sizeNum,
    total: count,
    totalPages: Math.ceil(count / sizeNum),
  });
}

export async function getPlayer(req: Request, res: Response) {
  // 1) Extraemos el ID del jugador de la URL y los posibles filtros de género y versión desde la query
  const { id } = req.params;
  const { gender = "", version = "" } = req.query as Record<string, string>
  // 2) Preparamos el filtro "where" para la consulta
  const where: any = { id: Number(id) };
  if (gender) where.gender = gender;
  if (version) where.fifa_version = version;
  //    - Aseguramos que el ID sea numérico
  //    - Si hay filtro de género o versión, los añadimos
  // 3) Realizamos la consulta buscando un jugador que coincida con el filtro
  const player = await PlayerFlat.findOne({ where });
  // 4) Si no encontramos al jugador, devolvemos un error 404
  if (!player) {
    return res.status(404).json({ message: "Player not found" });
  }
  // 5) Si encontramos al jugador, devolvemos la información (incluye las 6 skills del radar)
  res.json(player);
}

export async function exportPlayers(req: Request, res: Response) {
  const {
    name = "",
    club = "",
    position = "",
    gender = "",
    version = "",
  } = req.query as Record<string, string>;

  const where: any = {};
  if (gender) where.gender = gender;
  if (version) where.fifa_version = version;
  if (name) where.long_name = { [Op.like]: `%${name}%` };
  if (club) where.club_name = { [Op.like]: `%${club}%` };
  if (position) where.player_positions = { [Op.like]: `%${position}%` };

  const rows = await PlayerFlat.findAll({
    where,
    order: [["long_name", "ASC"]],
    limit: 10000
    // Para evitar exports gigantes, colocamos un limit
  });

  // columnas que exportamos
  const headers = [
    "long_name", "player_positions", "club_name", "nationality_name",
    "overall_rating", "pace", "shooting", "passing", "dribbling", "defending", "physic",
    "gender", "fifa_version"
  ];

  const escape = (v: any) => {
    if (v === null || v === undefined) return "";
    const s = String(v);
    // si contiene comas/dobles comillas/saltos, lo encerramos en comillas dobles y duplicamos las comillas internas
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };

  const lines: string[] = [];
  lines.push(headers.join(",")); // header
  for (const r of rows) {
    const line = [
      r.get("long_name"),
      r.get("player_positions"),
      r.get("club_name"),
      r.get("nationality_name"),
      r.get("overall_rating"),
      r.get("pace"),
      r.get("shooting"),
      r.get("passing"),
      r.get("dribbling"),
      r.get("defending"),
      r.get("physic"),
      r.get("gender"),
      r.get("fifa_version"),
    ].map(escape).join(",");
    lines.push(line);
  }

  const csv = lines.join("\n");
  res.setHeader("Content-Type", "text/csv; charset=utf-8");
  res.setHeader("Content-Disposition", "attachment; filename=players_export.csv");
  return res.send(csv);
}

