"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUsers = void 0;
const prisma_1 = __importDefault(require("../prisma"));
// GET all users
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma_1.default.users.findMany();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
});
exports.getUsers = getUsers;
// POST create new user
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, email, name, password } = req.body;
    try {
        const newUser = yield prisma_1.default.users.create({
            data: {
                id,
                email,
                name,
                password,
                updatedAt: new Date(),
            },
        });
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create user" });
    }
});
exports.createUser = createUser;
// PATCH update user
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { email, name, password } = req.body;
    try {
        const updatedUser = yield prisma_1.default.users.update({
            where: { id },
            data: {
                email,
                name,
                password,
                updatedAt: new Date(),
            },
        });
        res.json(updatedUser);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update user" });
    }
});
exports.updateUser = updateUser;
// DELETE user
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield prisma_1.default.users.delete({ where: { id } });
        res.json({ message: "User deleted" });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete user" });
    }
});
exports.deleteUser = deleteUser;
