import Sidebar from "../components/Sidebar";

function Notifications(){

const notifications=[

"Performance report generated",
"AI recommendations available",
"New employee added",
"Training session scheduled"

];

return(

<div
style={{
display:"flex",
background:"#f3f4f6",
minHeight:"100vh"
}}
>

<Sidebar/>

<div
style={{
padding:"30px",
width:"100%"
}}
>

<h1>
Notifications
</h1>

<div
style={{
marginTop:"20px"
}}
>

{

notifications.map((item,index)=>(

<div
key={index}
style={{
background:"white",
padding:"15px",
marginBottom:"15px",
borderRadius:"10px"
}}
>

🔔 {item}

</div>

))

}

</div>

</div>

</div>

);

}

export default Notifications;


