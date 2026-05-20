import { useEffect, useState } from "react";
import api from "../services/api";

function Tasks() {

const [tasks, setTasks] = useState([]);
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [editId, setEditId] = useState(null);

useEffect(() => {
fetchTasks();
}, []);

const fetchTasks = async () => {

try{

const response = await api.get("/tasks");

setTasks(response.data);

}catch(error){

console.log("Fetch Error:", error);

}

};

const saveTask = async()=>{

try{

if(title.trim()===""){

alert("Task title required");

return;

}

if(description.trim()===""){

alert("Task description required");

return;

}

if(editId){

await api.put(`/tasks/${editId}`,{
title,
description
});

setEditId(null);

}else{

await api.post("/tasks",{
title,
description,
status:"Pending"
});

}

setTitle("");
setDescription("");

fetchTasks();

}catch(error){

console.log("Save Error:", error);

}

};

const deleteTask=async(id)=>{

try{

await api.delete(`/tasks/${id}`);

fetchTasks();

}catch(error){

console.log(error);

}

};

const editTask=(task)=>{

setTitle(task.title);
setDescription(task.description);

setEditId(task.id);

};

const changeStatus=async(task)=>{

try{

await api.put(`/tasks/${task.id}`,{

title:task.title,
description:task.description,

status:
task.status==="Pending"
? "Completed"
: "Pending"

});

fetchTasks();

}catch(error){

console.log(error);

}

};

return(

<div>

<h1>Tasks Page</h1>

<input
type="text"
placeholder="Task Title"
value={title}
onChange={(e)=>setTitle(e.target.value)}
/>

<br/><br/>

<input
type="text"
placeholder="Task Description"
value={description}
onChange={(e)=>setDescription(e.target.value)}
/>

<br/><br/>

<button onClick={saveTask}>
{editId ? "Update Task" : "Add Task"}
</button>

<hr/>

{

tasks.map((task)=>(

<div
key={task.id}
style={{
border:"1px solid gray",
padding:"10px",
margin:"10px"
}}
>

<h3>{task.title}</h3>

<p>{task.description}</p>

<p>
Status:
<b> {task.status}</b>
</p>

<button
onClick={()=>editTask(task)}
>
Edit
</button>

{" "}

<button
onClick={()=>deleteTask(task.id)}
>
Delete
</button>

{" "}

<button
onClick={()=>changeStatus(task)}
>

{task.status==="Pending"
? "Mark Complete"
: "Mark Pending"}

</button>

</div>

))

}

</div>

);

}

export default Tasks;