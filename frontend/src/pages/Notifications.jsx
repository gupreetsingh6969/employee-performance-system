import { useEffect, useState } from "react";
import axios from "axios";

function Notifications() {

const [notificationList, setNotificationList] = useState([]);

useEffect(() => {

const fetchNotifications = async () => {

try{

const response = await axios.get(
"https://employee-performance-system-production-2fc6.up.railway.app/api/notifications"
);

setNotificationList(
response.data.notifications
);

}
catch(error){

console.log(error);

}

};

fetchNotifications();

}, []);

return(

<div style={{padding:"20px"}}>

<h1>
Notifications
</h1>

<br/>

{

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

<h3>
{item.message}
</h3>

<p>
Time: {item.time}
</p>

</div>

))

}

</div>

);

}

export default Notifications;