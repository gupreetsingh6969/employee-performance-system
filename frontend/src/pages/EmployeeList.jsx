import {useEffect,useState} from "react";
import axios from "axios";

function EmployeeList(){

const [employees,setEmployees]=useState([]);
const [loading,setLoading]=useState(true);

const [search,setSearch]=useState("");

const [editing,setEditing]=useState(null);

const [formData,setFormData]=useState({

name:"",
email:"",
department:"",
position:"",
performanceScore:0

});


useEffect(()=>{

loadEmployees();

},[]);


const loadEmployees=async()=>{

try{

setLoading(true);

const token=
localStorage.getItem("token");

const response=
await axios.get(

"http://localhost:5000/api/employees",

{
headers:{
Authorization:`Bearer ${token}`
}
}

);

setEmployees(
response.data.data || []
);

}
catch(error){

console.log(error);

}
finally{

setLoading(false);

}

};



const deleteEmployee=async(id)=>{

const confirmDelete=
window.confirm(
"Delete employee?"
);

if(!confirmDelete) return;

try{

const token=
localStorage.getItem("token");

await axios.delete(

`http://localhost:5000/api/employees/${id}`,

{
headers:{
Authorization:`Bearer ${token}`
}
}

);

loadEmployees();

}
catch(error){

console.log(error);

}

};



const updateEmployee=async()=>{

try{

const token=
localStorage.getItem("token");

await axios.put(

`http://localhost:5000/api/employees/${editing}`,

formData,

{
headers:{
Authorization:`Bearer ${token}`
}
}

);

setEditing(null);

loadEmployees();

}
catch(error){

console.log(error);

}

};



const filteredEmployees=

employees
.filter((e)=>

e.name.toLowerCase().includes(search.toLowerCase()) ||

e.email.toLowerCase().includes(search.toLowerCase()) ||

e.department.toLowerCase().includes(search.toLowerCase())

)

.sort(
(a,b)=>
b.performanceScore-a.performanceScore
);



return(

<div
style={{
padding:"30px",
background:"#f3f4f6",
minHeight:"100vh"
}}
>

<h1>
👨‍💼 Employee Management
</h1>

<br/>


<div
style={{

display:"grid",
gridTemplateColumns:"repeat(3,1fr)",
gap:"20px"

}}
>

<div style={card}>
<h3>Total Employees</h3>
<h1>{employees.length}</h1>
</div>

<div style={card}>
<h3>Top Performers</h3>
<h1>

{
employees.filter(
e=>e.performanceScore>=80
).length
}

</h1>

</div>

<div style={card}>
<h3>Average Score</h3>

<h1>

{

employees.length>0 ?

Math.round(

employees.reduce(
(sum,e)=>

sum+e.performanceScore,

0

)/employees.length

)

:

0

}

</h1>

</div>

</div>

<br/>


<input

placeholder="Search employee..."

value={search}

onChange={(e)=>
setSearch(e.target.value)
}

style={{

width:"400px",
padding:"12px",
borderRadius:"10px",
border:"1px solid lightgray"

}}

/>


<br/><br/>


{

loading ?

<h2>Loading...</h2>

:

filteredEmployees.length===0 ?

<h2>No employees found</h2>

:

<div

style={{

display:"grid",

gridTemplateColumns:
"repeat(auto-fill,minmax(300px,1fr))",

gap:"20px"

}}

>

{

filteredEmployees.map((employee)=>(

<div

key={employee.id}

style={{

background:"white",

padding:"20px",

borderRadius:"15px",

boxShadow:
"0 4px 10px rgba(0,0,0,0.2)"

}}

>

<h2>{employee.name}</h2>

<p>📧 {employee.email}</p>

<p>🏢 {employee.department}</p>

<p>💼 {employee.position}</p>

<p>
⭐ {employee.performanceScore}
</p>


<p>

{

employee.performanceScore>=80

?

"🟢 Excellent"

:

employee.performanceScore>=50

?

"🟡 Average"

:

"🔴 Needs Improvement"

}

</p>

<br/>

<button

onClick={()=>{

setEditing(employee.id);

setFormData(employee);

}}

style={editBtn}

>

Edit

</button>


<button

onClick={()=>
deleteEmployee(employee.id)
}

style={deleteBtn}

>

Delete

</button>

</div>

))

}

</div>

}


{

editing &&

<div style={overlay}>

<div style={modal}>

<h2>Edit Employee</h2>

<br/>

<input
value={formData.name}
placeholder="Name"
onChange={(e)=>
setFormData({
...formData,
name:e.target.value
})
}
/>

<br/><br/>

<input
value={formData.email}
placeholder="Email"
onChange={(e)=>
setFormData({
...formData,
email:e.target.value
})
}
/>

<br/><br/>

<input
value={formData.department}
placeholder="Department"
onChange={(e)=>
setFormData({
...formData,
department:e.target.value
})
}
/>

<br/><br/>

<input
value={formData.position}
placeholder="Position"
onChange={(e)=>
setFormData({
...formData,
position:e.target.value
})
}
/>

<br/><br/>

<input
type="number"
value={formData.performanceScore}
placeholder="Score"
onChange={(e)=>
setFormData({
...formData,
performanceScore:e.target.value
})
}
/>

<br/><br/>

<button
onClick={updateEmployee}
style={editBtn}
>
Save
</button>

<button
onClick={()=>
setEditing(null)
}
style={deleteBtn}
>
Cancel
</button>

</div>

</div>

}

</div>

);

}


const card={

background:"white",
padding:"20px",
borderRadius:"15px",
boxShadow:"0 3px 8px gray"

};

const editBtn={

padding:"10px",
background:"#2563eb",
border:"none",
color:"white",
borderRadius:"8px",
marginRight:"10px"

};

const deleteBtn={

padding:"10px",
background:"#ef4444",
border:"none",
color:"white",
borderRadius:"8px"

};

const overlay={

position:"fixed",
top:0,
left:0,
right:0,
bottom:0,
background:"rgba(0,0,0,0.5)",
display:"flex",
justifyContent:"center",
alignItems:"center"

};

const modal={

background:"white",
padding:"30px",
borderRadius:"15px",
width:"400px"

};

export default EmployeeList;