import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login(){

const [email,setEmail]=useState("");
const [password,setPassword]=useState("");

const navigate=useNavigate();

const handleLogin=async(e)=>{

e.preventDefault();

try{

const response=
await axios.post(
"http://localhost:5000/api/auth/login",
{
email,
password
}
);

localStorage.setItem(
"token",
response.data.token
);

localStorage.setItem(
"isLoggedIn",
"true"
);

navigate("/dashboard");

}
catch(error){

alert(
"Invalid Email or Password"
);

console.log(error);

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