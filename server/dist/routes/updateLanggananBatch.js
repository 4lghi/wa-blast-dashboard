"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const updateLanggananControllerBatch_1 = require("../controllers/updateLanggananControllerBatch");
const router = express_1.default.Router();
router.patch("/updateLangganan", updateLanggananControllerBatch_1.updateLangganan);
exports.default = router;
