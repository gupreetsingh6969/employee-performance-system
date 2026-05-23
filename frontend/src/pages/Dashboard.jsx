import { useState, useEffect } from "react";

function Dashboard() {

const [statistics, setStatistics] = useState({

employees:0,
pendingTasks:0,
completedTasks:0,
performanceScore:0

});

const [activityList,setActivityList] = useState([]);

const loadDashboardData = ()=>{

setStatistics({

employees:25,
pendingTasks:8,
completedTasks:17,
performanceScore:91

});

setActivityList([

"Task assigned to employee team",
"Performance review updated",
"Achievement record added"

]);

};


useEffect(()=>{

loadDashboardData();

},[]);



return(

<div style={{padding:"20px"}}>

<h1>
Employee Performance Dashboard
</h1>

<p>
Welcome to the employee monitoring system
</p>

<br/>

<button
onClick={loadDashboardData}
style={{
padding:"10px",
cursor:"pointer"
}}
>
Refresh Dashboard
</button>

<br/><br/>


<div
style={{

display:"flex",
gap:"20px",
flexWrap:"wrap"

}}
>


<div
style={{

border:"1px solid #d1d5db",
padding:"20px",
width:"220px",
borderRadius:"10px"

}}
>

<h3>Total Employees</h3>

<h2>
{statistics.employees}
</h2>

</div>



<div
style={{

border:"1px solid #d1d5db",
padding:"20px",
width:"220px",
borderRadius:"10px"

}}
>

<h3>Pending Tasks</h3>

<h2>
{statistics.pendingTasks}
</h2>

</div>



<div
style={{

border:"1px solid #d1d5db",
padding:"20px",
width:"220px",
borderRadius:"10px"

}}
>

<h3>Completed Tasks</h3>

<h2>
{statistics.completedTasks}
</h2>

</div>



<div
style={{

border:"1px solid #d1d5db",
padding:"20px",
width:"220px",
borderRadius:"10px"

}}
>

<h3>Performance Score</h3>

<h2>
{statistics.performanceScore}%
</h2>

</div>

</div>


<hr/>

<h2>
Recent Activities
</h2>

<div
style={{
border:"1px solid gray",
padding:"15px",
marginTop:"10px",
borderRadius:"10px"
}}
>

{

activityList.map((item,index)=>(

<p key={index}>
• {item}
</p>

))

}

</div>

</div>

);

}

export default Dashboard;