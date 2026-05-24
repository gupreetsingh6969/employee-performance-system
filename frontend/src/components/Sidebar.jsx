import { Link } from "react-router-dom";

function Sidebar(){

const menuStyle={

textDecoration:"none",
padding:"14px",
borderRadius:"10px",
color:"#111827",
fontWeight:"bold",
display:"block"

};

return(

<div
style={{
width:"260px",
minHeight:"100vh",
background:"white",
padding:"25px",
boxShadow:"2px 0px 10px rgba(0,0,0,0.1)",
display:"flex",
flexDirection:"column"
}}
>

<h1>
EPS
</h1>

<h3
style={{
fontSize:"14px",
color:"#6b7280",
marginBottom:"30px"
}}
>
Employee Performance System
</h3>

<div
style={{
display:"flex",
flexDirection:"column",
gap:"15px"
}}
>

<Link to="/dashboard" style={menuStyle}>
📊 Dashboard
</Link>

<Link to="/ai" style={menuStyle}>
🤖 AI Recommendations
</Link>

<Link to="/notifications" style={menuStyle}>
🔔 Notifications
</Link>

<Link to="/analytics" style={menuStyle}>
📈 Analytics
</Link>

<Link to="/charts" style={menuStyle}>
📉 Charts
</Link>

<Link to="/testing" style={menuStyle}>
🧪 Testing Metrics
</Link>

</div>

<div
style={{
marginTop:"40px"
}}
>

<button
onClick={()=>{

localStorage.clear();

window.location="/";

}}
style={{
width:"100%",
padding:"14px",
border:"none",
borderRadius:"10px",
cursor:"pointer",
fontWeight:"bold"
}}
>
🚪 Logout
</button>

</div>

</div>

);

}

export default Sidebar;