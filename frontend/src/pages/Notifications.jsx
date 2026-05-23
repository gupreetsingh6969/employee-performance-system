import { useState, useEffect } from "react";

function Notifications(){

const [notificationData,setNotificationData] = useState([]);

const loadNotifications = ()=>{

setNotificationData([

{
id:1,
title:"Performance Review Reminder",
message:"Quarterly evaluation deadline is approaching",
status:"Pending"
},

{
id:2,
title:"Feedback Update",
message:"New feedback added for employee records",
status:"Completed"
},

{
id:3,
title:"Training Recommendation",
message:"AI recommends technical skill training",
status:"New"
}

]);

};


useEffect(()=>{

loadNotifications();

},[]);


return(

<div style={{padding:"20px"}}>

<h1>
Notifications Center
</h1>

<br/>

{

notificationData.map((item)=>(

<div
key={item.id}
style={{
border:"1px solid gray",
padding:"15px",
marginBottom:"10px",
borderRadius:"10px"
}}
>

<h3>
{item.title}
</h3>

<p>
{item.message}
</p>

<p>

Status:
<b>
 {item.status}
</b>

</p>

</div>

))

}

</div>

);

}

export default Notifications;