import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();


// Admin protected registration
router.post("/register", async (req, res) => {

try {

const authHeader = req.headers.authorization;

if (!authHeader) {
return res.status(401).json({
message:"Access denied"
});
}

const token = authHeader.split(" ")[1];

const decoded = jwt.verify(
token,
process.env.JWT_SECRET
);

if(decoded.role !== "ADMIN"){

return res.status(403).json({
message:"Only Admin can create users"
});

}

const {
name,
email,
password,
role
} = req.body;

if(
!name ||
!email ||
!password
){

return res.status(400).json({
message:"All fields required"
});

}

const existingUser =
await prisma.user.findUnique({
where:{
email
}
});

if(existingUser){

return res.status(400).json({
message:"User already exists"
});

}

const hashedPassword =
await bcrypt.hash(
password,
10
);

const user =
await prisma.user.create({

data:{
name,
email,
password:hashedPassword,
role:role || "EMPLOYEE"
}

});

res.status(201).json({

message:"Employee created successfully",

user:{
id:user.id,
name:user.name,
email:user.email,
role:user.role
}

});

}
catch(error){

console.log(error);

res.status(500).json({
message:error.message
});

}

});


// Login
router.post("/login", async(req,res)=>{

try{

const {
email,
password
}=req.body;

const user =
await prisma.user.findUnique({
where:{email}
});

if(!user){

return res.status(400).json({
message:"Invalid Email"
});

}

const match =
await bcrypt.compare(
password,
user.password
);

if(!match){

return res.status(400).json({
message:"Invalid Password"
});

}

const token =
jwt.sign(
{
id:user.id,
role:user.role
},
process.env.JWT_SECRET,
{
expiresIn:"1d"
}
);

res.json({

message:"Login successful",

token,

user:{
id:user.id,
name:user.name,
role:user.role
}

});

}
catch(error){

res.status(500).json({
message:error.message
});

}

});

export default router;