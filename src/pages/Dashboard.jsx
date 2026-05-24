import { useEffect, useState } from "react";
import axios from "axios";

import {
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
CartesianGrid,
ResponsiveContainer
} from "recharts";

function Dashboard() {

const [stats, setStats] = useState({
totalEmployees:0,
averageScore:0,
highestScore:0
});

const [loading,setLoading]=useState(true);

const [error,setError]=useState("");

useEffect(()=>{

loadDashboard();

},[]);

const loadDashboard = async () => {

try {

setLoading(true);

setError("");

const token =
localStorage.getItem("token");

const response =
await axios.get(
"http://localhost:5000/api/employees",
{
headers:{
Authorization:`Bearer ${token}`
}
}
);

const employees =
response.data.data || [];

const totalEmployees =
employees.length;

const totalScore =
employees.reduce(
(sum,employee)=>
sum + Number(employee.performanceScore || 0),
0
);

const averageScore =
employees.length > 0
? (totalScore / employees.length).toFixed(1)
: 0;

const highestScore =
employees.length > 0
? Math.max(
...employees.map(
employee =>
Number(employee.performanceScore || 0)
)
)
: 0;

setStats({
totalEmployees,
averageScore,
highestScore
});

}
catch(error){

console.log(error);

setError(
"Failed to load dashboard data"
);

}
finally{

setLoading(false);

}

};

if(loading){

return <h2>Loading...</h2>;

}

if(error){

return <h2>{error}</h2>;

}

return(

<div style={{padding:"30px"}}>

<h1>Employee Dashboard</h1>

<div>

<h3>
Total Employees: {stats.totalEmployees}
</h3>

<h3>
Average Score: {stats.averageScore}
</h3>

<h3>
Highest Score: {stats.highestScore}
</h3>

</div>

<h2 style={{marginTop:"30px"}}>
Performance Analytics
</h2>

<div
style={{
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

);

}

export default Dashboard;