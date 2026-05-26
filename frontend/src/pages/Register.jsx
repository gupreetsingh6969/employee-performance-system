import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {

const navigate=useNavigate();

const [formData,setFormData]=useState({

name:"",
email:"",
password:"",
role:"EMPLOYEE"

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
formData

);

console.log(response.data);

alert(
"Registration Successful"
);

setFormData({

name:"",
email:"",
password:"",
role:"EMPLOYEE"

});

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

height:"100vh",

display:"flex",

justifyContent:"center",

alignItems:"center",

background:"#0f172a"

}}
>

<div
style={{

width:"450px",

background:"white",

padding:"40px",

borderRadius:"25px",

boxShadow:
"0 15px 40px rgba(0,0,0,0.3)"

}}
>

<h1
style={{
textAlign:"center"
}}
>

📝 Register

</h1>

<br/>

<form onSubmit={handleSubmit}>

<input

type="text"

name="name"

placeholder="Full Name"

value={formData.name}

onChange={handleChange}

required

style={{

width:"100%",
padding:"15px",
marginBottom:"15px",

borderRadius:"10px",

border:"1px solid lightgray"

}}

/>


<input

type="email"

name="email"

placeholder="Email"

value={formData.email}

onChange={handleChange}

required

style={{

width:"100%",
padding:"15px",
marginBottom:"15px",

borderRadius:"10px",

border:"1px solid lightgray"

}}

/>


<input

type="password"

name="password"

placeholder="Password"

value={formData.password}

onChange={handleChange}

required

style={{

width:"100%",
padding:"15px",
marginBottom:"15px",

borderRadius:"10px",

border:"1px solid lightgray"

}}

/>


<select

name="role"

value={formData.role}

onChange={handleChange}

style={{

width:"100%",
padding:"15px",
marginBottom:"20px",

borderRadius:"10px"

}}

>

<option value="EMPLOYEE">
Employee
</option>

<option value="HR">
HR
</option>

<option value="MANAGER">
Manager
</option>

<option value="ADMIN">
Admin
</option>

</select>


<button

type="submit"

style={{

width:"100%",
padding:"15px",

background:"#2563eb",

color:"white",

border:"none",

borderRadius:"10px",

fontWeight:"bold",

cursor:"pointer"

}}

>

Register

</button>

</form>

</div>

</div>

);

}

export default Register;
