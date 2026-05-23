import { useState } from "react";

function Employee() {

const [keyword, setKeyword] = useState("");

const employeeRecords = [

{
id:1,
fullName:"Gurpreet Singh",
email:"gurpreet@gmail.com",
designation:"Employee"
},

{
id:2,
fullName:"Rahul Kumar",
email:"rahul@gmail.com",
designation:"Manager"
},

{
id:3,
fullName:"Priya Sharma",
email:"priya@gmail.com",
designation:"HR"
}

];

const visibleEmployees = employeeRecords.filter((item)=>

item.fullName
.toLowerCase()
.includes(keyword.toLowerCase())

);

return(

<div style={{padding:"25px"}}>

<h1>Employee Directory</h1>

<input
type="text"
placeholder="Search employee by name..."
value={keyword}
onChange={(e)=>setKeyword(e.target.value)}
style={{
padding:"10px",
width:"320px",
marginBottom:"20px"
}}
/>

{

visibleEmployees.map((employee)=>(

<div
key={employee.id}
style={{
border:"1px solid #d1d5db",
padding:"15px",
marginBottom:"10px",
borderRadius:"8px"
}}
>

<h3>{employee.fullName}</h3>

<p>Email: {employee.email}</p>

<p>Role: {employee.designation}</p>

</div>

))

}

</div>

);

}

export default Employee;