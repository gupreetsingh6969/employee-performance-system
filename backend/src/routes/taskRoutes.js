import express from "express";
import { PrismaClient } from "@prisma/client";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();
const prisma = new PrismaClient();


// Assign task (Admin only)
router.post(
  "/",
  authMiddleware,
  roleMiddleware("Admin"),
  async (req, res) => {
    try {

      const {
        title,
        description,
        employeeId,
        deadline
      } = req.body;

      const task = await prisma.task.create({
        data: {
          title,
          description,
          employeeId,
          deadline: new Date(deadline)
        }
      });

      res.status(201).json({
        message: "Task assigned",
        task
      });

    } catch (error) {
      res.status(500).json({
        error: error.message
      });
    }
  }
);


// Get all tasks
router.get(
  "/",
  authMiddleware,
  async (req, res) => {
    try {

      const tasks = await prisma.task.findMany({
        include: {
          employee: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      });

      res.json(tasks);

    } catch (error) {
      res.status(500).json({
        error: error.message
      });
    }
  }
);


// Update task status
router.put(
  "/:id",
  authMiddleware,
  async (req, res) => {
    try {

      const { status } = req.body;

      const task = await prisma.task.update({
        where: {
          id: Number(req.params.id)
        },
        data: {
          status
        }
      });

      res.json({
        message: "Task updated",
        task
      });

    } catch (error) {
      res.status(500).json({
        error: error.message
      });
    }
  }
);


// Delete task
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("Admin"),
  async (req, res) => {
    try {

      await prisma.task.delete({
        where: {
          id: Number(req.params.id)
        }
      });

      res.json({
        message: "Task deleted"
      });

    } catch (error) {
      res.status(500).json({
        error: error.message
      });
    }
  }
);

export default router;