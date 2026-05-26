import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getNotifications = async(req,res)=>{

try{

const employees=
await prisma.employee.findMany();

const tasks=
await prisma.task.findMany({

include:{
employee:true
}

});

let notifications=[];


/* Task Notifications */

tasks.forEach(task=>{

const deadline=
new Date(task.deadline);

const today=
new Date();

const daysRemaining=
Math.ceil(

(deadline-today)/
(1000*60*60*24)

);


if(

daysRemaining===1 &&
task.status!=="Completed"

){

notifications.push({

message:
`🟡 ${task.title} is due tomorrow`

});

}


if(

daysRemaining<0 &&
task.status!=="Completed"

){

notifications.push({

message:
`🔴 ${task.title} is overdue`

});

}


if(

task.status==="Completed"

){

notifications.push({

message:
`✅ ${task.title} completed`

});

}

});


/* Employee Performance Notifications */

employees.forEach(employee=>{

if(employee.performanceScore<50){

notifications.push({

message:
`⚠️ ${employee.name} needs performance improvement`

});

}


if(employee.performanceScore>=90){

notifications.push({

message:
`🏆 ${employee.name} is a top performer`

});

}

});


notifications=
notifications.reverse();


if(notifications.length===0){

notifications.push({

message:
"✅ No new notifications"

});

}


res.status(200).json({

success:true,
data:notifications

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