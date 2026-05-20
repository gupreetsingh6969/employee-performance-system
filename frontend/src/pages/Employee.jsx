import { useEffect, useState } from "react";
import api from "../services/api";

function Employee() {

const [employees, setEmployees] = useState([]);
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [editId, setEditId] = useState(null);

useEffect(() => {
fetchEmployees();
}, []);

const fetchEmployees = async () => {

try {

const response = await api.get("/employees");

setEmployees(response.data);

} catch(error){

console.log(error);

}

};

const saveEmployee = async () => {

try {

if(name.trim()===""){

alert("Employee name is required");

return;

}

if(email.trim()==="" && !editId){

alert("Employee email is required");

return;

}

if(
!editId &&
!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
){

alert("Enter valid email");

return;

}

if(editId){

await api.put(`/employees/${editId}`,{
name,
role:"Employee"
});

setEditId(null);

}else{

await api.post("/employees",{
name,
email
});

}

setName("");
setEmail("");

fetchEmployees();

}catch(error){

console.log(error);

}

};

const editEmployee=(emp)=>{

setName(emp.name);
setEmail(emp.email);

setEditId(emp.id);

};

const deleteEmployee = async(id)=>{

try{

await api.delete(`/employees/${id}`);

fetchEmployees();

}catch(error){

console.log(error);

}

};

return(

<div>

<h1>Employees</h1>

<input
type="text"
placeholder="Employee Name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<br/><br/>

<input
type="email"
placeholder="Employee Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
disabled={editId}
/>

<br/><br/>

<button onClick={saveEmployee}>
{editId ? "Update Employee" : "Add Employee"}
</button>

<hr/>

{

employees.map((emp)=>(

<div
key={emp.id}
style={{
border:"1px solid gray",
padding:"10px",
margin:"10px"
}}
>

<h3>{emp.name}</h3>

<p>{emp.email}</p>

<button
onClick={()=>editEmployee(emp)}
>
Edit
</button>

{" "}

<button
onClick={()=>deleteEmployee(emp.id)}
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