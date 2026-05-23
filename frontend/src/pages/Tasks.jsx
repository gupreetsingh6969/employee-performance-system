import { useState } from "react";

function Tasks(){

const [taskList,setTaskList] = useState([]);

const [taskInfo,setTaskInfo] = useState({

title:"",
description:"",
deadline:""

});


const addTask = ()=>{

if(
!taskInfo.title ||
!taskInfo.description ||
!taskInfo.deadline
){
alert("Fill all fields");
return;
}

const newTask = {

id: Date.now(),

title: taskInfo.title,

description: taskInfo.description,

deadline: taskInfo.deadline,

status:"Pending"

};

setTaskList([

...taskList,
newTask

]);

setTaskInfo({

title:"",
description:"",
deadline:""

});

};


const changeTaskStatus = (id)=>{

const updatedTaskList = taskList.map((task)=>{

if(task.id===id){

return{

...task,
status:
task.status==="Pending"
?
"Completed"
:
"Pending"

};

}

return task;

});

setTaskList(updatedTaskList);

};


const deleteTask=(id)=>{

const filteredTasks =

taskList.filter(
(task)=>task.id!==id
);

setTaskList(filteredTasks);

};



return(

<div style={{padding:"20px"}}>

<h1>Task Management</h1>

<input
placeholder="Task Title"
value={taskInfo.title}
onChange={(e)=>
setTaskInfo({
...taskInfo,
title:e.target.value
})
}
/>

<br/><br/>

<input
placeholder="Task Description"
value={taskInfo.description}
onChange={(e)=>
setTaskInfo({
...taskInfo,
description:e.target.value
})
}
/>

<br/><br/>

<input
type="date"
value={taskInfo.deadline}
onChange={(e)=>
setTaskInfo({
...taskInfo,
deadline:e.target.value
})
}
/>

<br/><br/>

<button onClick={addTask}>
Add Task
</button>

<hr/>

<h2>Task Records</h2>

{

taskList.map((task)=>(

<div
key={task.id}
style={{
border:"1px solid gray",
padding:"15px",
margin:"10px",
borderRadius:"10px"
}}
>

<p>
Title: {task.title}
</p>

<p>
Status: {task.status}
</p>

<p>
Deadline: {task.deadline}
</p>

<button
onClick={()=>
changeTaskStatus(task.id)
}
>

Update Status

</button>

<button
onClick={()=>
deleteTask(task.id)
}
style={{
marginLeft:"10px"
}}
>

Delete

</button>

</div>

))

}

</div>

);

}

export default Tasks;