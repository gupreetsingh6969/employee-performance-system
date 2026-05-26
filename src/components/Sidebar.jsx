import { Link } from "react-router-dom";

function Sidebar(){

const role=localStorage.getItem("role");

return(

<div
style={{
width:"260px",
minHeight:"100vh",
background:"#1e293b",
padding:"25px",
color:"white",
flexShrink:0
}}
>

<h2>EPS</h2>

<p
style={{
fontSize:"14px",
marginBottom:"30px"
}}
>
Employee Performance System
</p>

<div
style={{
display:"flex",
flexDirection:"column",
gap:"15px"
}}
>

<Link
to="/dashboard"
style={{
color:"white",
textDecoration:"none"
}}
>
📊 Dashboard
</Link>

{(role==="HR" || role==="ADMIN") && (

<Link
to="/employees"
style={{
color:"white",
textDecoration:"none"
}}
>
👨‍💼 Employees
</Link>

)}

<Link
to="/ai"
style={{
color:"white",
textDecoration:"none"
}}
>
🤖 AI Recommendations
</Link>

<Link
to="/notifications"
style={{
color:"white",
textDecoration:"none"
}}
>
🔔 Notifications
</Link>

{(role==="MANAGER" || role==="ADMIN") && (

<Link
to="/analytics"
style={{
color:"white",
textDecoration:"none"
}}
>
📈 Analytics
</Link>

)}

<Link
to="/testing"
style={{
color:"white",
textDecoration:"none"
}}
>
🧪 Testing
</Link>

</div>

<button
onClick={()=>{

localStorage.clear();
window.location="/";

}}
style={{
marginTop:"40px",
width:"100%",
padding:"12px",
border:"none",
borderRadius:"8px",
cursor:"pointer"
}}
>
Logout
</button>

</div>

);

}

export default Sidebar;


