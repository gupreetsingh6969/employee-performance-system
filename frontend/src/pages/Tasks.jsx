import { useState } from "react";

function Tasks(){

const [taskList,setTaskList]=useState([

{
id:1,
title:"Performance Evaluation",
status:"Pending"
},

{
id:2,
title:"Training Session",
status:"Completed"
}

]);

const addTask=()=>{

const newTask={

id:Date.now(),
title:"New Employee Task",
status:"Pending"

};

setTaskList([...taskList,newTask]);

};


return(

<div style={{padding:"20px"}}>

<h1>
Task Management
</h1>

<br/>

<button
onClick={addTask}
style={{
padding:"10px",
cursor:"pointer"
}}
>
Add Task
</button>

<br/><br/>

{

taskList.map((task)=>(

<div
key={task.id}
style={{
border:"1px solid #d1d5db",
padding:"15px",
marginBottom:"10px",
borderRadius:"10px"
}}
>

<h3>{task.title}</h3>

<p>Status: {task.status}</p>

</div>

))

}

</div>

);

}

export default Tasks;