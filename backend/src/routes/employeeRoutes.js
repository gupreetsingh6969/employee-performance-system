import express from "express";

import {
getEmployees,
createEmployee,
updateEmployee,
deleteEmployee
}
from "../controllers/employeeController.js";

import verifyToken from "../middleware/authMiddleware.js";

import { authorize }
from "../middleware/roleMiddleware.js";

const router = express.Router();


// Get employees
router.get(
"/",
verifyToken,
authorize(
"ADMIN",
"HR",
"MANAGER",
"EMPLOYEE"
),
getEmployees
);


// Create employee
router.post(
"/",
verifyToken,
authorize(
"ADMIN",
"HR",
"MANAGER"
),
createEmployee
);


// Update employee
router.put(
"/:id",
verifyToken,
authorize(
"ADMIN",
"HR",
"MANAGER"
),
updateEmployee
);


// Delete employee
router.delete(
"/:id",
verifyToken,
authorize(
"ADMIN",
"HR"
),
deleteEmployee
);

export default router;