import { useState, useEffect } from "react";

function Employee() {

const [employees,setEmployees]=useState([]);
const [name,setName]=useState("");
const [position,setPosition]=useState("");

useEffect(()=>{

const savedEmployees=
JSON.parse(
localStorage.getItem("employees")
) || [];

setEmployees(savedEmployees);

},[]);

const addEmployee=()=>{

if(!name || !position) return;

const newEmployee={

id:Date.now(),
name,
position

};

const updatedEmployees=[
...employees,
newEmployee
];

setEmployees(updatedEmployees);

localStorage.setItem(
"employees",
JSON.stringify(updatedEmployees)
);

setName("");
setPosition("");

};

const deleteEmployee=(id)=>{

const updatedEmployees=
employees.filter(
(emp)=>emp.id!==id
);

setEmployees(updatedEmployees);

localStorage.setItem(
"employees",
JSON.stringify(updatedEmployees)
);

};

return(

<div
style={{
padding:"20px",
textAlign:"center"
}}
>

<h1>Employee Management</h1>

<input
type="text"
placeholder="Employee Name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<input
type="text"
placeholder="Position"
value={position}
onChange={(e)=>setPosition(e.target.value)}
/>

<button onClick={addEmployee}>
Add Employee
</button>

<hr/>

{

employees.map((emp)=>(

<div key={emp.id}>

<h3>{emp.name}</h3>
<p>{emp.position}</p>

<button
onClick={()=>
deleteEmployee(emp.id)
}
>
Delete
</button>

</div>

))

}

</div>

);

}

export default Employee;