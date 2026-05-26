import { useEffect,useState } from "react";
import axios from "axios";

function Notifications(){

const [notificationList,setNotificationList]=
useState([]);

const [loading,setLoading]=
useState(false);


useEffect(()=>{

loadNotifications();

const interval=
setInterval(
loadNotifications,
10000
);

return()=>clearInterval(interval);

},[]);



const loadNotifications=async()=>{

try{

setLoading(true);

const token=
localStorage.getItem("token");

const response=
await axios.get(

"http://localhost:5000/api/notifications",

{
headers:{
Authorization:`Bearer ${token}`
}
}

);

const data=
(response.data.data || []).map(
(item,index)=>({

...item,
id:index,
read:false,
time:new Date().toLocaleTimeString()

})
);

setNotificationList(data);

}
catch(error){

console.log(error);

}
finally{

setLoading(false);

}

};


const markRead=(id)=>{

setNotificationList(

notificationList.map(item=>

item.id===id

?

{
...item,
read:true
}

:

item

)

);

};


const markAllRead=()=>{

setNotificationList(

notificationList.map(item=>({

...item,
read:true

}))

);

};


const clearAll=()=>{

setNotificationList([]);

};


const unread=

notificationList.filter(
n=>!n.read
).length;


return(

<div
style={{
padding:"30px",
background:"#f3f4f6",
minHeight:"100vh"
}}
>

<div
style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center"
}}
>

<h1>

🔔 Notifications

<span
style={{
fontSize:"18px",
color:"#ef4444"
}}
>

({unread} unread)

</span>

</h1>


<div
style={{
display:"flex",
gap:"10px"
}}
>

<button
onClick={loadNotifications}
style={buttonStyle}
>

{
loading
?
"Loading..."
:
"Refresh"
}

</button>


<button
onClick={markAllRead}
style={{
...buttonStyle,
background:"#22c55e"
}}
>

Mark All Read

</button>


<button
onClick={clearAll}
style={{
...buttonStyle,
background:"#ef4444"
}}
>

Clear All

</button>

</div>

</div>


<br/>


<div
style={{
display:"flex",
gap:"20px",
marginBottom:"20px"
}}
>

<div style={cardStyle}>
Total
<h2>
{notificationList.length}
</h2>
</div>


<div style={cardStyle}>
Unread
<h2>
{unread}
</h2>
</div>


<div style={cardStyle}>
Read
<h2>
{
notificationList.length-unread
}
</h2>
</div>

</div>



{

notificationList.map(item=>(

<div

key={item.id}

style={{

background:
item.read
?
"#e5e7eb"
:
"white",

padding:"20px",

marginBottom:"15px",

borderRadius:"15px",

borderLeft:

item.message
.toLowerCase()
.includes("overdue")

?

"6px solid red"

:

item.message
.toLowerCase()
.includes("completed")

?

"6px solid green"

:

"6px solid #2563eb",

boxShadow:
"0px 4px 12px rgba(0,0,0,0.1)",

cursor:"pointer"

}}

onClick={()=>
markRead(item.id)
}

>

<h3>

{
item.read
?
"✓"
:
"🔔"
}

{" "}

{item.message}

</h3>


<p
style={{
color:"gray"
}}
>

🕒 {item.time}

</p>

</div>

))

}

</div>

);

}


const buttonStyle={

padding:"10px 15px",
border:"none",
borderRadius:"10px",
background:"#2563eb",
color:"white",
cursor:"pointer"

};


const cardStyle={

background:"white",
padding:"15px",
width:"180px",
borderRadius:"15px",
boxShadow:"0px 4px 10px rgba(0,0,0,0.1)"

};


export default Notifications;