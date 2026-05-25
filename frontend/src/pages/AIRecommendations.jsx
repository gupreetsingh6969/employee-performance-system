import { useEffect, useState } from "react";
import axios from "axios";

function AIRecommendations() {

const [data,setData]=useState(null);

useEffect(()=>{

loadRecommendations();

},[]);

const loadRecommendations=async()=>{

try{

const token=localStorage.getItem("token");

const response=await axios.get(
"http://localhost:5000/api/ai",
{
headers:{
Authorization:`Bearer ${token}`
}
}
);

setData(response.data);

}
catch(error){

console.log(error);

}

};

return(

<div style={{padding:"20px"}}>

<h1>AI Recommendations</h1>

{data && (

<>

<div
style={{
border:"1px solid #ccc",
padding:"20px",
borderRadius:"10px",
marginBottom:"20px"
}}
>

<h3>
Average Score: {data.averageScore}
</h3>

<p>
Recommendation:
{data.recommendation}
</p>

</div>

<h3>Top Performers</h3>

<ul>
{data.topPerformers.map((employee)=>(

<li key={employee.id}>
{employee.name}
- Score:
{employee.performanceScore}
</li>

))}
</ul>

<h3>Training Needed</h3>

<ul>
{data.trainingNeeded.map((employee)=>(

<li key={employee.id}>
{employee.name}
- Score:
{employee.performanceScore}
</li>

))}
</ul>

</>

)}

</div>

);

}

export default AIRecommendations;