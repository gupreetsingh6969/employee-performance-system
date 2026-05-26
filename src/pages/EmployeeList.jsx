import { useEffect,useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function EmployeeList(){

const [employees,setEmployees]=useState([]);
const [search,setSearch]=useState("");

const token=
localStorage.getItem("token");

useEffect(()=>{

fetchEmployees();

},[]);

const fetchEmployees=async()=>{

try{

const response=
await axios.get(

`${API_URL}/employees",

{
headers:{
Authorization:
`Bearer ${token}`
}
}

);

setEmployees(
response.data
);

}
catch(error){

console.log(error);

}

};

const handleAdd=async()=>{

const name=
prompt("Employee Name");

const email=
prompt("Employee Email");

const department=
prompt("Department");

const position=
prompt("Position");

const performanceScore=
prompt("Performance Score");

if(
!name ||
!email ||
!department ||
!position ||
!performanceScore
){

alert("Fill all fields");
return;

}

try{

await axios.post(

`${API_URL}/employees",

{
name,
email,
department,
position,
performanceScore:Number(
performanceScore
)
},

{
headers:{
Authorization:
`Bearer ${token}`
}
}

);

alert(
"Employee Added"
);

fetchEmployees();

}
catch(error){

console.log(
error.response?.data
);

alert(
error.response?.data?.message
);

}

};

const handleEdit=async(employee)=>{

const name=
prompt(
"Name",
employee.name
);

const email=
prompt(
"Email",
employee.email
);

const department=
prompt(
"Department",
employee.department
);

const position=
prompt(
"Position",
employee.position
);

const performanceScore=
prompt(
"Score",
employee.performanceScore
);

try{

await axios.put(

`${API_URL}/employees/${employee.id}`,

{
name,
email,
department,
position,
performanceScore:Number(
performanceScore
)
},

{
headers:{
Authorization:
`Bearer ${token}`
}
}

);

alert(
"Employee Updated"
);

fetchEmployees();

}
catch(error){

console.log(error);

}

};

const handleDelete=async(id)=>{

try{

await axios.delete(

`${API_URL}/employees/${id}`,

{
headers:{
Authorization:
`Bearer ${token}`
}
}

);

fetchEmployees();

}
catch(error){

console.log(error);

}

};

const filteredEmployees=
employees.filter(

employee=>

employee.name
?.toLowerCase()
.includes(
search.toLowerCase()
)

);

return(

<div style={{
display:"flex"
}}>

<Sidebar/>

<div style={{
padding:"30px",
width:"100%"
}}>

<h1>Employees</h1>

<br/>

<input
type="text"
placeholder="Search..."
value={search}
onChange={(e)=>
setSearch(
e.target.value
)
}
/>

<button
onClick={handleAdd}
style={{
marginLeft:"10px"
}}
>
➕ Add Employee
</button>

<br/><br/>

<table
style={{
width:"100%"
}}
>

<thead>

<tr>

<th>Name</th>
<th>Email</th>
<th>Department</th>
<th>Position</th>
<th>Score</th>
<th>Actions</th>

</tr>

</thead>

<tbody>

{

filteredEmployees.map(

(employee)=>(

<tr
key={employee.id}
>

<td>{employee.name}</td>

<td>{employee.email}</td>

<td>{employee.department}</td>

<td>{employee.position}</td>

<td>{employee.performanceScore}</td>

<td>

<button
onClick={()=>
handleEdit(
employee
)
}
>
Edit
</button>

<button
onClick={()=>
handleDelete(
employee.id
)
}
style={{
marginLeft:"10px"
}}
>
Delete
</button>

</td>

</tr>

)

)

}

</tbody>

</table>

</div>

</div>

);

}

export default EmployeeList;



