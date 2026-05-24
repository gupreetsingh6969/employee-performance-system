import {useEffect,useState} from "react";
import axios from "axios";

function EmployeeList(){

const [employees,setEmployees]=useState([]);
const [search,setSearch]=useState("");

const fetchEmployees=async()=>{

try{

const response=await axios.get(
"http://localhost:5000/api/employees"
);

setEmployees(
response.data.data
);

}
catch(error){

console.log(error);

}

};

useEffect(()=>{

fetchEmployees();

},[]);

const deleteEmployee=async(id)=>{

try{

await axios.delete(
`http://localhost:5000/api/employees/${id}`
);

fetchEmployees();

}
catch(error){

console.log(error);

}

};

const filteredEmployees=

employees.filter((employee)=>

employee.name.toLowerCase().includes(
search.toLowerCase()
)

||

employee.department.toLowerCase().includes(
search.toLowerCase()
)

);

return(

<div style={{padding:"20px"}}>

<h1>Employee List</h1>

<input

type="text"
placeholder="Search by Name or Department"

value={search}

onChange={(e)=>
setSearch(e.target.value)
}

style={{

padding:"8px",
marginBottom:"20px",
width:"250px"

}}

/>

<table border="1" cellPadding="10">

<thead>

<tr>

<th>Name</th>
<th>Email</th>
<th>Department</th>
<th>Position</th>
<th>Score</th>
<th>Action</th>

</tr>

</thead>

<tbody>

{

filteredEmployees.map((employee)=>(

<tr key={employee._id}>

<td>{employee.name}</td>
<td>{employee.email}</td>
<td>{employee.department}</td>
<td>{employee.position}</td>
<td>{employee.performanceScore}</td>

<td>

<button>
Edit
</button>

{" "}

<button
onClick={()=>
deleteEmployee(employee._id)
}
>
Delete
</button>

</td>

</tr>

))

}

</tbody>

</table>
cd ..
</div>

);

}

export default EmployeeList;