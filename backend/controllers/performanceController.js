import { PrismaClient } from "@prisma/client";

const prisma=new PrismaClient();

export const getPerformanceAnalytics=
async(req,res)=>{

try{

const employees=
await prisma.employee.findMany();

const totalEmployees=
employees.length;

const averageScore=
employees.length>0
?
employees.reduce(
(sum,item)=>
sum+item.performanceScore,
0
)
/employees.length
:0;

const topPerformer=
[...employees].sort(
(a,b)=>
b.performanceScore-
a.performanceScore
)[0];

const lowPerformer=
[...employees].sort(
(a,b)=>
a.performanceScore-
b.performanceScore
)[0];

res.status(200).json({

totalEmployees,

averageScore:
averageScore.toFixed(1),

topPerformer,

lowPerformer,

employees

});

}
catch(error){

console.log(error);

res.status(500).json({

message:error.message

});

}

};