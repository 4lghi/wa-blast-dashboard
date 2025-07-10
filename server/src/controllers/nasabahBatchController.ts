// POST /api/nasabah/batch
import { Request, Response, RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getNasabahBatch: RequestHandler = async (req, res) => {
  const { ids } = req.body;

  if (!Array.isArray(ids) || ids.length === 0) {
    res.status(400).json({ error: "Diperlukan array 'ids'." });
    return;
  }

  try {
    const nasabahList = await prisma.nasabah.findMany({
      where: {
        id: { in: ids },
      },
      include: {
        user: true,
      },
    });

    res.json(nasabahList);
  } catch (error) {
    res.status(500).json({ error: "Gagal mengambil data nasabah." });
  }
};

export const sendNasabahBatch = async (req: Request, res: Response) => {
  const { nasabahList } = req.body;

  if (!Array.isArray(nasabahList) || nasabahList.length === 0) {
    res.status(400).json({ error: "Diperlukan array 'nasabahList'." });
    return;
  }

  try {
    const createdNasabah = await prisma.nasabah.createMany({
      data: nasabahList,
    });

    res.status(201).json({
      message: "Batch nasabah berhasil dibuat.",
      count: createdNasabah.count,
    });
  } catch (error) {
    res.status(500).json({ error: "Gagal membuat batch nasabah." });
  }
};
