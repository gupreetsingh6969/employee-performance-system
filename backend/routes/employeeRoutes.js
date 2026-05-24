import express from "express";

import {
getEmployees,
createEmployee,
updateEmployee,
deleteEmployee
} from "../controllers/employeeController.js";

import verifyToken from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get(
  "/",
  verifyToken,
  authorizeRoles("HR","Manager"),
  getEmployees
);

router.post(
  "/",
  verifyToken,
  authorizeRoles("HR"),
  createEmployee
);

router.put(
  "/:id",
  verifyToken,
  authorizeRoles("HR","Manager"),
  updateEmployee
);

router.delete(
  "/:id",
  verifyToken,
  authorizeRoles("HR"),
  deleteEmployee
);

export default router;