import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const totalEmployees = await prisma.user.count({
      where: { role: "EMPLOYEE" } // ✅ Enum match
    });

    const totalTasks = await prisma.task.count();

    const completedTasks = await prisma.task.count({
      where: { status: "Completed" }
    });

    const totalReviews = await prisma.performance.count();

    res.json({
      totalEmployees,
      totalTasks,
      completedTasks,
      totalReviews
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

export default router;