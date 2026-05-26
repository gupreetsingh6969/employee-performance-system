import { PrismaClient } from "@prisma/client";
import { preprocessEmployeeData } from "../utils/preprocessData.js";
import { predictPerformance } from "../utils/predictionModel.js";

const prisma = new PrismaClient();

export const getRecommendations = async(req,res)=>{

try{

const employees=
await prisma.employee.findMany();

const processedEmployees=
preprocessEmployeeData(
employees
);

const predictedEmployees=
predictPerformance(
processedEmployees
);


/* Metrics */

const topPerformers=[];
const trainingNeeded=[];
const promotionCandidates=[];
const riskEmployees=[];

let totalScore=0;


/* Employee analysis */

predictedEmployees.forEach(employee=>{

const score=
Number(
employee.performanceScore ||
employee.score ||
0
);

totalScore+=score;


/* AI prediction category */

if(
employee.prediction===
"High Performer"
){

topPerformers.push(employee);

}

if(
employee.prediction===
"Needs Training"
){

trainingNeeded.push(employee);

}


/* Promotion check */

if(score>=90){

promotionCandidates.push(employee);

}


/* Risk check */

if(score<50){

riskEmployees.push(employee);

}

});


/* Average score */

const averageScore=

predictedEmployees.length>0

?

(

totalScore/

predictedEmployees.length

).toFixed(1)

:

0;


/* Department Insights */

const departmentMap={};

predictedEmployees.forEach(employee=>{

const department=
employee.department ||
"Unknown";

const score=
Number(
employee.performanceScore ||
employee.score ||
0
);

if(
!departmentMap[department]
){

departmentMap[department]={

employees:0,
totalScore:0

};

}

departmentMap[department]
.employees++;

departmentMap[department]
.totalScore+=score;

});


const departmentInsights=

Object.keys(
departmentMap
).map(key=>({

department:key,

employees:
departmentMap[key]
.employees,

averageScore:

(

departmentMap[key]
.totalScore/

departmentMap[key]
.employees

).toFixed(1)

}));



/* AI Actions */

const actions=[];

if(trainingNeeded.length>0){

actions.push(
"📚 Training sessions recommended for low performers"
);

}

if(promotionCandidates.length>0){

actions.push(
"🏆 Promotion review recommended"
);

}

if(riskEmployees.length>0){

actions.push(
"⚠️ Performance review meetings required"
);

}

if(topPerformers.length>0){

actions.push(
"🎁 Reward and retain top performers"
);

}



/* Smart Recommendations */

const smartSuggestions=[];

predictedEmployees.forEach(employee=>{

const score=
Number(
employee.performanceScore ||
employee.score ||
0
);

if(score>=90){

smartSuggestions.push({

name:employee.name,

message:
"Leadership opportunity recommended"

});

}

else if(score>=60){

smartSuggestions.push({

name:employee.name,

message:
"Skill enhancement program suggested"

});

}

else{

smartSuggestions.push({

name:employee.name,

message:
"Focused mentoring recommended"

});

}

});


/* Overall Recommendation */

let recommendation="";

if(averageScore>=80){

recommendation=
"Overall employee performance is strong";

}

else if(averageScore>=60){

recommendation=
"Performance is moderate. Improvement plans suggested";

}

else{

recommendation=
"Organization-wide training initiative recommended";

}



/* Final Response */

res.status(200).json({

success:true,

averageScore,

recommendation,

topPerformers,

trainingNeeded,

promotionCandidates,

riskEmployees,

departmentInsights,

actions,

smartSuggestions,

totalEmployees:
predictedEmployees.length,

allPredictions:
predictedEmployees

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
