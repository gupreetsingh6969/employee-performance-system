import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

import {
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
CartesianGrid,
ResponsiveContainer
} from "recharts";

function Dashboard(){

const [stats,setStats]=useState({
totalEmployees:0,
averageScore:0,
highestScore:0
});

useEffect(()=>{

loadDashboard();

},[]);

const loadDashboard=async()=>{

try{

const response=
await axios.get(
"http://localhost:5000/api/employees",
{
headers:{
Authorization:
`Bearer ${localStorage.getItem("token")}`
}
}
);

const employees=
response.data.data || [];

const totalEmployees=
employees.length;

const totalScore=
employees.reduce(
(sum,e)=>
sum+Number(e.performanceScore||0),
0
);

const averageScore=
employees.length>0
?
(totalScore/employees.length).toFixed(1)
:
0;

const highestScore=
employees.length>0
?
Math.max(
...employees.map(
e=>Number(e.performanceScore||0)
)
)
:
0;

setStats({
totalEmployees,
averageScore,
highestScore
});

}
catch(error){

console.log(error);

}

};

return(

<div
style={{
display:"flex",
background:"#f3f4f6",
minHeight:"100vh"
}}
>

<Sidebar/>

<div
style={{
padding:"30px",
width:"100%"
}}
>

<h1>Employee Dashboard</h1>

<div
style={{
display:"flex",
gap:"20px",
marginTop:"30px",
flexWrap:"wrap"
}}
>

<div
style={{
background:"white",
padding:"20px",
borderRadius:"12px",
minWidth:"220px"
}}
>
<h3>Total Employees</h3>
<h2>{stats.totalEmployees}</h2>
</div>

<div
style={{
background:"white",
padding:"20px",
borderRadius:"12px",
minWidth:"220px"
}}
>
<h3>Average Score</h3>
<h2>{stats.averageScore}</h2>
</div>

<div
style={{
background:"white",
padding:"20px",
borderRadius:"12px",
minWidth:"220px"
}}
>
<h3>Highest Score</h3>
<h2>{stats.highestScore}</h2>
</div>

</div>

<h2 style={{marginTop:"40px"}}>
Performance Analytics
</h2>

<div
style={{
background:"white",
padding:"20px",
borderRadius:"12px",
height:"400px",
marginTop:"20px"
}}
>

<ResponsiveContainer
width="100%"
height="100%"
>

<BarChart
data={[
{
name:"Average",
performanceScore:Number(stats.averageScore)
},
{
name:"Highest",
performanceScore:Number(stats.highestScore)
}
]}
>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="name"/>

<YAxis/>

<Tooltip/>

<Bar dataKey="performanceScore"/>

</BarChart>

</ResponsiveContainer>

</div>

</div>

</div>

);

}

export default Dashboard;