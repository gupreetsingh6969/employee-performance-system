import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const getTasks = async(req,res)=>{

try{

const tasks =
await prisma.task.findMany({

include:{
employee:true
}

});


const updatedTasks =
tasks.map(task=>{

const today =
new Date();

const deadline =
new Date(task.deadline);

const difference =
deadline.getTime()-today.getTime();

const daysRemaining =
Math.ceil(
difference/(1000*60*60*24)
);

return{

...task,

daysRemaining,

isOverdue:
daysRemaining < 0 &&
task.status !== "Completed",

dueToday:
daysRemaining === 0,

dueTomorrow:
daysRemaining === 1

};

});


res.status(200).json({

success:true,
data:updatedTasks

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



export const createTask = async(req,res)=>{

try{

const {

title,
description,
employeeId,
deadline,
priority

}=req.body;


const task =
await prisma.task.create({

data:{

title,

description,

employeeId:
Number(employeeId),

deadline:
new Date(deadline),

priority:
priority || "Medium",

status:"Pending"

}

});


res.status(201).json({

success:true,
data:task

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



export const updateTaskStatus = async(req,res)=>{

try{

const {id}=req.params;

const {status}=req.body;


const updatedTask =
await prisma.task.update({

where:{

id:Number(id)

},

data:{

status

}

});


res.status(200).json({

success:true,
data:updatedTask

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