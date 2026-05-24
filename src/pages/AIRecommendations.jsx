import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function AIRecommendations() {

const [prediction,setPrediction]=useState("");

const [loading,setLoading]=useState(true);

useEffect(()=>{

fetchPrediction();

},[]);

const fetchPrediction=async()=>{

try{

const response=
await axios.get(
"https://employee-performance-system-production-2fc6.up.railway.app/api/predict"
);

setPrediction(
response.data.prediction || "No prediction available"
);

}
catch(error){

console.log(error);

setPrediction(
"Unable to load AI recommendation"
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
background:"#f3f4f6",
minHeight:"100vh"
}}
>

<Sidebar/>

<div
style={{
padding:"30px",
width:"100%"
}}
>

<h1>
AI Recommendations
</h1>

{

loading
?

<h2>Loading...</h2>

:

<div
style={{
background:"white",
padding:"25px",
borderRadius:"12px",
marginTop:"20px",
boxShadow:"0px 2px 10px rgba(0,0,0,0.1)"
}}
>

<h3>
AI Prediction Result
</h3>

<p
style={{
fontSize:"18px",
marginTop:"15px"
}}
>
{prediction}
</p>

</div>

}

</div>

</div>

);

}

export default AIRecommendations;