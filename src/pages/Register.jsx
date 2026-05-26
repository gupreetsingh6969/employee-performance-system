import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {

const navigate = useNavigate();

const [formData,setFormData] = useState({

name:"",
email:"",
password:""

});

const handleChange=(e)=>{

setFormData({

...formData,
[e.target.name]:e.target.value

});

};

const handleSubmit=async(e)=>{

e.preventDefault();

try{

const response=
await axios.post(

"import.meta.env.VITE_API_URL/auth/register",
{
name:formData.name,
email:formData.email,
password:formData.password
}

);

alert(response.data.message);

navigate("/login");

}
catch(error){

console.log(error);

alert(

error.response?.data?.message ||
"Registration Failed"

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
onSubmit={handleSubmit}
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
Register
</h1>

<input
type="text"
name="name"
placeholder="Enter Name"
value={formData.name}
onChange={handleChange}
style={{
width:"100%",
padding:"12px",
marginTop:"15px",
borderRadius:"8px"
}}
/>

<input
type="email"
name="email"
placeholder="Enter Email"
value={formData.email}
onChange={handleChange}
style={{
width:"100%",
padding:"12px",
marginTop:"15px",
borderRadius:"8px"
}}
/>

<input
type="password"
name="password"
placeholder="Enter Password"
value={formData.password}
onChange={handleChange}
style={{
width:"100%",
padding:"12px",
marginTop:"15px",
borderRadius:"8px"
}}
/>

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
Register
</button>

</form>

</div>

);

}

export default Register;
