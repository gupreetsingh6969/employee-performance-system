import { useState } from "react";

function Employee() {

const [employees,setEmployees]=useState([]);

const [name,setName]=useState("");
const [position,setPosition]=useState("");

const addEmployee=()=>{

if(!name || !position) return;

setEmployees([
...employees,
{
id:Date.now(),
name,
position
}
]);

setName("");
setPosition("");

};

const deleteEmployee=(id)=>{

setEmployees(
employees.filter(
(emp)=>emp.id!==id
)
);

};

return(

<div
style={{
padding:"20px",
textAlign:"center"
}}
>

<h1
style={{
fontSize:"50px",
marginBottom:"30px"
}}
>
Employee Management
</h1>

<div
style={{
marginBottom:"20px"
}}
>

<input
type="text"
placeholder="Employee Name"
value={name}
onChange={(e)=>setName(e.target.value)}
style={{
padding:"10px",
marginRight:"10px"
}}
/>

<input
type="text"
placeholder="Position"
value={position}
onChange={(e)=>setPosition(e.target.value)}
style={{
padding:"10px",
marginRight:"10px"
}}
/>

<button
onClick={addEmployee}
style={{
padding:"10px"
}}
>
Add Employee
</button>

</div>

<hr/>

<div
style={{
display:"flex",
flexWrap:"wrap",
justifyContent:"center",
gap:"20px",
marginTop:"20px"
}}
>

{

employees.map((emp)=>(

<div
key={emp.id}
style={{
border:"1px solid lightgray",
padding:"20px",
width:"250px",
borderRadius:"10px"
}}
>

<h3>{emp.name}</h3>

<p>{emp.position}</p>

<button
onClick={()=>deleteEmployee(emp.id)}
>
Delete
</button>

</div>

))

}

</div>

</div>

);

}

export default Employee;