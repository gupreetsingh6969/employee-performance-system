import { useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function AddEmployee(){

const [employee,setEmployee]=useState({

name:"",
email:"",
performanceScore:"",
department:"",
role:""

});

const addEmployee=async()=>{

try{

const token=localStorage.getItem("token");

await axios.post(

"http://localhost:5000/api/employees",

employee,

{
headers:{
Authorization:`Bearer ${token}`
}
}

);

alert("Employee Added Successfully");

setEmployee({

name:"",
email:"",
performanceScore:"",
department:"",
role:""

});

}
catch(error){

console.log(error);

alert(
error.response?.data?.message ||
"Failed To Add Employee"
);

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
flex:1,
padding:"40px"
}}
>

<div
style={{
maxWidth:"700px",
margin:"auto",
background:"white",
padding:"35px",
borderRadius:"20px",
boxShadow:"0 4px 15px rgba(0,0,0,0.2)"
}}
>

<div
style={{
textAlign:"center",
marginBottom:"30px"
}}
>

<div
style={{
fontSize:"60px"
}}
>
👨‍💼
</div>

<h1>Add Employee</h1>

<p style={{color:"gray"}}>
Create employee profile
</p>

</div>


<input
type="text"
placeholder="Employee Name"
value={employee.name}
onChange={(e)=>
setEmployee({
...employee,
name:e.target.value
})
}
style={inputStyle}
/>

<br/><br/>


<input
type="email"
placeholder="Employee Email"
value={employee.email}
onChange={(e)=>
setEmployee({
...employee,
email:e.target.value
})
}
style={inputStyle}
/>

<br/><br/>


<input
type="number"
placeholder="Performance Score"
value={employee.performanceScore}
onChange={(e)=>
setEmployee({
...employee,
performanceScore:e.target.value
})
}
style={inputStyle}
/>

<br/><br/>


<select
value={employee.department}
onChange={(e)=>
setEmployee({
...employee,
department:e.target.value
})
}
style={inputStyle}
>

<option value="">
Select Department
</option>

<option value="HR">
HR
</option>

<option value="IT">
IT
</option>

<option value="Marketing">
Marketing
</option>

<option value="Finance">
Finance
</option>

</select>

<br/><br/>


<input
type="text"
placeholder="Employee Role"
value={employee.role}
onChange={(e)=>
setEmployee({
...employee,
role:e.target.value
})
}
style={inputStyle}
/>

<br/><br/>


<button
onClick={addEmployee}
style={{

width:"100%",
padding:"15px",
border:"none",
borderRadius:"12px",
background:"#2563eb",
color:"white",
fontWeight:"bold",
fontSize:"16px",
cursor:"pointer"

}}
>

➕ Add Employee

</button>

</div>

</div>

</div>

);

}

const inputStyle={

width:"100%",
padding:"14px",
border:"1px solid #d1d5db",
borderRadius:"12px",
fontSize:"15px"

};

export default AddEmployee;