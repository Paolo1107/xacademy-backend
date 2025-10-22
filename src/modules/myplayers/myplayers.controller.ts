import { Request, Response } from "express";
import { MyPlayer } from "../../db/models/MyPlayer";

export async function createMyPlayer(req: Request, res: Response) {
  // user viene del middleware auth (JWT)
  const userId = req.user?.sub;
  if (!userId) return res.status(401).json({ message: "No autorizado" });

  const payload = {
    ...req.body,
    created_by: userId
  };

  const player = await MyPlayer.create(payload);
  return res.status(201).json(player);
}

export async function updateMyPlayer(req: Request, res: Response) {
  const userId = req.user?.sub;
  if (!userId) return res.status(401).json({ message: "No autorizado" });

  const id = Number(req.params.id);
  const player = await MyPlayer.findByPk(id);
  if (!player) return res.status(404).json({ message: "Not found" });

  // Ownership: solo el dueño puede editar
  if (player.created_by !== userId) {
    return res.status(403).json({ message: "Prohibido: no sos el creador" });
  }

  await player.update(req.body);
  return res.json(player);
}

export async function listMyPlayers(req: Request, res: Response) {
  const userId = req.user?.sub;
  if (!userId) return res.status(401).json({ message: "No autorizado" });

  const { page = "1", pageSize = "10" } = req.query as Record<string, string>;
  const p = Math.max(parseInt(page, 10) || 1, 1);
  const ps = Math.min(Math.max(parseInt(pageSize, 10) || 10, 1), 100);

  const offset = (p - 1) * ps;

  const { rows, count } = await MyPlayer.findAndCountAll({
    where: { created_by: userId },
    order: [["id", "DESC"]],
    limit: ps,
    offset,
  });

  res.json({ page: p, pageSize: ps, total: count, data: rows });
}
