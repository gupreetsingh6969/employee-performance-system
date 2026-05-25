import { useEffect, useState } from "react";
import axios from "axios";

function Notifications() {

const [notificationList,setNotificationList]=useState([]);

useEffect(()=>{

loadNotifications();

},[]);

const loadNotifications=async()=>{

try{

const token=localStorage.getItem("token");

const response=await axios.get(
"http://localhost:5000/api/employees",
{
headers:{
Authorization:`Bearer ${token}`
}
}
);

const employees=response.data || [];

const notifications=[];

employees.forEach((employee)=>{

if(employee.performanceScore<60){

notifications.push({

id:employee.id,
message:`${employee.name} needs training`,
time:"Today"

});

}

if(employee.feedback){

notifications.push({

id:`feedback-${employee.id}`,
message:`Feedback updated for ${employee.name}`,
time:"Today"

});

}

});

setNotificationList(notifications);

}
catch(error){

console.log(error);

}

};

return(

<div style={{padding:"20px"}}>

<h1>Notifications</h1>

<br/>

{notificationList.length===0 ? (

<h3>No Notifications</h3>

) : (

notificationList.map((item)=>(

<div
key={item.id}
style={{
border:"1px solid #d1d5db",
padding:"15px",
marginBottom:"15px",
borderRadius:"10px",
background:"#f9fafb"
}}
>

<h3>{item.message}</h3>

<p>Time: {item.time}</p>

</div>

))

)}

</div>

);

}

export default Notifications;