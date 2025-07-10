import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 🔹 GET all nasabah
export const getAllNasabah = async (req: Request, res: Response) => {
  try {
    const data = await prisma.nasabah.findMany({
      include: { user: true },
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Gagal mengambil data nasabah." });
  }
};

// 🔹 GET nasabah by ID
export const getNasabahById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const nasabah = await prisma.nasabah.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!nasabah) {
      res.status(404).json({ error: "Nasabah tidak ditemukan." });
    } else {
      res.json(nasabah);
    }
  } catch (error) {
    res.status(500).json({ error: "Terjadi kesalahan server." });
  }
};


// 🔹 POST create new nasabah
export const createNasabah = async (req: Request, res: Response) => {
  const { nama, no_hp, status, status_langganan, nik, no_kpj, userId } = req.body;

  try {
    const nasabah = await prisma.nasabah.create({
      data: {
        nama,
        no_hp,
        status,
        status_langganan,
        nik,
        no_kpj,
        userId,
      },
    });
    res.status(201).json(nasabah);
  } catch (error) {
    res.status(500).json({ error: "Gagal membuat nasabah." });
  }
};

// 🔹 PUT update nasabah
export const updateNasabah = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nama, no_hp, status, status_langganan, nik, no_kpj } = req.body;

  try {
    const nasabah = await prisma.nasabah.update({
      where: { id },
      data: {
        nama,
        no_hp,
        status,
        status_langganan,
        nik,
        no_kpj,
      },
    });
    res.json(nasabah);
  } catch (error) {
    res.status(500).json({ error: "Gagal mengupdate nasabah." });
  }
};


// 🔹 DELETE nasabah
export const deleteNasabah = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.nasabah.delete({ where: { id } });
    res.json({ message: "Nasabah berhasil dihapus." });
  } catch (error) {
    res.status(500).json({ error: "Gagal menghapus nasabah." });
  }
};