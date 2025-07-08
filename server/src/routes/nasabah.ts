import express from "express";
import {
  getAllNasabah,
  getNasabahById,
  createNasabah,
  updateNasabah,
  deleteNasabah,
} from "../controllers/nasabahController";

const router = express.Router();

router.get("/", getAllNasabah);
router.get("/:id", getNasabahById);
router.post("/", createNasabah);
router.patch("/:id", updateNasabah);
router.delete("/:id", deleteNasabah);

export default router;
