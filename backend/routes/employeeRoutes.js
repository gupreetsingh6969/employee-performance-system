import express from "express";

import {

getEmployees,
createEmployee,
updateEmployee,
deleteEmployee

} from "../controllers/employeeController.js";

import verifyToken from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get(
"/",
verifyToken,
authorize(
"HR",
"Manager",
"Employee"
),
getEmployees
);

router.post(
"/",
verifyToken,
authorize(
"HR",
"Manager"
),
createEmployee
);

router.put(
"/:id",
verifyToken,
authorize(
"HR",
"Manager"
),
updateEmployee
);

router.delete(
"/:id",
verifyToken,
authorize(
"HR"
),
deleteEmployee
);

export default router;
