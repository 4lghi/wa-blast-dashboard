import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import usersRoutes from "./routes/users";
import nasabahRoutes from "./routes/nasabah";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Endpoint untuk user
app.use("/api/users", usersRoutes);

// Endpoint untuk user
app.use("/api/nasabah", nasabahRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`🚀 Server ready at: http://localhost:${PORT}`);
});

