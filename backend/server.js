import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDatabase from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import performanceRoutes from "./routes/performanceRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

dotenv.config();

const app=express();


// Middlewares

app.use(cors());

app.use(express.json());

app.use(

express.urlencoded({

extended:true

})

);


// Database Connection

try{

await connectDatabase();

console.log(
"✅ Database Connected Successfully"
);

}
catch(error){

console.log(
"❌ Database Connection Failed"
);

console.log(error);

}


// Health Route

app.get("/",(req,res)=>{

res.status(200).json({

success:true,

message:
"Employee Performance Backend Active"

});

});


// API Routes

app.use(
"/api/auth",
authRoutes
);

app.use(
"/api/employees",
employeeRoutes
);

app.use(
"/api/tasks",
taskRoutes
);

app.use(
"/api/dashboard",
dashboardRoutes
);

app.use(
"/api/performance",
performanceRoutes
);

app.use(
"/api/analytics",
analyticsRoutes
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
"/api/feedback",
feedbackRoutes
);

app.use(
"/api/reports",
reportRoutes
);


// Error Handler

app.use((err,req,res,next)=>{

console.log(
"Server Error:",
err
);

res.status(500).json({

success:false,

message:
"Internal Server Error"

});

});


// Start Server

const PORT=
process.env.PORT || 5000;

app.listen(

PORT,

()=>{

console.log(
`🚀 Server Running On Port ${PORT}`
);

}

);
