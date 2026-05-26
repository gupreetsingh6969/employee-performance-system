import { useEffect,useState } from "react";
import axios from "axios";

function Tasks(){

const [taskList,setTaskList]=useState([]);

const [task,setTask]=useState({

title:"",
description:"",
employeeId:"",
deadline:"",
priority:"Medium"

});


useEffect(()=>{

loadTasks();

},[]);


const loadTasks=async()=>{

try{

const token=localStorage.getItem("token");

const response =
await axios.get(
`${import.meta.env.VITE_API_URL}/employees`,
{
headers:{
Authorization:`Bearer ${token}`
}
}
);

setTaskList(response.data.data || []);

}
catch(error){

console.log(
"Task Load Error:",
error
);

}

};


const assignTask=async()=>{

try{

const token=localStorage.getItem("token");

await axios.post(
`${API_URL}/tasks`,

task,

{
headers:{
Authorization:`Bearer ${token}`
}
}

);

loadTasks();

setTask({

title:"",
description:"",
employeeId:"",
deadline:"",
priority:"Medium"

});

}
catch(error){

console.log(
"Task Create Error:",
error
);

}

};


return(

<div style={{
padding:"20px",
background:"#f3f4f6",
minHeight:"100vh"
}}>

<h1>

Task Management

</h1>

<br/>


<input
placeholder="Task Title"
value={task.title}
onChange={(e)=>
setTask({
...task,
title:e.target.value
})
}
style={{
padding:"8px",
width:"250px"
}}
/>

<br/><br/>


<input
placeholder="Description"
value={task.description}
onChange={(e)=>
setTask({
...task,
description:e.target.value
})
}
style={{
padding:"8px",
width:"250px"
}}
/>

<br/><br/>


<input
placeholder="Employee ID"
value={task.employeeId}
onChange={(e)=>
setTask({
...task,
employeeId:e.target.value
})
}
style={{
padding:"8px",
width:"250px"
}}
/>

<br/><br/>


<input
type="date"
value={task.deadline}
onChange={(e)=>
setTask({
...task,
deadline:e.target.value
})
}
style={{
padding:"8px"
}}
/>

<br/><br/>


<select
value={task.priority}
onChange={(e)=>
setTask({
...task,
priority:e.target.value
})
}
style={{
padding:"8px"
}}
>

<option value="High">
High Priority
</option>

<option value="Medium">
Medium Priority
</option>

<option value="Low">
Low Priority
</option>

</select>

<br/><br/>


<button
onClick={assignTask}
style={{
padding:"10px",
cursor:"pointer"
}}
>

Assign Task

</button>

<hr/>

{

taskList.map((task)=>(

<div
key={task.id}
style={{
background:"white",
padding:"20px",
borderRadius:"12px",
marginTop:"20px",
boxShadow:"0 2px 10px rgba(0,0,0,0.1)"
}}
>

<h2>

{task.title}

</h2>

<p>

{task.description}

</p>

<p>

Status:
<b> {task.status}</b>

</p>

<p>

⭐ Priority:
<b> {task.priority || "Medium"}</b>

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

🟢 {task.daysRemaining || 0} Days Left

</p>

}


<p>

Employee:
<b> {task.employee?.name || "Not Assigned"}</b>

</p>

</div>

))

}

</div>

);

}

export default Tasks;