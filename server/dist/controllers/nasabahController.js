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
exports.deleteNasabah = exports.updateNasabah = exports.createNasabah = exports.getNasabahById = exports.getAllNasabah = void 0;
const client_1 = require("@prisma/client");
const sse_1 = require("../routes/sse"); // ✅ SSE imported
const prisma = new client_1.PrismaClient();
// 🔹 GET all nasabah
const getAllNasabah = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma.nasabah.findMany({
            include: { user: true },
        });
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: "Gagal mengambil data nasabah." });
    }
});
exports.getAllNasabah = getAllNasabah;
// 🔹 GET nasabah by ID
const getNasabahById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const nasabah = yield prisma.nasabah.findUnique({
            where: { id },
            include: { user: true },
        });
        if (!nasabah) {
            res.status(404).json({ error: "Nasabah tidak ditemukan." });
        }
        else {
            res.json(nasabah);
        }
    }
    catch (error) {
        res.status(500).json({ error: "Terjadi kesalahan server." });
    }
});
exports.getNasabahById = getNasabahById;
// 🔹 POST create new nasabah
const createNasabah = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nama, no_hp, status, status_langganan, nik, no_kpj, userId } = req.body;
    try {
        const nasabah = yield prisma.nasabah.create({
            data: {
                nama,
                no_hp,
                status,
                status_langganan,
                nik,
                no_kpj,
                userId,
            },
        });
        res.status(201).json(nasabah);
    }
    catch (error) {
        res.status(500).json({ error: "Gagal membuat nasabah." });
    }
});
exports.createNasabah = createNasabah;
// 🔹 PATCH update nasabah
const updateNasabah = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nama, no_hp, status, status_langganan, nik, no_kpj, action, } = req.body;
    const updateData = {
        nama,
        no_hp,
        status,
        status_langganan,
        nik,
        no_kpj,
    };
    // Jika ada aksi verifikasi/tolak
    if (action === "verify") {
        updateData.status = "verified";
        updateData.verifiedAt = new Date();
    }
    else if (action === "reject") {
        updateData.status = "rejected";
        updateData.verifiedAt = new Date();
    }
    try {
        const nasabah = yield prisma.nasabah.update({
            where: { id },
            data: updateData,
        });
        // ✅ Kirim update ke semua client
        (0, sse_1.sendEventToAllClients)({
            type: "nasabah-updated",
            payload: nasabah,
        });
        res.json(nasabah);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Gagal mengupdate nasabah." });
    }
});
exports.updateNasabah = updateNasabah;
// 🔹 DELETE nasabah
const deleteNasabah = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield prisma.nasabah.delete({ where: { id } });
        res.json({ message: "Nasabah berhasil dihapus." });
    }
    catch (error) {
        res.status(500).json({ error: "Gagal menghapus nasabah." });
    }
});
exports.deleteNasabah = deleteNasabah;
