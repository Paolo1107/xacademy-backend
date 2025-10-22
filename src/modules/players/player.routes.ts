import { Router } from "express";
import { listPlayers, getPlayer, exportPlayers } from "./player.controller";
import { getPlayerValidator, listPlayersValidator } from "./players.validators";
import { handlevalidation } from "../../shared/validation";



const router = Router();

router.get("/", listPlayersValidator, handlevalidation, listPlayers);
router.get("/export", listPlayersValidator, handlevalidation, exportPlayers);
router.get("/:id", getPlayerValidator, handlevalidation, getPlayer);


export default router;
