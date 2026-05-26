import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

/*
Creates a new employee profile and stores credentials securely
*/
router.post("/createEmployeeProfile", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const employeeRecord = await prisma.user.findUnique({
      where: { email }
    });

    if (employeeRecord) {
      return res.status(400).json({
        message: "Employee account already exists"
      });
    }

    const securePassword = await bcrypt.hash(password, 10);

    const createdEmployee = await prisma.user.create({
      data: {
        name,
        email,
        password: securePassword,
        role
      }
    });

    res.status(201).json({
      message: "Employee profile created successfully",
      employee: {
        id: createdEmployee.id,
        name: createdEmployee.name,
        email: createdEmployee.email,
        role: createdEmployee.role
      }
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: error.message
    });
  }
});


/*
Verifies employee login information before dashboard access
*/
router.post("/validateEmployeeLogin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const employeeRecord = await prisma.user.findUnique({
      where: { email }
    });

    if (!employeeRecord) {
      return res.status(400).json({
        message: "Employee record not found"
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      employeeRecord.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Entered password is incorrect"
      });
    }

    const accessToken = jwt.sign(
      {
        id: employeeRecord.id,
        role: employeeRecord.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    res.json({
      message: "Employee login verified successfully",
      token: accessToken
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: error.message
    });
  }
});

export default router;
