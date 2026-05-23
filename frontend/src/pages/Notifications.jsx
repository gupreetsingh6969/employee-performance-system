import { useState } from "react";

function Notifications(){

const [notificationData] = useState([

{
id:1,
message:"Performance review deadline approaching",
type:"Reminder"
},

{
id:2,
message:"New task assigned to employee",
type:"Task"
},

{
id:3,
message:"Achievement updated successfully",
type:"Update"
}

]);

return(

<div style={{padding:"20px"}}>

<h1>
Notifications Center
</h1>

<p>
Recent system updates and reminders
</p>

<hr/>

{

notificationData.map((item)=>(

<div
key={item.id}
style={{
border:"1px solid #d1d5db",
padding:"15px",
marginBottom:"12px",
borderRadius:"8px"
}}
>

<h3>
{item.type}
</h3>

<p>
{item.message}
</p>

</div>

))

}

</div>

);

}

export default Notifications;