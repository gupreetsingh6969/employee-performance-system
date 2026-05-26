import express from "express";

import {
getTasks,
createTask,
updateTaskStatus
} from "../controllers/taskController.js";

import verifyToken from "../middleware/authMiddleware.js";

import { authorize } from "../middleware/roleMiddleware.js";

const router=express.Router();


// Get tasks

router.get(
"/",
verifyToken,
authorize(
"HR",
"MANAGER",
"EMPLOYEE"
),
getTasks
);


// Create task

router.post(
"/",
verifyToken,
authorize(
"HR",
"MANAGER"
),
createTask
);


// Update task status

router.put(
"/:id",
verifyToken,
authorize(
"HR",
"MANAGER"
),
updateTaskStatus
);

export default router;
