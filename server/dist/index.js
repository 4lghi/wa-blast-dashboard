"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const users_1 = __importDefault(require("./routes/users"));
const nasabah_1 = __importDefault(require("./routes/nasabah"));
const updateLanggananBatch_1 = __importDefault(require("./routes/updateLanggananBatch"));
const nasabahBatch_1 = __importDefault(require("./routes/nasabahBatch"));
const sse_1 = __importDefault(require("./routes/sse")); // ✅ Import SSE routes
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Endpoint untuk user
app.use("/api/users", users_1.default);
// Endpoint untuk nasabah
app.use("/api/nasabah", nasabah_1.default);
app.use("/api/nasabah", updateLanggananBatch_1.default); // ✅ jangan khawatir ditulis 2x, Express akan cocokkan route-nya
app.use("/api/nasabah", nasabahBatch_1.default);
// Endpoint untuk Server-Sent Events
app.use(sse_1.default);
const PORT = Number(process.env.PORT);
app.listen(PORT, "0.0.0.0", () => {
    const os = require("os");
    // Ambil IP lokal (LAN)
    const interfaces = os.networkInterfaces();
    let localIp = "localhost";
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name] || []) {
            if (iface.family === "IPv4" && !iface.internal) {
                localIp = iface.address;
            }
        }
    }
    console.log(`🚀 Server running at:`);
    console.log(`- Local:   http://localhost:${PORT}`);
    console.log(`- Network: http://${localIp}:${PORT}`);
});
