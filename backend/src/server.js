import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDatabase from "./config/db.js";

import employeeRoutes from "./routes/employee.Routes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app=express();

app.use(cors());

app.use(express.json());

app.use(

express.urlencoded({

extended:true

})

);

console.log(
"Trying database connection..."
);

await connectDatabase();

app.get("/",(req,res)=>{

res.status(200).json({

success:true,
message:"Employee Performance Backend Active"

});

});

app.use(
"/api/employees",
employeeRoutes
);

app.use(
"/api/auth",
authRoutes
);

const PORT=

process.env.PORT || 5000;

app.listen(PORT,()=>{

console.log(

`Server running on port ${PORT}`

);

});
