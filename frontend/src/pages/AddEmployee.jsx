import {useState,useEffect} from "react";
import {useSearchParams} from "react-router-dom";
import axios from "axios";

function AddEmployee(){

const [searchParams]=useSearchParams();

const employeeId=searchParams.get("id");

const [employee,setEmployee]=useState({

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
"http://localhost:5000/api/employees"
);

const selectedEmployee=

response.data.data.find(

(emp)=>emp._id===employeeId

);

if(selectedEmployee){

setEmployee(selectedEmployee);

}

}
catch(error){

console.log(error);

}

};

const handleSubmit=async()=>{

try{

if(employeeId){

await axios.put(

`http://localhost:5000/api/employees/${employeeId}`,
employee

);

alert("Employee Updated");

}
else{

await axios.post(

"http://localhost:5000/api/employees",
employee

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