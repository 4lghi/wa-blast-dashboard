"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersController_1 = require("../controllers/usersController");
const router = express_1.default.Router();
router.get("/", usersController_1.getUsers);
router.post("/", usersController_1.createUser);
router.patch("/:id", usersController_1.updateUser);
router.delete("/:id", usersController_1.deleteUser);
exports.default = router;
