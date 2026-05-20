import express from "express";
import { PrismaClient } from "@prisma/client";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();
const prisma = new PrismaClient();


// Create Task
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
          employeeId: employeeId || null,
          deadline: deadline ? new Date(deadline) : null,
          status: "Pending"
        }
      });

      res.status(201).json({
        message: "Task assigned successfully",
        task
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        error: error.message
      });

    }
  }
);


// Get Tasks
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

      console.log(error);

      res.status(500).json({
        error: error.message
      });

    }
  }
);


// Update Task
router.put(
  "/:id",
  authMiddleware,
  async (req, res) => {
    try {

      const updatedTask = await prisma.task.update({
        where: {
          id: Number(req.params.id)
        },
        data: {
          title: req.body.title,
          description: req.body.description,
          status: req.body.status || undefined
        }
      });

      res.json({
        message: "Task updated successfully",
        task: updatedTask
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        error: error.message
      });

    }
  }
);


// Delete Task
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
        message: "Task deleted successfully"
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        error: error.message
      });

    }
  }
);

export default router;