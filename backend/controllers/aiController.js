import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getRecommendations = async (req,res)=>{

try{

const employees = await prisma.employee.findMany();

const recommendations = employees.map(employee=>{

let recommendation="";

const score=Number(employee.performanceScore);

if(score<60){

recommendation="Needs training and mentoring";

}
else if(score>=60 && score<80){

recommendation="Good performance, improve skills";

}
else{

recommendation="Eligible for promotion";

}

return{

name:employee.name,
department:employee.department,
score:score,
recommendation

};

});

res.status(200).json({

success:true,
data:recommendations

});

}
catch(error){

res.status(500).json({

success:false,
message:error.message

});

}

};