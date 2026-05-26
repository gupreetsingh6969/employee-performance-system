import express from "express";

import{
addFeedback,
getFeedback
}
from "../controllers/feedbackController.js";

const router=
express.Router();

router.post(
"/",
addFeedback
);

router.get(
"/",
getFeedback
);

export default router;