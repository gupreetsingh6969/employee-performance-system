import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login(){

const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [showPassword,setShowPassword]=useState(false);

const navigate=useNavigate();

const handleLogin=async(e)=>{

e.preventDefault();

try{

const response=
await axios.post(
"import.meta.env.VITE_API_URL/auth/login",
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

localStorage.setItem(
"role",
response.data.role.toUpperCase()
);

navigate("/dashboard");

}
catch(error){

alert("Invalid Email or Password");

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
boxShadow:"0px 4px 10px rgba(0,0,0,0.1)"
}}
>

<h1
style={{
fontSize:"24px",
textAlign:"center"
}}
>
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
marginTop:"15px",
borderRadius:"8px"
}}
/>

<input
type={showPassword ? "text" : "password"}
placeholder="Enter Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
style={{
width:"100%",
padding:"12px",
marginTop:"15px",
borderRadius:"8px"
}}
/>

<div
style={{
marginTop:"10px"
}}
>

<label>

<input
type="checkbox"
checked={showPassword}
onChange={()=>
setShowPassword(!showPassword)
}
/>

 Show Password

</label>

</div>

<button
type="submit"
style={{
width:"100%",
padding:"12px",
marginTop:"20px",
border:"none",
borderRadius:"8px",
cursor:"pointer",
fontWeight:"bold"
}}
>
Login
</button>

<p
style={{
textAlign:"center",
marginTop:"15px",
color:"blue",
fontSize:"14px"
}}
>
Forgot Password? Contact Admin
</p>

</form>

</div>

);

}

export default Login;


