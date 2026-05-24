import { useEffect,useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function EmployeeList(){

const [employees,setEmployees]=useState([]);

useEffect(()=>{

fetchEmployees();

},[]);

const fetchEmployees=async()=>{

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

setEmployees(
response.data.data || []
);

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

<h1>
Employees
</h1>

<div
style={{
background:"white",
marginTop:"20px",
borderRadius:"12px",
padding:"20px"
}}
>

<table
style={{
width:"100%",
borderCollapse:"collapse"
}}
>

<thead>

<tr>

<th>Name</th>
<th>Department</th>
<th>Score</th>

</tr>

</thead>

<tbody>

{

employees.map((employee,index)=>(

<tr key={index}>

<td>{employee.name}</td>

<td>{employee.department}</td>

<td>{employee.performanceScore}</td>

</tr>

))

}

</tbody>

</table>

</div>

</div>

</div>

);

}

export default EmployeeList;