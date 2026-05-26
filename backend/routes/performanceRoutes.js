import express from "express";

import {
getPerformanceAnalytics
}
from "../controllers/performanceController.js";

const router=express.Router();

router.get(
"/",
getPerformanceAnalytics
);

export default router;
