import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getRecommendations = async (req,res)=>{

try{

const employees = await prisma.employee.findMany();

const recommendations = employees.map(employee=>{

const score = Number(employee.performanceScore);

let status="";
let recommendation="";

if(score>=85){

status="Top Performer";
recommendation="Promotion + Leadership Program";

}
else if(score>=60){

status="Average Performer";
recommendation="Skill Enhancement Training";

}
else{

status="Needs Improvement";
recommendation="Technical Mentoring Required";

}

return{

name:employee.name,
department:employee.department,
score,
feedback:employee.feedback,
achievements:employee.achievements,
status,
recommendation

};

});

res.status(200).json({

success:true,
count:recommendations.length,
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