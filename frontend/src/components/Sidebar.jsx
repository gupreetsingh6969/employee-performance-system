import { Link,useLocation } from "react-router-dom";

function Sidebar(){

const location=useLocation();

const role=
localStorage.getItem("role") || "EMPLOYEE";

const user=
JSON.parse(
localStorage.getItem("user")
) || {};


const menu=[

{
name:"Dashboard",
path:"/dashboard",
icon:"📊"
},

{
name:"Employees",
path:"/employees",
icon:"👨‍💼",
roles:["HR","MANAGER"]
},

{
name:"Add Employee",
path:"/add-employee",
icon:"➕",
roles:["HR"]
},

{
name:"Tasks",
path:"/tasks",
icon:"📝",
roles:["HR","MANAGER","EMPLOYEE"]
},

{
name:"AI Recommendation",
path:"/ai",
icon:"🤖",
roles:["HR","MANAGER"]
},

{
name:"Analytics",
path:"/analytics",
icon:"📈",
roles:["HR","MANAGER"]
},

{
name:"Reports",
path:"/reports",
icon:"📄",
roles:["HR","MANAGER"]
},

{
name:"Feedback",
path:"/feedback",
icon:"💬",
roles:["HR","MANAGER","EMPLOYEE"]
},

{
name:"Notifications",
path:"/notifications",
icon:"🔔",
badge:"3"
},

{
name:"Charts",
path:"/charts",
icon:"📉",
roles:["HR","MANAGER"]
},

{
name:"Testing",
path:"/testing",
icon:"🧪",
roles:["HR"]
}

];


const filteredMenu=

menu.filter(

item=>

!item.roles ||

item.roles.includes(role)

);


return(

<div
style={{

width:"290px",
minHeight:"100vh",

background:
"linear-gradient(180deg,#172554,#1e3a8a,#2563eb)",

padding:"25px",

display:"flex",
flexDirection:"column",

color:"white",

boxShadow:
"4px 0px 20px rgba(0,0,0,0.3)"

}}
>


<div
style={{

textAlign:"center",
marginBottom:"30px"

}}
>

<div
style={{

width:"85px",
height:"85px",

borderRadius:"50%",

background:"white",

margin:"auto",

display:"flex",
alignItems:"center",
justifyContent:"center",

fontSize:"40px"

}}
>

👤

</div>


<h2
style={{
marginTop:"15px"
}}
>

{user.name || "Guest User"}

</h2>


<p
style={{
fontSize:"13px",
opacity:"0.8"
}}
>

{role}

</p>

</div>


<hr
style={{
opacity:"0.2"
}}
/>


<div
style={{

marginTop:"20px",

display:"flex",
flexDirection:"column",

gap:"8px"

}}
>

{

filteredMenu.map((item,index)=>(

<Link

key={index}

to={item.path}

style={{

display:"flex",

alignItems:"center",

justifyContent:"space-between",

padding:"14px",

borderRadius:"14px",

textDecoration:"none",

fontWeight:"bold",

color:"white",

background:

location.pathname===item.path

?

"rgba(255,255,255,0.25)"

:

"transparent",

boxShadow:

location.pathname===item.path

?

"0px 0px 15px rgba(255,255,255,0.25)"

:

"none",

transition:"0.3s"

}}

>

<div
style={{

display:"flex",

alignItems:"center",

gap:"12px"

}}
>

<span
style={{

fontSize:"22px",

width:"30px",

display:"flex",

justifyContent:"center"

}}
>

{item.icon}

</span>


<span>

{item.name}

</span>

</div>


{

item.badge &&

<div
style={{

background:"#ef4444",

padding:"4px 10px",

borderRadius:"20px",

fontSize:"12px"

}}
>

{item.badge}

</div>

}

</Link>

))

}

</div>



<div
style={{
marginTop:"auto"
}}
>

<div
style={{

background:
"rgba(255,255,255,0.15)",

padding:"15px",

borderRadius:"15px",

marginBottom:"15px"

}}
>

<h4>

Today's Progress

</h4>


<div
style={{

height:"10px",

background:"white",

borderRadius:"20px"

}}
>

<div
style={{

height:"100%",

width:"80%",

background:"#22c55e",

borderRadius:"20px"

}}
>

</div>

</div>


<p
style={{
marginTop:"10px"
}}
>

80% Completed

</p>

</div>



<button

onClick={()=>{

localStorage.clear();

window.location="/login";

}}

style={{

width:"100%",

padding:"14px",

border:"none",

borderRadius:"14px",

background:"#ef4444",

fontWeight:"bold",

color:"white",

cursor:"pointer"

}}

>

🚪 Logout

</button>


<p
style={{

marginTop:"15px",

fontSize:"11px",

textAlign:"center",

opacity:"0.7"

}}
>

Employee Performance System v1.0

</p>

</div>

</div>

);

}

export default Sidebar;
