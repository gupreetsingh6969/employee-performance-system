import express from "express";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();
const prisma = new PrismaClient();


// Get all employees
router.get(
"/",
authMiddleware,
roleMiddleware("Admin"),
async(req,res)=>{

try{

const employees=await prisma.user.findMany({

select:{
id:true,
name:true,
email:true,
role:true,
createdAt:true
}

});

res.json(employees);

}catch(error){

res.status(500).json({
error:error.message
});

}

}
);


// Get employee by id
router.get(
"/:id",
authMiddleware,
async(req,res)=>{

try{

const employee=await prisma.user.findUnique({

where:{
id:Number(req.params.id)
},

select:{
id:true,
name:true,
email:true,
role:true,
createdAt:true
}

});

if(!employee){

return res.status(404).json({
message:"Employee not found"
});

}

res.json(employee);

}catch(error){

res.status(500).json({
error:error.message
});

}

}
);


// Create employee
router.post(
"/",
authMiddleware,
roleMiddleware("Admin"),
async(req,res)=>{

try{

const {name,email}=req.body;

const hashedPassword=await bcrypt.hash(
"123456",
10
);

const employee=await prisma.user.create({

data:{
name,
email,
password:hashedPassword,
role:"Employee"
}

});

res.status(201).json({

message:"Employee created",
employee

});

}catch(error){

console.log(error);

res.status(500).json({
error:error.message
});

}

}
);


// Update employee
router.put(
"/:id",
authMiddleware,
roleMiddleware("Admin"),
async(req,res)=>{

try{

const {name,role}=req.body;

const employee=await prisma.user.update({

where:{
id:Number(req.params.id)
},

data:{
name,
role
}

});

res.json({

message:"Employee updated",
employee

});

}catch(error){

res.status(500).json({
error:error.message
});

}

}
);


// Delete employee
router.delete(
"/:id",
authMiddleware,
roleMiddleware("Admin"),
async(req,res)=>{

try{

await prisma.user.delete({

where:{
id:Number(req.params.id)
}

});

res.json({
message:"Employee deleted"
});

}catch(error){

res.status(500).json({
error:error.message
});

}

}
);

export default router;