"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const nasabahBatchController_1 = require("../controllers/nasabahBatchController");
const router = express_1.default.Router();
router.get("/batch/get", nasabahBatchController_1.getNasabahBatch);
router.post("/batch/post", nasabahBatchController_1.sendNasabahBatch);
exports.default = router;
