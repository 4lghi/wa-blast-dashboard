import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import usersRoutes from "./routes/users";
import nasabahRoutes from "./routes/nasabah";
import updateLanggananRoutes from "./routes/updateLanggananBatch";
import nasabahBatch from "./routes/nasabahBatch";
import sseRoutes from "./routes/sse";
import path from "path";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());

// Serve static Vite build
app.use(express.static(path.resolve(__dirname, "../../client/dist")));

// API endpoints
app.use("/api/users", usersRoutes);
app.use("/api/nasabah", nasabahRoutes);
app.use("/api/nasabah", updateLanggananRoutes);
app.use("/api/nasabah", nasabahBatch);
app.use(sseRoutes);

// Fallback untuk route SPA
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../client/dist/index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  const os = require("os");

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
