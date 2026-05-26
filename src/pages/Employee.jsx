import { useState } from "react";

function Employees(){

const [employees,setEmployees]=useState([

{
id:1,
name:"John",
department:"Development",
score:"92%"
},

{
id:2,
name:"Sarah",
department:"HR",
score:"88%"
}

]);

const handleEdit=(id)=>{

const updated=employees.map((employee)=>

employee.id===id
?{
...employee,
name:prompt(
"Enter employee name",
employee.name
) || employee.name
}
:employee

);

setEmployees(updated);

};

const handleDelete=(id)=>{

setEmployees(

employees.filter(
(employee)=>employee.id!==id
)

);

};

return(

<div style={{padding:"40px"}}>

<h1>Employees</h1>

<br/>

<table
style={{
width:"100%",
background:"white",
borderRadius:"10px"
}}
>

<thead>

<tr>

<th>Name</th>
<th>Department</th>
<th>Score</th>
<th>Actions</th>

</tr>

</thead>

<tbody>

{

employees.map((employee)=>(

<tr key={employee.id}>

<td>{employee.name}</td>

<td>{employee.department}</td>

<td>{employee.score}</td>

<td>

<button
onClick={()=>handleEdit(employee.id)}
>
Edit
</button>

<button
onClick={()=>handleDelete(employee.id)}
style={{
marginLeft:"10px"
}}
>
Delete
</button>

</td>

</tr>

))

}

</tbody>

</table>

</div>

);

}

export default Employees;

