"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEventToAllClients = void 0;
// sse.ts
const express_1 = require("express");
const router = (0, express_1.Router)();
// Simpan semua koneksi SSE client di sini
let clients = [];
// Endpoint utama untuk koneksi SSE
router.get("/events", (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();
    const clientId = Date.now();
    const newClient = { id: clientId, res };
    clients.push(newClient);
    console.log(`🔗 Client connected: ${clientId}. Total: ${clients.length}`);
    // Kirim event awal (opsional)
    res.write(`data: ${JSON.stringify({ message: "connected" })}\n\n`);
    // Saat koneksi ditutup
    req.on("close", () => {
        console.log(`❌ Client disconnected: ${clientId}`);
        clients = clients.filter((client) => client.id !== clientId);
    });
});
// Fungsi ini bisa dipanggil dari controller atau mana pun
const sendEventToAllClients = (data) => {
    console.log(`📢 Sending SSE event to ${clients.length} clients...`);
    clients.forEach((client) => {
        client.res.write(`data: ${JSON.stringify(data)}\n\n`);
    });
};
exports.sendEventToAllClients = sendEventToAllClients;
exports.default = router;
