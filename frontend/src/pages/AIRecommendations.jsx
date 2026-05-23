import { useState } from "react";

function AIRecommendations(){

const [predictionResults] = useState([

{
id:1,
employee:"John Smith",
score:92,
prediction:"Top Performer",
training:"Leadership Development"
},

{
id:2,
employee:"Sarah Lee",
score:84,
prediction:"Consistent Performer",
training:"Advanced Communication"
},

{
id:3,
employee:"David Wilson",
score:70,
prediction:"Training Required",
training:"Technical Skill Enhancement"
}

]);


return(

<div style={{padding:"20px"}}>

<h1>
AI Prediction Results
</h1>

<p>
Performance analysis and training recommendations
</p>

<br/>

{

predictionResults.map((record)=>(

<div
key={record.id}
style={{
border:"1px solid gray",
padding:"15px",
marginBottom:"10px",
borderRadius:"10px"
}}
>

<h3>
{record.employee}
</h3>

<p>
Performance Score:
{record.score}
</p>

<p>
Prediction:
{record.prediction}
</p>

<p>
Recommended Training:
{record.training}
</p>

</div>

))

}

</div>

);

}

export default AIRecommendations;