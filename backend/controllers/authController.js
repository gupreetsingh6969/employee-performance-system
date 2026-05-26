import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();


// REGISTER

export const register = async(req,res)=>{

try{

const {
name,
email,
password,
role="EMPLOYEE"
}=req.body;


const existingUser=
await prisma.user.findUnique({

where:{
email
}

});


if(existingUser){

return res.status(400).json({

success:false,
message:"User already exists"

});

}


const hashedPassword=
await bcrypt.hash(
password,
10
);


const user=
await prisma.user.create({

data:{

name,
email,
password:hashedPassword,
role

}

});


res.status(201).json({

success:true,
message:"User Registered Successfully",

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

success:false,
message:error.message

});

}

};


// LOGIN

export const login = async(req,res)=>{

try{

const {email,password}=req.body;


const user=
await prisma.user.findUnique({

where:{
email
}

});


if(!user){

return res.status(404).json({

success:false,
message:"User not found"

});

}


const validPassword=
await bcrypt.compare(
password,
user.password
);


if(!validPassword){

return res.status(400).json({

success:false,
message:"Invalid Password"

});

}


const token=
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


res.status(200).json({

success:true,

message:"Login Successful",

token,

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

success:false,
message:error.message

});

}

};