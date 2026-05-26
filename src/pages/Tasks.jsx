import { useEffect,useState } from "react";
import axios from "axios";

function Tasks(){

const [taskList,setTaskList]=useState([]);

useEffect(()=>{

loadTasks();

},[]);


const loadTasks=async()=>{

try{

const token=
localStorage.getItem("token");

const response=
await axios.get(

"import.meta.env.VITE_API_URL/tasks",
{
headers:{
Authorization:`Bearer ${token}`
}
}

);

setTaskList(
response.data.data
);

}
catch(error){

console.log(error);

}

};


return(

<div style={{padding:"20px"}}>

<h1>

Task Management

</h1>

<br/>

{

taskList.map((task)=>(

<div
key={task.id}
style={{
border:"1px solid #d1d5db",
padding:"15px",
marginBottom:"10px",
borderRadius:"10px",
background:"white"
}}
>

<h3>

{task.title}

</h3>

<p>

Status:
{task.status}

</p>


<p>

⭐ Priority:
{task.priority}

</p>


{

task.isOverdue ?

<p style={{color:"red"}}>

🔴 Overdue

</p>

:

task.dueTomorrow ?

<p style={{color:"orange"}}>

🟡 Due Tomorrow

</p>

:

<p style={{color:"green"}}>

🟢 {task.daysRemaining} Days Left

</p>

}


<p>

Employee:
{task.employee?.name}

</p>

</div>

))

}

</div>

);

}

export default Tasks;

