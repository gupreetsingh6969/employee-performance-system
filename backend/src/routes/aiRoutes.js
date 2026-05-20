import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// AI Recommendation Route
router.get("/recommendations", async (req, res) => {

  try {

    const performances = await prisma.performance.findMany({
      include: {
        employee: true
      }
    });

    // No records found
    if (performances.length === 0) {
      return res.status(200).json({
        message: "No performance data available",
        data: []
      });
    }

    const results = performances.map((record) => {

      let prediction = "";
      let recommendation = "";

      if (record.rating >= 8) {
        prediction = "Top Performer";
        recommendation = "Advanced leadership training";
      }
      else if (record.rating <= 5) {
        prediction = "Needs Improvement";
        recommendation = "Skill development recommended";
      }
      else {
        prediction = "Average Performer";
        recommendation = "Regular mentoring";
      }

      return {
        employee: record.employee?.name || "Unknown",
        rating: record.rating,
        prediction,
        recommendation
      };

    });

    return res.status(200).json({
      message: "AI recommendations generated successfully",
      data: results
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: "AI recommendation failed",
      error: error.message
    });

  }

});

export default router;