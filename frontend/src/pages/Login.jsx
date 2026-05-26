import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Login(){

const [loading,setLoading]=useState(false);

const [showPassword,setShowPassword]=useState(false);

const [formData,setFormData]=useState({

email:"",
password:""

});

const loginUser=async()=>{

try{

setLoading(true);

const response=

await axios.post(

"import.meta.env.VITE_API_URL/auth/login",
formData

);

console.log(
"LOGIN RESPONSE:",
response.data
);


// Save authentication data

localStorage.setItem(

"token",
response.data.token

);

localStorage.setItem(

"role",
response.data.user.role

);

localStorage.setItem(

"user",

JSON.stringify(
response.data.user
)

);


alert(
"Login Successful"
);

window.location="/dashboard";

}
catch(error){

console.log(
error.response?.data || error
);

alert(

error.response?.data?.message ||
"Login Failed"

);

}
finally{

setLoading(false);

}

};


return(

<div
style={{

height:"100vh",
display:"flex",
background:"#0f172a",
overflow:"hidden",
position:"relative"

}}
>

<div
style={{

position:"absolute",
top:"-100px",
left:"-100px",
width:"300px",
height:"300px",
background:"#2563eb",
borderRadius:"50%",
opacity:"0.3"

}}
/>


<div
style={{

position:"absolute",
bottom:"-100px",
right:"-100px",
width:"350px",
height:"350px",
background:"#22c55e",
borderRadius:"50%",
opacity:"0.2"

}}
/>


<div
style={{

flex:1,
padding:"80px",
color:"white",

display:"flex",
flexDirection:"column",

justifyContent:"center"

}}
>

<h1
style={{
fontSize:"55px"
}}
>
🚀 Employee Performance System
</h1>

<p
style={{

fontSize:"20px",
lineHeight:"35px",
marginTop:"20px",
color:"#cbd5e1"

}}
>

Manage employees,
AI recommendations,
analytics and task tracking
from one place.

</p>

</div>



<div
style={{

flex:1,

display:"flex",

justifyContent:"center",

alignItems:"center"

}}
>

<div
style={{

width:"450px",

padding:"40px",

background:
"rgba(255,255,255,0.95)",

borderRadius:"30px",

boxShadow:
"0 15px 50px rgba(0,0,0,0.4)"

}}
>

<h1
style={{
textAlign:"center"
}}
>

🔐 Welcome Back

</h1>

<br/>


<input

type="email"

placeholder="Email"

value={formData.email}

onChange={(e)=>

setFormData({

...formData,
email:e.target.value

})

}

style={{

width:"100%",
padding:"15px",

marginBottom:"15px",

borderRadius:"12px",

border:"1px solid #d1d5db"

}}

/>



<div
style={{
position:"relative"
}}
>

<input

type={

showPassword
?
"text"
:
"password"

}

placeholder="Password"

value={formData.password}

onChange={(e)=>

setFormData({

...formData,
password:e.target.value

})

}

style={{

width:"100%",

padding:"15px",

borderRadius:"12px",

border:"1px solid #d1d5db"

}}

 />


<button

onClick={()=>

setShowPassword(
!showPassword
)

}

style={{

position:"absolute",

right:"10px",

top:"12px",

border:"none",

background:"transparent",

cursor:"pointer"

}}

>

{showPassword ? "🙈" : "👁"}

</button>

</div>


<br/>


<button

onClick={loginUser}

disabled={loading}

style={{

width:"100%",

padding:"15px",

background:"#2563eb",

color:"white",

border:"none",

borderRadius:"12px",

fontWeight:"bold",

cursor:"pointer"

}}

>

{

loading
?
"Logging..."
:
"Login"

}

</button>


<p
style={{

textAlign:"center",

marginTop:"20px"

}}
>

No account?

<Link
to="/register"

style={{
marginLeft:"5px"
}}
>

Register

</Link>

</p>

</div>

</div>

</div>

);

}

export default Login; 
