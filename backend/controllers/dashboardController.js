import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getDashboardStats = async(req,res)=>{

try{

const employees=
await prisma.employee.findMany();

const tasks=
await prisma.task.findMany();

const totalEmployees=
employees.length;

const totalTasks=
tasks.length;

const completedTasks=
tasks.filter(
task=>
task.status==="Completed"
).length;

const pendingTasks=
tasks.filter(
task=>
task.status!=="Completed"
).length;

const averageScore=
employees.length>0
?
(
employees.reduce(
(sum,employee)=>
sum+employee.performanceScore,
0
)
/employees.length
).toFixed(1)
:
0;

const sortedEmployees=
[...employees].sort(
(a,b)=>
b.performanceScore-
a.performanceScore
);

const topPerformer=
sortedEmployees.length>0
?
sortedEmployees[0]
:
null;

const lowPerformer=
sortedEmployees.length>0
?
sortedEmployees[
sortedEmployees.length-1
]
:
null;

const topPerformers=
sortedEmployees.slice(0,5);

const recentEmployees=
employees
.slice(-5)
.reverse();

res.status(200).json({

success:true,

data:{

totalEmployees,
totalTasks,
completedTasks,
pendingTasks,
averageScore,

topPerformer,

lowPerformer,

topPerformers,

recentEmployees

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