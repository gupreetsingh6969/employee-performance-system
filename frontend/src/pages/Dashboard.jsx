import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {

const [stats, setStats] = useState({});
const [employees, setEmployees] = useState([]);

useEffect(() => {
loadDashboard();
}, []);

const loadDashboard = async () => {

try{

const token = localStorage.getItem("token");

const dashboardRes = await api.get(
"/dashboard",
{
headers:{
Authorization:`Bearer ${token}`
}
}
);

const usersRes = await api.get("/users");

setStats(dashboardRes.data);
setEmployees(usersRes.data);

}catch(error){

console.log(error);

}

};

return(

<div
style={{
padding:"20px"
}}
>

<h1
style={{
textAlign:"center"
}}
>
Employee Performance Dashboard
</h1>

<div
style={{
display:"flex",
justifyContent:"center",
gap:"20px",
flexWrap:"wrap",
marginTop:"30px"
}}
>

<div
style={{
border:"1px solid gray",
padding:"20px",
width:"200px",
textAlign:"center"
}}
>
<h3>Total Employees</h3>
<h1>{stats.totalEmployees}</h1>
</div>

<div
style={{
border:"1px solid gray",
padding:"20px",
width:"200px",
textAlign:"center"
}}
>
<h3>Total Tasks</h3>
<h1>{stats.totalTasks}</h1>
</div>

<div
style={{
border:"1px solid gray",
padding:"20px",
width:"200px",
textAlign:"center"
}}
>
<h3>Completed Tasks</h3>
<h1>{stats.completedTasks}</h1>
</div>

<div
style={{
border:"1px solid gray",
padding:"20px",
width:"200px",
textAlign:"center"
}}
>
<h3>Total Reviews</h3>
<h1>{stats.totalReviews}</h1>
</div>

</div>

<hr/>

<h2>Employee List</h2>

{employees.map((emp)=>(

<div
key={emp.id}
style={{
border:"1px solid lightgray",
padding:"10px",
margin:"10px"
}}
>

<p><b>Name:</b> {emp.name}</p>
<p><b>Email:</b> {emp.email}</p>

</div>

))}

</div>

);

}

export default Dashboard;