import { Request, Response } from "express";
import prisma from "../prisma";

// GET all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.users.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// POST create new user
export const createUser = async (req: Request, res: Response) => {
  const { id, email, name, password } = req.body;
  try {
    const newUser = await prisma.users.create({
      data: {
        id,
        email,
        name,
        password,
        updatedAt: new Date(),
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
};

// PATCH update user
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { email, name, password } = req.body;
  try {
    const updatedUser = await prisma.users.update({
      where: { id },
      data: {
        email,
        name,
        password,
        updatedAt: new Date(),
      },
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
};

// DELETE user
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.users.delete({ where: { id } });
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};
