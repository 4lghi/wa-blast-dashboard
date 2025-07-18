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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNasabahBatch = exports.getNasabahBatch = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getNasabahBatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
        res.status(400).json({ error: "Diperlukan array 'ids'." });
        return;
    }
    try {
        const nasabahList = yield prisma.nasabah.findMany({
            where: {
                id: { in: ids },
            },
            include: {
                user: true,
            },
        });
        res.json(nasabahList);
    }
    catch (error) {
        res.status(500).json({ error: "Gagal mengambil data nasabah." });
    }
});
exports.getNasabahBatch = getNasabahBatch;
const sendNasabahBatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nasabahList } = req.body;
    if (!Array.isArray(nasabahList) || nasabahList.length === 0) {
        res.status(400).json({ error: "Diperlukan array 'nasabahList'." });
        return;
    }
    try {
        const createdNasabah = yield prisma.nasabah.createMany({
            data: nasabahList,
        });
        res.status(201).json({
            message: "Batch nasabah berhasil dibuat.",
            count: createdNasabah.count,
        });
    }
    catch (error) {
        res.status(500).json({ error: "Gagal membuat batch nasabah." });
    }
});
exports.sendNasabahBatch = sendNasabahBatch;
