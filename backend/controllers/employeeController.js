import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


// Get all employees

export const getEmployees = async(req,res)=>{

try{

const employees=
await prisma.employee.findMany({

include:{
tasks:true,
performances:true
}

});

res.status(200).json({

success:true,
count:employees.length,
data:employees

});

}
catch(error){

console.log(
"Get Employee Error:",
error
);

res.status(500).json({

success:false,
message:error.message

});

}

};


// Create employee

export const createEmployee = async(req,res)=>{

try{

const employee=
await prisma.employee.create({

data:{

name:
req.body.name || "",

email:
req.body.email || "",

department:
req.body.department || "General",

position:
req.body.position || "Employee",

performanceScore:
Number(
req.body.performanceScore || 0
)

}

});

res.status(201).json({

success:true,
message:"Employee Added Successfully",
data:employee

});

}
catch(error){

console.log(
"Create Employee Error:",
error
);

res.status(500).json({

success:false,
message:error.message

});

}

};


// Update employee

export const updateEmployee=async(req,res)=>{

try{

const employee=
await prisma.employee.update({

where:{
id:Number(req.params.id)
},

data:{

name:req.body.name,

email:req.body.email,

department:
req.body.department,

position:
req.body.position,

performanceScore:
Number(
req.body.performanceScore || 0
)

}

});

res.status(200).json({

success:true,
data:employee

});

}
catch(error){

console.log(
"Update Employee Error:",
error
);

res.status(500).json({

success:false,
message:error.message

});

}

};


// Delete employee

export const deleteEmployee=async(req,res)=>{

try{

await prisma.employee.delete({

where:{
id:Number(req.params.id)
}

});

res.status(200).json({

success:true,
message:"Employee Deleted"

});

}
catch(error){

console.log(
"Delete Employee Error:",
error
);

res.status(500).json({

success:false,
message:error.message

});

}

};
