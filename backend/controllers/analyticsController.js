import { PrismaClient } from "@prisma/client";

const prisma=new PrismaClient();

export const getAnalytics=async(req,res)=>{

try{

const employees=
await prisma.employee.findMany();

const totalEmployees=
employees.length;

const averageScore=

employees.length>0

?

employees.reduce(
(sum,e)=>
sum+Number(
e.performanceScore || 0
),
0
)

/

employees.length

:

0;


const highestScore=

employees.length>0

?

Math.max(

...employees.map(

e=>
Number(
e.performanceScore || 0
)

)

)

:

0;


res.status(200).json({

success:true,

data:{

totalEmployees,

averageScore:
averageScore.toFixed(1),

highestScore,

employees

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
