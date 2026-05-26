import { Link, useNavigate } from "react-router-dom";

function Navbar() {

const navigate = useNavigate();

const handleLogout = () => {

localStorage.removeItem("token");

navigate("/");

};

return (

<div
style={{
background:"#333",
padding:"15px",
display:"flex",
justifyContent:"center",
gap:"20px"
}}
>

<Link
to="/dashboard"
style={{
color:"white",
textDecoration:"none"
}}
>
Dashboard
</Link>

<Link
to="/employees"
style={{
color:"white",
textDecoration:"none"
}}
>
Employees
</Link>

<Link
to="/tasks"
style={{
color:"white",
textDecoration:"none"
}}
>
Tasks
</Link>

<Link
to="/performance"
style={{
color:"white",
textDecoration:"none"
}}
>
Performance
</Link>

<button
onClick={handleLogout}
style={{
background:"transparent",
border:"none",
color:"red",
cursor:"pointer",
fontSize:"16px"
}}
>
Logout
</button>

</div>

);

}

export default Navbar;



