import { useEffect, useState } from "react";
import axios from "axios";

import {
BarChart,
Bar,
LineChart,
Line,
PieChart,
Pie,
Cell,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer
} from "recharts";

export default function PerformanceAnalytics(){

const [employees,setEmployees]=useState([]);
const [stats,setStats]=useState({});
const [loading,setLoading]=useState(true);

const API_URL = import.meta.env.VITE_API_URL;

useEffect(()=>{

fetchData();

},[]);

const fetchData=async()=>{

try{

const token=
localStorage.getItem("token");

if(!token){

console.log("Token not found");
setLoading(false);
return;

}

const res=
await axios.get(

`${API_URL}/api/performance`,
{
headers:{
Authorization:`Bearer ${token}`
}
}

);

console.log(
"Performance Data:",
res.data
);

setEmployees(
res.data?.employees || []
);

setStats(
res.data || {}
);

}
catch(error){

console.log(

"Performance API Error:",

error.response?.data ||
error.message

);

}
finally{

setLoading(false);

}

};


const pieData=[

{
name:"High",
value:
employees?.filter(
e=>e.performanceScore>=80
).length || 0
},

{
name:"Medium",
value:
employees?.filter(
e=>
e.performanceScore>=50 &&
e.performanceScore<80
).length || 0
},

{
name:"Low",
value:
employees?.filter(
e=>e.performanceScore<50
).length || 0
}

];

const colors=[
"#22c55e",
"#f59e0b",
"#ef4444"
];

if(loading){

return(

<div className="p-6">

Loading Performance Analytics...

</div>

);

}

return(

<div className="p-6 bg-gray-100 min-h-screen">

<h1 className="text-3xl font-bold mb-6">

Performance Analytics

</h1>


<div className="grid md:grid-cols-4 gap-4 mb-6">

<div className="bg-white p-5 rounded-xl shadow">

<p>Total Employees</p>

<h2 className="text-2xl font-bold">

{stats.totalEmployees || 0}

</h2>

</div>


<div className="bg-white p-5 rounded-xl shadow">

<p>Average Score</p>

<h2 className="text-2xl font-bold">

{stats.averageScore || 0}

</h2>

</div>


<div className="bg-white p-5 rounded-xl shadow">

<p>Top Performer</p>

<h2 className="font-bold">

{stats.topPerformer?.name || "-"}

</h2>

<p>

Score:
{stats.topPerformer?.performanceScore || 0}

</p>

</div>


<div className="bg-white p-5 rounded-xl shadow">

<p>Low Performer</p>

<h2 className="font-bold">

{stats.lowPerformer?.name || "-"}

</h2>

<p>

Score:
{stats.lowPerformer?.performanceScore || 0}

</p>

</div>

</div>



<div className="grid md:grid-cols-2 gap-6">

<div className="bg-white p-5 rounded-xl shadow">

<h2 className="mb-4 font-bold">

Performance Scores

</h2>

<ResponsiveContainer
width="100%"
height={300}
>

<BarChart
data={employees}
>

<XAxis dataKey="name"/>

<YAxis/>

<Tooltip/>

<Bar
dataKey="performanceScore"
/>

</BarChart>

</ResponsiveContainer>

</div>


<div className="bg-white p-5 rounded-xl shadow">

<h2 className="mb-4 font-bold">

Performance Trend

</h2>

<ResponsiveContainer
width="100%"
height={300}
>

<LineChart
data={employees}
>

<XAxis dataKey="name"/>

<YAxis/>

<Tooltip/>

<Line
type="monotone"
dataKey="performanceScore"
/>

</LineChart>

</ResponsiveContainer>

</div>

</div>



<div className="grid md:grid-cols-2 gap-6 mt-6">

<div className="bg-white p-5 rounded-xl shadow">

<h2 className="font-bold mb-4">

Performance Distribution

</h2>

<ResponsiveContainer
width="100%"
height={300}
>

<PieChart>

<Pie
data={pieData}
dataKey="value"
outerRadius={100}
label
>

{
pieData.map(
(item,index)=>(

<Cell
key={index}
fill={colors[index]}
/>

))
}

</Pie>

<Tooltip/>

</PieChart>

</ResponsiveContainer>

</div>



<div className="bg-white p-5 rounded-xl shadow">

<h2 className="font-bold mb-4">

Employee Rankings

</h2>

{

[...employees]

.sort(
(a,b)=>
b.performanceScore-
a.performanceScore
)

.map((emp,index)=>(

<div
key={emp.id}
className="flex justify-between border-b py-3"
>

<div>

#{index+1} {emp.name}

</div>

<div>

{emp.performanceScore}

</div>

</div>

))

}

</div>

</div>

</div>

);

}

