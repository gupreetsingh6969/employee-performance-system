import { PrismaClient } from "@prisma/client";
import { exec } from "child_process";

const prisma = new PrismaClient();

export const getRecommendations = async (req,res) => {

try{

const employees =
await prisma.employee.findMany();

const results=[];

for(const employee of employees){

const score=
employee.performanceScore;

const tasksCompleted=30;
const attendance=90;
const feedbackRating=4;

const command=
`python ml/predict.py ${score} ${tasksCompleted} ${attendance} ${feedbackRating}`;

const prediction=
await new Promise((resolve,reject)=>{

exec(
command,
(error,stdout)=>{

if(error){

reject(error);

}
else{

resolve(
stdout.trim()
);

}

});

});

results.push({

name:employee.name,
department:employee.department,
score,
recommendation:prediction

});

}

res.status(200).json({

success:true,
data:results

});

}
catch(error){

res.status(500).json({

success:false,
message:error.message

});

}

};