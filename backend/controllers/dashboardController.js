import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getDashboardStats = async (req,res)=>{

try{

const totalEmployees =
await prisma.employee.count();

const employees =
await prisma.employee.findMany();

const topPerformers =
employees.filter(
employee=>employee.performanceScore>=80
);

const averageScore =
employees.reduce(
(sum,employee)=>
sum+employee.performanceScore,
0
) / (employees.length || 1);

res.status(200).json({

success:true,

data:{
totalEmployees,
topPerformers:topPerformers.length,
averageScore:Number(
averageScore.toFixed(2)
)
}

});

}
catch(error){

res.status(500).json({

success:false,
message:error.message

});

}

};