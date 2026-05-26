import express from "express";
import { getRecommendations } from "../controllers/aiController.js";

const router=express.Router();

router.get("/",getRecommendations);

export default router;
