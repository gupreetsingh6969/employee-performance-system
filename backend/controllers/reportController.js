import { PrismaClient } from "@prisma/client";

const prisma=new PrismaClient();

export const getReport=async(req,res)=>{

try{

const employees=

await prisma.employee.findMany({

include:{

tasks:true

}

});


const report=

employees.map(employee=>({

id:employee.id,

name:employee.name,

email:employee.email,

department:employee.department,

position:employee.position,

performanceScore:
employee.performanceScore,

feedback:
employee.feedback,

totalTasks:
employee.tasks.length,

completedTasks:

employee.tasks.filter(

task=>

task.status==="Completed"

).length

}));


res.status(200).json({

success:true,

count:report.length,

data:report

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