import { useState, useEffect } from "react";
import api from "../services/api";

function Tasks() {

const [tasks,setTasks]=useState([]);
const [title,setTitle]=useState("");
const [description,setDescription]=useState("");
const [deadline,setDeadline]=useState("");

useEffect(()=>{

loadTasks();

},[]);

const loadTasks=async()=>{

try{

const response=await api.get("/tasks");

setTasks(response.data);

}catch(error){

console.log(error);

}

};

const createTask=async()=>{

try{

await api.post("/tasks",{

title,
description,
deadline

});

alert("Task Added");

setTitle("");
setDescription("");
setDeadline("");

loadTasks();

}catch(error){

console.log(error);

alert("Task creation failed");

}

};

const updateStatus=async(id,status)=>{

try{

await api.put(`/tasks/${id}`,{

status

});

loadTasks();

}catch(error){

console.log(error);

}

};

return(

<div style={{padding:"20px"}}>

<h1>Task Management</h1>

<input
type="text"
placeholder="Task Title"
value={title}
onChange={(e)=>setTitle(e.target.value)}
/>

<br/><br/>

<input
type="text"
placeholder="Description"
value={description}
onChange={(e)=>setDescription(e.target.value)}
/>

<br/><br/>

<input
type="date"
value={deadline}
onChange={(e)=>setDeadline(e.target.value)}
/>

<br/><br/>

<button onClick={createTask}>
Add Task
</button>

<hr/>

<h2>Task List</h2>

{

tasks.map((task)=>(

<div
key={task.id}
style={{
border:"1px solid lightgray",
padding:"10px",
margin:"10px"
}}
>

<p><b>Title:</b> {task.title}</p>

<p><b>Description:</b> {task.description}</p>

<p><b>Status:</b> {task.status}</p>

<p><b>Deadline:</b> {task.deadline}</p>

<button
onClick={()=>
updateStatus(
task.id,
"Completed"
)
}
>

Mark Complete

</button>

</div>

))

}

</div>

);

}

export default Tasks;