import express from "express";
import { getNasabahBatch, sendNasabahBatch } from "../controllers/nasabahBatchController";

const router = express.Router();

router.get("/batch/get", getNasabahBatch);
router.post("/batch/post", sendNasabahBatch);

export default router;
