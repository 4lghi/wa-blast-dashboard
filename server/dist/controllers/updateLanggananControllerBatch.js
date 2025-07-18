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
exports.updateLangganan = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const updateLangganan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ids, status_langganan } = req.body;
    if (!Array.isArray(ids) || ids.length === 0 || !status_langganan) {
        res
            .status(400)
            .json({ error: "Diperlukan array 'ids' dan field 'status_langganan'." });
        return;
    }
    try {
        const result = yield prisma.nasabah.updateMany({
            where: {
                id: { in: ids },
            },
            data: {
                status_langganan,
            },
        });
        res.json({
            message: "Status langganan berhasil diperbarui.",
            count: result.count,
        });
    }
    catch (error) {
        res.status(500).json({ error: "Gagal update batch status langganan." });
    }
});
exports.updateLangganan = updateLangganan;
