import express from "express";
import { PrismaClient } from "@prisma/client";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();
const prisma = new PrismaClient();


// Add performance review (Admin only)
router.post(
  "/",
  authMiddleware,
  roleMiddleware("Admin"),
  async (req, res) => {
    try {

      const {
        employeeId,
        rating,
        kpi,
        review
      } = req.body;

      const performance =
      await prisma.performance.create({
        data: {
          employeeId,
          rating,
          kpi,
          review
        }
      });

      res.status(201).json({
        message: "Performance added",
        performance
      });

    } catch (error) {
      res.status(500).json({
        error: error.message
      });
    }
  }
);


// Get all reviews
router.get(
  "/",
  authMiddleware,
  async (req, res) => {
    try {

      const performances =
      await prisma.performance.findMany({
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

      res.json(performances);

    } catch (error) {
      res.status(500).json({
        error: error.message
      });
    }
  }
);


// Get review by employee id
router.get(
  "/:id",
  authMiddleware,
  async (req, res) => {
    try {

      const performance =
      await prisma.performance.findMany({
        where: {
          employeeId: Number(req.params.id)
        }
      });

      res.json(performance);

    } catch (error) {
      res.status(500).json({
        error: error.message
      });
    }
  }
);

export default router;