import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

function AddEmployee() {

const [searchParams] = useSearchParams();
const employeeId = searchParams.get("id");

const [employee, setEmployee] = useState({
name:"",
email:"",
department:"",
position:"",
performanceScore:""
});

const handleChange=(e)=>{

setEmployee({
...employee,
[e.target.name]:e.target.value
});

};

useEffect(()=>{

if(employeeId){
loadEmployee();
}

},[]);

const loadEmployee=async()=>{

try{

const response=await axios.get(
`${API_URL}/employees"
);

const employees=response.data;

const selectedEmployee=
employees.find(
(emp)=>String(emp.id)===String(employeeId)
);

if(selectedEmployee){

setEmployee({
name:selectedEmployee.name || "",
email:selectedEmployee.email || "",
department:selectedEmployee.department || "",
position:selectedEmployee.position || "",
performanceScore:selectedEmployee.performanceScore || ""
});

}

}
catch(error){

console.log(error);

}

};

const handleSubmit=async()=>{

try{

const payload={

name:employee.name,
email:employee.email,
department:employee.department,
position:employee.position,
performanceScore:Number(employee.performanceScore)

};

if(employeeId){

await axios.put(
`${API_URL}/employees/${employeeId}`,
payload
);

alert("Employee Updated");

}
else{

await axios.post(
`${API_URL}/employees",
payload
);

alert("Employee Added");

}

window.location.href="/employees";

}
catch(error){

console.log(error);

alert("Operation Failed");

}

};

return(

<div style={{padding:"30px"}}>

<h2>
{employeeId ? "Edit Employee" : "Add Employee"}
</h2>

<input
name="name"
placeholder="Name"
value={employee.name}
onChange={handleChange}
/>

<br/><br/>

<input
name="email"
placeholder="Email"
value={employee.email}
onChange={handleChange}
/>

<br/><br/>

<input
name="department"
placeholder="Department"
value={employee.department}
onChange={handleChange}
/>

<br/><br/>

<input
name="position"
placeholder="Position"
value={employee.position}
onChange={handleChange}
/>

<br/><br/>

<input
type="number"
name="performanceScore"
placeholder="Performance Score"
value={employee.performanceScore}
onChange={handleChange}
/>

<br/><br/>

<button onClick={handleSubmit}>
{employeeId ? "Update Employee" : "Add Employee"}
</button>

</div>

);

}

export default AddEmployee;



