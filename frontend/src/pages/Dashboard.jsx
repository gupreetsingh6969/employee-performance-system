import { useEffect, useState } from "react";

function Dashboard() {

const [stats, setStats] = useState({
employees:0,
tasks:0,
completed:0,
reviews:0
});

useEffect(()=>{

const employeeData =
JSON.parse(
localStorage.getItem("employees")
) || [];

const taskData =
JSON.parse(
localStorage.getItem("tasks")
) || [];

const reviewData =
JSON.parse(
localStorage.getItem("reviews")
) || [];

const completedTasks =
taskData.filter(
(task)=>task.status==="Completed"
).length;

setStats({
employees:employeeData.length,
tasks:taskData.length,
completed:completedTasks,
reviews:reviewData.length
});

},[]);

return(

<div
style={{
padding:"30px",
maxWidth:"1200px",
margin:"0 auto"
}}
>

<h1
style={{
fontSize:"48px",
textAlign:"center",
marginBottom:"40px",
lineHeight:"1.3"
}}
>
Employee Performance Dashboard
</h1>

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",
gap:"20px"
}}
>

<div
style={{
border:"1px solid lightgray",
padding:"30px",
borderRadius:"10px"
}}
>
<h2>Total Employees</h2>
<h1>{stats.employees}</h1>
</div>

<div
style={{
border:"1px solid lightgray",
padding:"30px",
borderRadius:"10px"
}}
>
<h2>Total Tasks</h2>
<h1>{stats.tasks}</h1>
</div>

<div
style={{
border:"1px solid lightgray",
padding:"30px",
borderRadius:"10px"
}}
>
<h2>Completed Tasks</h2>
<h1>{stats.completed}</h1>
</div>

<div
style={{
border:"1px solid lightgray",
padding:"30px",
borderRadius:"10px"
}}
>
<h2>Total Reviews</h2>
<h1>{stats.reviews}</h1>
</div>

</div>

</div>

);

}

export default Dashboard;