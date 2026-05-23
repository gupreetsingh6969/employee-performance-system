import { useState } from "react";

function AIRecommendations(){

const [recommendationData] = useState([

{
id:1,
employee:"John Smith",
prediction:"Top Performer",
suggestion:"Leadership training program"
},

{
id:2,
employee:"Sarah Lee",
prediction:"Consistent Performance",
suggestion:"Advanced skill workshop"
},

{
id:3,
employee:"David Wilson",
prediction:"Needs Improvement",
suggestion:"Technical training session"
}

]);


return(

<div style={{padding:"20px"}}>

<h1>
AI Recommendations
</h1>

<p>
Performance analysis and training suggestions
</p>

<br/>

{

recommendationData.map((record)=>(

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
Prediction:
{record.prediction}
</p>

<p>
Suggested Action:
{record.suggestion}
</p>

</div>

))

}

</div>

);

}

export default AIRecommendations;