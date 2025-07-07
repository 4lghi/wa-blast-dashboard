import { Request, Response } from "express";
import pool from "../db";

// GET /api/messages
export const getMessages = async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM messages ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ error: "Gagal mengambil data pesan" });
  }
};

// POST /api/messages
export const createMessage = async (req: Request, res: Response) => {
  const { phone_number, message } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO messages (phone_number, message) VALUES ($1, $2) RETURNING *",
      [phone_number, message]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error inserting message:", err);
    res.status(500).json({ error: "Gagal menyimpan pesan" });
  }
};
