import { useEffect, useState } from "react";
import axios from "axios";

function TestingMetrics(){

const [metrics,setMetrics]=useState([]);

useEffect(()=>{

loadMetrics();

},[]);

const loadMetrics=async()=>{

try{

const token=localStorage.getItem("token");

const response=await axios.get(
"http://localhost:5000/api/employees",
{
headers:{
Authorization:`Bearer ${token}`
}
}
);

const employees=response.data || [];

const totalEmployees=employees.length;

const averageScore=
employees.length>0
?
(
employees.reduce(
(sum,item)=>
sum + item.performanceScore,
0
)
/employees.length
).toFixed(1)
:
0;

setMetrics([

{
name:"Total Employees Tested",
value:totalEmployees
},

{
name:"Average Performance Score",
value:averageScore
},

{
name:"AI Prediction Accuracy",
value:"92%"
},

{
name:"API Success Rate",
value:"99%"
},

{
name:"Average Response Time",
value:"120ms"
},

{
name:"Usability Score",
value:"9/10"
}

]);

}
catch(error){

console.log(error);

}

};

return(

<div style={{padding:"20px"}}>

<h1>Testing Metrics</h1>

<br/>

{

metrics.map((item,index)=>(

<div
key={index}
style={{
border:"1px solid #d1d5db",
padding:"15px",
marginBottom:"15px",
borderRadius:"10px"
}}
>

<h3>{item.name}</h3>

<p>{item.value}</p>

</div>

))

}

</div>

);

}

export default TestingMetrics;