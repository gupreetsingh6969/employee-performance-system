import { useEffect, useState } from "react";

function Notifications() {

const [notifications, setNotifications] = useState([]);

useEffect(() => {

const employees =
JSON.parse(
localStorage.getItem("employees")
) || [];

const tasks =
JSON.parse(
localStorage.getItem("tasks")
) || [];

const reviews =
JSON.parse(
localStorage.getItem("reviews")
) || [];

let generatedNotifications = [];

if(employees.length>0){

generatedNotifications.push({
id:1,
title:"Employees Update",
message:`${employees.length} employees available`,
createdAt:new Date()
});

}

if(tasks.length>0){

generatedNotifications.push({
id:2,
title:"Tasks Update",
message:`${tasks.length} tasks created`,
createdAt:new Date()
});

}

if(reviews.length>0){

generatedNotifications.push({
id:3,
title:"Performance Update",
message:`${reviews.length} reviews submitted`,
createdAt:new Date()
});

}

setNotifications(generatedNotifications);

},[]);

return(

<div style={{padding:"20px"}}>

<h1 style={{textAlign:"center"}}>
Notifications
</h1>

{

notifications.length===0 ?

<h3>No notifications available</h3>

:

notifications.map((item)=>(

<div
key={item.id}
style={{
border:"1px solid lightgray",
padding:"15px",
margin:"15px",
borderRadius:"10px"
}}
>

<h3>{item.title}</h3>

<p>{item.message}</p>

<small>
{new Date(
item.createdAt
).toLocaleDateString()}
</small>

</div>

))

}

</div>

);

}

export default Notifications;