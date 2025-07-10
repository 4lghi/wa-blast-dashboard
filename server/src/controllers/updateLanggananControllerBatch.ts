// PATCH /api/nasabah/batch-langganan
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const updateLangganan = async (req: Request, res: Response) => {
  const { ids, status_langganan } = req.body;

  if (!Array.isArray(ids) || ids.length === 0 || !status_langganan) {
    res
      .status(400)
      .json({ error: "Diperlukan array 'ids' dan field 'status_langganan'." });
      return;
  }

  try {
    const result = await prisma.nasabah.updateMany({
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
  } catch (error) {
    res.status(500).json({ error: "Gagal update batch status langganan." });
  }
};
