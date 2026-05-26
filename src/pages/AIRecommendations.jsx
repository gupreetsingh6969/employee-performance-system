import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function AIRecommendations(){

const [data,setData]=useState({
averageScore:0,
topPerformers:[],
trainingNeeded:[],
recommendation:"Loading..."
});

useEffect(()=>{

fetchRecommendations();

},[]);

const fetchRecommendations=async()=>{

try{

const response=await axios.get(
"import.meta.env.VITE_API_URL/ai"
);

setData(response.data);

}
catch(error){

console.log(error);

setData({
averageScore:0,
topPerformers:[],
trainingNeeded:[],
recommendation:"Failed to load AI data"
});

}

};

return(

<div
style={{
display:"flex",
minHeight:"100vh"
}}
>

<Sidebar/>

<div
style={{
padding:"30px",
flex:1,
background:"#f3f4f6"
}}
>

<h1>AI Recommendations</h1>

<div
style={{
background:"white",
padding:"20px",
borderRadius:"12px",
marginTop:"20px"
}}
>

<h3>
Average Score: {data.averageScore}
</h3>

<h3>
Top Performers: {data.topPerformers.length}
</h3>

<h3>
Need Training: {data.trainingNeeded.length}
</h3>

<p>
🤖 {data.recommendation}
</p>

</div>

</div>

</div>

);

}

export default AIRecommendations;


