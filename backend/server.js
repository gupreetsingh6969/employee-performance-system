const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true
  })
);

// Test route
app.get("/", (req, res) => {
  res.send("Employee Performance System API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});