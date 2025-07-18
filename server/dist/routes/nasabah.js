"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const nasabahController_1 = require("../controllers/nasabahController");
const router = express_1.default.Router();
router.get("/", nasabahController_1.getAllNasabah);
router.get("/:id", nasabahController_1.getNasabahById);
router.post("/", nasabahController_1.createNasabah);
router.patch("/:id", nasabahController_1.updateNasabah);
router.delete("/:id", nasabahController_1.deleteNasabah);
exports.default = router;
