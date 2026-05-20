import express from "express";

const router = express.Router();

// Notification Route
router.get("/", (req, res) => {

  return res.status(200).json({
    message: "Notifications route working"
  });

});

export default router;