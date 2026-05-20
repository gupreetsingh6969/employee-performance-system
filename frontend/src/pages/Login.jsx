import { useState } from "react";
import api from "../services/api";

function Login() {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);

const handleLogin = async () => {

try {

setLoading(true);

const response = await api.post(
"/api/auth/login",
{
email: email.trim(),
password: password.trim()
}
);

console.log(response.data);

localStorage.setItem(
"token",
response.data.token
);

alert("Login Successful");

window.location.href="/dashboard";

} catch(error){

console.log("Login Error:", error);

alert(
error?.response?.data?.message ||
"Login Failed"
);

}

finally{

setLoading(false);

}

};

return (

<div
style={{
display:"flex",
flexDirection:"column",
alignItems:"center",
marginTop:"100px"
}}
>

<h1>Employee Performance System</h1>

<input
type="email"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
style={{
padding:"10px",
width:"250px"
}}
/>

<br/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
style={{
padding:"10px",
width:"250px"
}}
/>

<br/>

<button
onClick={handleLogin}
disabled={loading}
style={{
padding:"10px",
width:"120px"
}}
>
{loading ? "Logging in..." : "Login"}
</button>

<br/>

<button
onClick={() =>
window.location.href="/signup"
}
style={{
padding:"10px",
width:"120px"
}}
>
Sign Up
</button>

</div>

);

}

export default Login;