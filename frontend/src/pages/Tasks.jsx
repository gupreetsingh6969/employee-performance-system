import {useEffect,useState} from "react";
import axios from "axios";

function Tasks(){

const [taskList,setTaskList]=useState([]);
const [employees,setEmployees]=useState([]);

const [search,setSearch]=useState("");
const [filter,setFilter]=useState("All");
const [currentPage,setCurrentPage]=useState(1);

const tasksPerPage=5;

const [taskData,setTaskData]=useState({

title:"",
description:"",
employeeId:"",
deadline:"",
priority:"Medium"

});

const token=
localStorage.getItem("token");


useEffect(()=>{

loadTasks();
loadEmployees();

},[]);



const loadEmployees=async()=>{

try{

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

};



const loadTasks=async()=>{

try{

const response=
await axios.get(

"http://localhost:5000/api/tasks",

{
headers:{
Authorization:`Bearer ${token}`
}
}

);

setTaskList(

response.data.data ||
response.data ||
[]

);

}
catch(error){

console.log(error);

}

};



const addTask=async()=>{

try{

await axios.post(

"http://localhost:5000/api/tasks",

taskData,

{
headers:{
Authorization:`Bearer ${token}`
}
}

);

alert(
"Task Assigned Successfully"
);

setTaskData({

title:"",
description:"",
employeeId:"",
deadline:"",
priority:"Medium"

});

loadTasks();

}
catch(error){

console.log(error);

alert(
error.response?.data?.message
);

}

};



const completeTask=async(id)=>{

try{

await axios.put(

`http://localhost:5000/api/tasks/${id}`,

{
status:"Completed"
},

{
headers:{
Authorization:`Bearer ${token}`
}
}

);

loadTasks();

}
catch(error){

console.log(error);

}

};



const deleteTask=async(id)=>{

try{

await axios.delete(

`http://localhost:5000/api/tasks/${id}`,

{
headers:{
Authorization:`Bearer ${token}`
}
}

);

loadTasks();

}
catch(error){

console.log(error);

}

};




const filteredTasks=

taskList

.filter(task=>

task.title
?.toLowerCase()
.includes(
search.toLowerCase()
)

)

.filter(task=>

filter==="All"

?

true

:

task.status===filter

);



const completed=

taskList.filter(

t=>t.status==="Completed"

).length;



const pending=

taskList.length-completed;



const highPriority=

taskList.filter(
t=>t.priority==="High"
).length;



const overdue=

taskList.filter(

t=>

new Date(
t.deadline
)

<

new Date()

&&

t.status!=="Completed"

).length;



const lastIndex=

currentPage*tasksPerPage;


const firstIndex=

lastIndex-tasksPerPage;


const currentTasks=

filteredTasks.slice(
firstIndex,
lastIndex
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
📋 Smart Task Management
</h1>

<br/>


<div
style={{

display:"grid",
gridTemplateColumns:
"repeat(auto-fit,minmax(180px,1fr))",

gap:"15px"

}}
>

{
[
["Total",taskList.length],
["Completed",completed],
["Pending",pending],
["High Priority",highPriority],
["Overdue",overdue]
]

.map((item,index)=>(

<div

key={index}

style={{

background:"white",
padding:"20px",
borderRadius:"15px",
boxShadow:"0 3px 8px gray"

}}

>

<h3>
{item[0]}
</h3>

<h1>
{item[1]}
</h1>

</div>

))

}

</div>


<br/>


<div
style={{

background:"white",
padding:"20px",
borderRadius:"15px"

}}
>

<h2>
Assign Task
</h2>

<br/>


<input

placeholder="Task title"

value={taskData.title}

onChange={(e)=>

setTaskData({

...taskData,

title:e.target.value

})

}

/>

<br/><br/>


<textarea

placeholder="Description"

value={taskData.description}

onChange={(e)=>

setTaskData({

...taskData,

description:e.target.value

})

}

/>

<br/><br/>


<select

value={taskData.employeeId}

onChange={(e)=>

setTaskData({

...taskData,

employeeId:e.target.value

})

}

>

<option>
Select Employee
</option>

{

employees.map(emp=>(

<option

key={emp.id}

value={emp.id}

>

{emp.name}

</option>

))

}

</select>


<br/><br/>


<input

type="date"

value={taskData.deadline}

onChange={(e)=>

setTaskData({

...taskData,

deadline:e.target.value

})

}

/>


<br/><br/>


<select

value={taskData.priority}

onChange={(e)=>

setTaskData({

...taskData,

priority:e.target.value

})

}

>

<option>
High
</option>

<option>
Medium
</option>

<option>
Low
</option>

</select>


<br/><br/>


<button

onClick={addTask}

style={{

padding:"12px",
background:"#2563eb",
color:"white",
border:"none",
borderRadius:"10px",
cursor:"pointer"

}}

>

Assign Task

</button>

</div>



<br/>


<input

placeholder="Search Tasks"

value={search}

onChange={(e)=>

setSearch(
e.target.value
)

}

/>


<select

value={filter}

onChange={(e)=>

setFilter(
e.target.value
)

}

>

<option>
All
</option>

<option>
Pending
</option>

<option>
Completed
</option>

</select>


<br/><br/>


{

currentTasks.map(task=>(

<div

key={task.id}

style={{

background:"white",
padding:"20px",
marginBottom:"15px",
borderRadius:"15px"

}}

>

<h3>
{task.title}
</h3>

<p>
{task.description}
</p>

<p>
👤 {task.employee?.name}
</p>

<p>
⭐ {task.priority}
</p>


<span

style={{

padding:"5px",
borderRadius:"8px",

background:

task.status==="Completed"

?

"#dcfce7"

:

"#fef3c7"

}}

>

{task.status}

</span>


<br/><br/>


<button

onClick={()=>
completeTask(
task.id
)
}

>

Complete

</button>

{" "}


<button

onClick={()=>
deleteTask(
task.id
)
}

>

Delete

</button>

</div>

))

}



<div>

{

Array.from({

length:

Math.ceil(

filteredTasks.length/

tasksPerPage

)

})

.map((_,index)=>(

<button

key={index}

onClick={()=>

setCurrentPage(
index+1
)

}

>

{index+1}

</button>

))

}

</div>


</div>

);

}

export default Tasks;