import { useEffect,useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

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

const navigate=useNavigate();

const API_URL = import.meta.env.VITE_API_URL;
const [stats,setStats]=useState({

totalEmployees:0,
totalTasks:0,
completedTasks:0,
pendingTasks:0,
averageScore:0,
topPerformer:null,
lowPerformer:null,
topPerformers:[],
recentEmployees:[]

});

useEffect(()=>{

loadDashboard();

},[]);

const loadDashboard=async()=>{

try{

const token=
localStorage.getItem("token");

if(!token){

navigate("/");
return;

}

const response=
await axios.get(

`${API_URL}/api/dashboard`,
{
headers:{
Authorization:`Bearer ${token}`
}
}

);

setStats(
response.data.data
);

}
catch(error){

console.log(
"Dashboard Error:",
error.response?.data ||
error.message
);

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

<h1>
Employee Performance Dashboard
</h1>


<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",
gap:"20px",
marginTop:"30px"
}}
>

<div style={{
background:"white",
padding:"20px",
borderRadius:"12px"
}}>
<h3>Total Employees</h3>
<h2>{stats.totalEmployees}</h2>
</div>

<div style={{
background:"white",
padding:"20px",
borderRadius:"12px"
}}>
<h3>Total Tasks</h3>
<h2>{stats.totalTasks}</h2>
</div>

<div style={{
background:"white",
padding:"20px",
borderRadius:"12px"
}}>
<h3>Completed Tasks</h3>
<h2>{stats.completedTasks}</h2>
</div>

<div style={{
background:"white",
padding:"20px",
borderRadius:"12px"
}}>
<h3>Pending Tasks</h3>
<h2>{stats.pendingTasks}</h2>
</div>

<div style={{
background:"white",
padding:"20px",
borderRadius:"12px"
}}>
<h3>Average Score</h3>
<h2>{stats.averageScore}</h2>
</div>

</div>


<div
style={{
display:"grid",
gridTemplateColumns:"1fr 1fr",
gap:"20px",
marginTop:"30px"
}}
>

<div style={{
background:"white",
padding:"20px",
borderRadius:"12px"
}}>

<h3>Top Performer</h3>

<h2>
{stats.topPerformer?.name || "-"}
</h2>

<p>

Score:
{stats.topPerformer?.performanceScore || 0}

</p>

</div>


<div style={{
background:"white",
padding:"20px",
borderRadius:"12px"
}}>

<h3>Low Performer</h3>

<h2>
{stats.lowPerformer?.name || "-"}
</h2>

<p>

Score:
{stats.lowPerformer?.performanceScore || 0}

</p>

</div>

</div>



<div
style={{
background:"white",
padding:"20px",
borderRadius:"12px",
height:"400px",
marginTop:"30px"
}}
>

<h2>

Performance Overview

</h2>

<ResponsiveContainer
width="100%"
height="90%"
>

<BarChart
data={[
{
name:"Employees",
value:stats.totalEmployees
},
{
name:"Tasks",
value:stats.totalTasks
},
{
name:"Completed",
value:stats.completedTasks
},
{
name:"Pending",
value:stats.pendingTasks
}
]}
>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="name"/>

<YAxis/>

<Tooltip/>

<Bar dataKey="value"/>

</BarChart>

</ResponsiveContainer>

</div>



<div
style={{
background:"white",
padding:"20px",
borderRadius:"12px",
marginTop:"30px"
}}
>

<h2>

Top Performers

</h2>

{

stats.topPerformers?.map((employee)=>(

<div
key={employee.id}
style={{
display:"flex",
justifyContent:"space-between",
padding:"10px",
borderBottom:"1px solid #ddd"
}}
>

<span>
{employee.name}
</span>

<span>

{employee.performanceScore}

</span>

</div>

))

}

</div>

</div>

</div>

);

}

export default Dashboard;

