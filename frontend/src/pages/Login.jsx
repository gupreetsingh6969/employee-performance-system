import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(){

const [email,setEmail]=useState("");
const [password,setPassword]=useState("");

const navigate=useNavigate();

const handleLogin=(e)=>{

e.preventDefault();

if(

email==="Gagan0001@gmail.com"
&&
password==="123456"

){

localStorage.setItem(
"isLoggedIn",
"true"
);

navigate("/dashboard");

}
else{

alert(
"Invalid Email or Password"
);

}

};

return(

<div
style={{
display:"flex",
justifyContent:"center",
alignItems:"center",
height:"100vh",
background:"#f3f4f6"
}}
>

<form
onSubmit={handleLogin}
style={{
background:"white",
padding:"30px",
borderRadius:"12px",
width:"300px",
boxShadow:"0 2px 10px rgba(0,0,0,0.1)"
}}
>

<h1>
Employee Performance System
</h1>

<input
type="email"
placeholder="Enter Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
style={{
width:"100%",
padding:"12px",
marginTop:"15px"
}}
/>

<input
type="password"
placeholder="Enter Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
style={{
width:"100%",
padding:"12px",
marginTop:"15px"
}}
/>

<button
type="submit"
style={{
width:"100%",
padding:"12px",
marginTop:"20px",
border:"none",
borderRadius:"10px",
cursor:"pointer",
fontWeight:"bold"
}}
>
Login
</button>

</form>

</div>

);

}

export default Login;