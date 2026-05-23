import { useState } from "react";

function Notifications(){

const [notificationList] = useState([

{
id:1,
title:"Performance Review",
message:"Employee performance review scheduled tomorrow"
},

{
id:2,
title:"Task Reminder",
message:"Pending task deadline approaching"
},

{
id:3,
title:"Achievement Update",
message:"New employee achievement has been recorded"
}

]);

return(

<div style={{padding:"20px"}}>

<h1>
Notification Center
</h1>

{

notificationList.map((item)=>(

<div
key={item.id}
style={{
border:"1px solid #d1d5db",
padding:"15px",
marginBottom:"15px",
borderRadius:"10px"
}}
>

<h3>{item.title}</h3>

<p>{item.message}</p>

</div>

))

}

</div>

);

}

export default Notifications;