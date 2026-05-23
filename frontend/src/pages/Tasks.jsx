import { useState } from "react";

function Tasks(){

const [taskInfo,setTaskInfo] = useState({

title:"",
description:"",
deadline:""

});

const [taskRecords,setTaskRecords] = useState([]);


const createTask=()=>{

if(
!taskInfo.title ||
!taskInfo.description
){

alert("Fill all fields");

return;

}

const newTask={

id:Date.now(),

title:taskInfo.title,

description:taskInfo.description,

deadline:taskInfo.deadline,

status:"Pending"

};

setTaskRecords([

...taskRecords,
newTask

]);

setTaskInfo({

title:"",
description:"",
deadline:""

});

};


const updateTaskStatus=(taskId)=>{

const updatedTasks=

taskRecords.map((task)=>{

if(task.id===taskId){

return{

...task,

status:
task.status==="Pending"
? "Completed"
: "Pending"

};

}

return task;

});

setTaskRecords(updatedTasks);

};


const removeTask=(taskId)=>{

const remainingTasks=

taskRecords.filter(

(task)=>task.id!==taskId

);

setTaskRecords(remainingTasks);

};



return(

<div style={{padding:"20px"}}>

<h1>Task Management</h1>

<input
type="text"
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
type="text"
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

<button
onClick={createTask}
>

Add Task

</button>

<hr/>

<h2>Task Records</h2>

{

taskRecords.map((task)=>(

<div
key={task.id}
style={{

border:"1px solid gray",
padding:"15px",
marginBottom:"10px"

}}
>

<h3>{task.title}</h3>

<p>{task.description}</p>

<p>
Deadline: {task.deadline}
</p>

<p>
Status: {task.status}
</p>

<button
onClick={()=>
updateTaskStatus(task.id)
}
>

Update Status

</button>

<button
style={{
marginLeft:"10px"
}}
onClick={()=>
removeTask(task.id)
}
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