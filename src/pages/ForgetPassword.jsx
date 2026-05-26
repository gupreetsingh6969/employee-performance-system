import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgotPassword(){

const [email,setEmail]=useState("");
const [newPassword,setNewPassword]=useState("");

const navigate=useNavigate();

const handleReset=async(e)=>{

e.preventDefault();

try{

await axios.post(
"import.meta.env.VITE_API_URL/auth/reset-password",
{
email,
newPassword
}
);

alert("Password Updated Successfully");

navigate("/");

}
catch(error){

alert("User not found");

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
onSubmit={handleReset}
style={{
background:"white",
padding:"30px",
width:"300px",
borderRadius:"10px"
}}
>

<h2>Reset Password</h2>

<input
type="email"
placeholder="Enter Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
style={{
width:"100%",
padding:"10px",
marginTop:"15px"
}}
/>

<input
type="password"
placeholder="Enter New Password"
value={newPassword}
onChange={(e)=>setNewPassword(e.target.value)}
style={{
width:"100%",
padding:"10px",
marginTop:"15px"
}}
/>

<button
type="submit"
style={{
width:"100%",
padding:"10px",
marginTop:"20px"
}}
>
Reset Password
</button>

</form>

</div>

);

}

export default ForgotPassword;

