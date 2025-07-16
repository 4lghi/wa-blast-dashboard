import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import usersRoutes from "./routes/users";
import nasabahRoutes from "./routes/nasabah";
import updateLanggananRoutes from "./routes/updateLanggananBatch";
import nasabahBatch from "./routes/nasabahBatch";
import sseRoutes from "./routes/sse"; // ✅ Import SSE routes

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Endpoint untuk user
app.use("/api/users", usersRoutes);

// Endpoint untuk nasabah
app.use("/api/nasabah", nasabahRoutes);
app.use("/api/nasabah", updateLanggananRoutes); // ✅ jangan khawatir ditulis 2x, Express akan cocokkan route-nya
app.use("/api/nasabah", nasabahBatch);

// Endpoint untuk Server-Sent Events
app.use(sseRoutes);

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