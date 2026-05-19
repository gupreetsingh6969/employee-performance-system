import express from "express";
import { PrismaClient } from "@prisma/client";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
const prisma = new PrismaClient();

router.get(
  "/",
  authMiddleware,
  async (req, res) => {
    try {

      const totalEmployees = await prisma.user.count({
        where: {
          role: "Employee"
        }
      });

      const totalTasks = await prisma.task.count();

      const completedTasks = await prisma.task.count({
        where: {
          status: "Completed"
        }
      });

      const pendingTasks = await prisma.task.count({
        where: {
          status: "Pending"
        }
      });

      const totalReviews = await prisma.performance.count();

      res.json({
        totalEmployees,
        totalTasks,
        completedTasks,
        pendingTasks,
        totalReviews
      });

    } catch (error) {

      res.status(500).json({
        error: error.message
      });

    }
  }
);

export default router;