import { useState } from "react";
import api from "../services/api";

function Signup() {

const [name,setName]=useState("");
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [loading,setLoading]=useState(false);

const handleSignup = async ()=>{

try{

setLoading(true);

const response = await api.post(
"/api/auth/register",
{
name:name.trim(),
email:email.trim(),
password:password.trim()
}
);

console.log("Signup:",response.data);

alert("Signup Successful");

window.location.href="/";

}
catch(error){

console.log("Signup Error:",error);

alert(
error?.response?.data?.message ||
error?.response?.data?.error ||
"Signup Failed"
);

}
finally{

setLoading(false);

}

};

return(

<div
style={{
display:"flex",
flexDirection:"column",
alignItems:"center",
marginTop:"100px"
}}
>

<h1>Employee Signup</h1>

<input
type="text"
placeholder="Name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<br/>

<input
type="email"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<br/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<br/>

<button
onClick={handleSignup}
disabled={loading}
>
{loading ? "Creating..." : "Sign Up"}
</button>

</div>

);

}

export default Signup;