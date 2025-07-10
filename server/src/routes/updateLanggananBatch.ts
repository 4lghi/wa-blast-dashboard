import express from "express";
import { updateLangganan } from "../controllers/updateLanggananControllerBatch";

const router = express.Router();

router.patch("/updateLangganan", updateLangganan);

export default router;
