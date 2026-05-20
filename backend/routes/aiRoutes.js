import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/recommendations", async (req, res) => {

  try {

    const performances =
      await prisma.performance.findMany({
        include: {
          employee: true
        }
      });

    const results = performances.map((record) => {

      let prediction = "";
      let trainingNeed = "";

      if (record.rating >= 8) {
        prediction = "Top Performer";
        trainingNeed = "Advanced leadership training";
      }
      else if (record.rating <= 5) {
        prediction = "Needs Improvement";
        trainingNeed = "Skill development recommended";
      }
      else {
        prediction = "Average Performer";
        trainingNeed = "Regular mentoring";
      }

      return {
        employee: record.employee.name,
        rating: record.rating,
        prediction,
        recommendation: trainingNeed
      };

    });

    res.json(results);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});

export default router;