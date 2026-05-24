import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDatabase from "./config/db.js";

import employeeRoutes from "./routes/employeeRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(
express.urlencoded({
extended:true
})
);


// Database connection
try{

await connectDatabase();

console.log(
"Database connected successfully"
);

}
catch(error){

console.log(
"Database Connection Failed"
);

console.log(error);

}


// Home route
app.get("/",(req,res)=>{

res.status(200).json({

success:true,
message:"Employee Performance Backend Active"

});

});


// Routes
app.use(
"/api/employees",
employeeRoutes
);

app.use(
"/api/auth",
authRoutes
);

app.use(
"/api/ai",
aiRoutes
);

app.use(
"/api/notifications",
notificationRoutes
);

app.use(
"/api/dashboard",
dashboardRoutes
);


// Start server
const PORT=
process.env.PORT || 5000;

app.listen(PORT,()=>{

console.log(
`Server running on port ${PORT}`
);

});