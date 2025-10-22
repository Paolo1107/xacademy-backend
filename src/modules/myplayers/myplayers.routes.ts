import { Router } from "express";
import { createMyPlayer, updateMyPlayer, listMyPlayers } from "./myplayers.controller";
import { createMyPlayerValidator, updateMyPlayerValidator } from "./myplayers.validator";
import { handlevalidation } from "../../shared/validation";

const router = Router();

router.get("/", listMyPlayers);
router.post("/", createMyPlayerValidator, handlevalidation, createMyPlayer);
router.put("/:id", updateMyPlayerValidator, handlevalidation, updateMyPlayer);

export default router;