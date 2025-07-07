import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import messageRoutes from "./routes/messages";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// ✅ pasang route-nya
app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`🚀 Server ready at: http://localhost:${PORT}`);
});
