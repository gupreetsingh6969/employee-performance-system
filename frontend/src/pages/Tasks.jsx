import { useState, useEffect } from "react";

function Tasks() {

const [tasks,setTasks]=useState([]);
const [title,setTitle]=useState("");
const [description,setDescription]=useState("");
const [deadline,setDeadline]=useState("");

useEffect(()=>{

const savedTasks=
JSON.parse(
localStorage.getItem("tasks")
) || [];

setTasks(savedTasks);

},[]);

const createTask=()=>{

if(!title || !description) return;

const newTask={

id:Date.now(),
title,
description,
deadline,
status:"Pending"

};

const updatedTasks=[

...tasks,
newTask

];

setTasks(updatedTasks);

localStorage.setItem(
"tasks",
JSON.stringify(updatedTasks)
);

setTitle("");
setDescription("");
setDeadline("");

alert("Task Added");

};

const updateStatus=(id)=>{

const updatedTasks=
tasks.map((task)=>

task.id===id
? {...task,status:"Completed"}
: task

);

setTasks(updatedTasks);

localStorage.setItem(
"tasks",
JSON.stringify(updatedTasks)
);

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
updateStatus(task.id)
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