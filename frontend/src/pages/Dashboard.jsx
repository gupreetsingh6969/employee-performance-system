import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function Dashboard() {

const [stats, setStats] = useState({

totalEmployees: 0,
averageScore: 0,
highestScore: 0

});

const [loading, setLoading] = useState(true);

const [error, setError] = useState("");

useEffect(() => {

loadDashboard();

}, []);

const loadDashboard = async () => {

try {

setLoading(true);

setError("");

const response = await axios.get(
"https://employee-performance-system-production-2fc6.up.railway.app/api/employees"
);

console.log(response.data);

const employees = response.data || [];

const totalEmployees =
employees.length;

const totalScore =
employees.reduce(

(sum, employee) =>

sum + Number(employee.performanceScore || 0),

0

);

const averageScore =

employees.length > 0
?
(totalScore / employees.length).toFixed(1)
:
0;

const highestScore =

employees.length > 0
?
Math.max(
...employees.map(
employee => Number(employee.performanceScore || 0)
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

setError(
"Failed to load dashboard data"
);

}
finally{

setLoading(false);

}

};

if(loading){

return(

<h2
style={{
padding:"30px"
}}
>
Loading...
</h2>

);

}

if(error){

return(

<h2
style={{
padding:"30px",
color:"red"
}}
>
{error}
</h2>

);

}

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

<h1
style={{
fontSize:"32px",
marginBottom:"10px"
}}
>
Employee Performance System
</h1>

<p
style={{
color:"#6b7280",
marginBottom:"30px"
}}
>
Track employee performance, analytics, and AI recommendations
</p>

<div
style={{
display:"flex",
gap:"20px",
flexWrap:"wrap"
}}
>

<div
style={{
background:"white",
padding:"20px",
borderRadius:"12px",
width:"250px",
boxShadow:"0 2px 10px rgba(0,0,0,0.1)"
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
width:"250px",
boxShadow:"0 2px 10px rgba(0,0,0,0.1)"
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
width:"250px",
boxShadow:"0 2px 10px rgba(0,0,0,0.1)"
}}
>
<h3>Highest Score</h3>
<h2>{stats.highestScore}</h2>
</div>

</div>

<h2
style={{
marginTop:"40px"
}}
>
Quick Navigation
</h2>

<div
style={{
display:"flex",
gap:"15px",
flexWrap:"wrap",
marginTop:"20px"
}}
>

<Link to="/ai">
<button>AI Recommendations</button>
</Link>

<Link to="/notifications">
<button>Notifications</button>
</Link>

<Link to="/analytics">
<button>Analytics</button>
</Link>

<Link to="/charts">
<button>Charts</button>
</Link>

<Link to="/testing">
<button>Testing Metrics</button>
</Link>

</div>

</div>

</div>

);

}

export default Dashboard;