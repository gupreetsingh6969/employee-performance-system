import dashboardRoutes from "./routes/dashboardRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import performanceRoutes from "./routes/performanceRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import roleMiddleware from "./middleware/roleMiddleware.js";
import authMiddleware from "./middleware/authMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173"
    ],
    credentials: true
  })
);

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/employees", employeeRoutes);
app.use("/performance", performanceRoutes);
app.use("/tasks", taskRoutes);
app.use("/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.send("Employee Performance API running");
});

app.get("/users", async (req, res) => {
  try {

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    });

    res.json(users);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
});

app.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Protected profile accessed",
    user: req.user
  });
});

app.get(
  "/admin",
  authMiddleware,
  roleMiddleware("Admin"),
  (req, res) => {
    res.json({
      message: "Welcome Admin"
    });
  }
);

app.get(
  "/employee",
  authMiddleware,
  roleMiddleware("Employee", "Admin"),
  (req, res) => {
    res.json({
      message: "Employee Dashboard"
    });
  }
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});