import { useNavigate } from "react-router-dom";

function Signup() {

const navigate = useNavigate();

return(

<div
style={{
display:"flex",
flexDirection:"column",
justifyContent:"center",
alignItems:"center",
height:"70vh",
textAlign:"center"
}}
>

<h1>Signup Disabled</h1>

<p>
Employee accounts are created only by Admin.
Please contact Admin for your login credentials.
</p>

<button
onClick={()=>navigate("/")}
style={{
padding:"10px 20px",
marginTop:"20px",
cursor:"pointer"
}}
>
Go To Login
</button>

</div>

);

}

export default Signup;