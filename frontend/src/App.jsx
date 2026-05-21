import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Notifications from "./pages/Notifications";
import AIRecommendations from "./pages/AIRecommendations";
import Employee from "./pages/Employee";
import Tasks from "./pages/Tasks";
import Performance from "./pages/Performance";
import Achievements from "./pages/Achievements";

function App() {

const handleLogout=()=>{

localStorage.removeItem("token");

window.location.href="/";

};

return (

<BrowserRouter>

<div
style={{
display:"flex",
minHeight:"100vh"
}}
>

<div
style={{
width:"250px",
background:"#1e293b",
color:"white",
padding:"20px"
}}
>

<div
style={{
marginBottom:"20px"
}}
>

<h2>EPS System</h2>

<button
onClick={handleLogout}
style={{
padding:"10px",
width:"100%",
marginTop:"10px",
cursor:"pointer"
}}
>
Logout
</button>

</div>

<div
style={{
display:"flex",
flexDirection:"column",
gap:"15px"
}}
>

<Link style={{color:"white"}} to="/">Login</Link>

<Link style={{color:"white"}} to="/signup">Signup</Link>

<Link style={{color:"white"}} to="/dashboard">Dashboard</Link>

<Link style={{color:"white"}} to="/employees">Employees</Link>

<Link style={{color:"white"}} to="/tasks">Tasks</Link>

<Link style={{color:"white"}} to="/performance">Performance</Link>

<Link style={{color:"white"}} to="/notifications">Notifications</Link>

<Link style={{color:"white"}} to="/ai">AI Recommendations</Link>

<Link style={{color:"white"}} to="/achievements">Achievements</Link>

</div>

</div>

<div
style={{
flex:1,
padding:"20px"
}}
>

<Routes>

<Route path="/" element={<Login />} />

<Route path="/signup" element={<Signup />} />

<Route path="/dashboard" element={<Dashboard />} />

<Route path="/notifications" element={<Notifications />} />

<Route path="/ai" element={<AIRecommendations />} />

<Route path="/employees" element={<Employee />} />

<Route path="/tasks" element={<Tasks />} />

<Route path="/performance" element={<Performance />} />

<Route path="/achievements" element={<Achievements />} />

</Routes>

</div>

</div>

</BrowserRouter>

);

}

export default App;