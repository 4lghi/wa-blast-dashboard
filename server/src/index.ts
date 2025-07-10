import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import usersRoutes from "./routes/users";
import nasabahRoutes from "./routes/nasabah";
import updateLanggananRoutes from "./routes/updateLanggananBatch"; 
import nasabahBatch from "./routes/nasabahBatch"; 

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Endpoint untuk user
app.use("/api/users", usersRoutes);

app.use("/api/nasabah", nasabahRoutes);
app.use("/api/nasabah", updateLanggananRoutes); // ✅ jangan khawatir ditulis 2x, Express akan cocokkan route-nya
app.use("/api/nasabah", nasabahBatch); 

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`🚀 Server ready at: http://localhost:${PORT}`);
});

