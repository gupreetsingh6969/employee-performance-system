import { useEffect, useState } from "react";

function AIRecommendations() {

const [recommendations, setRecommendations] = useState([]);

useEffect(() => {

const reviews =
JSON.parse(
localStorage.getItem("reviews")
) || [];

const generatedData =
reviews.map((item) => {

let prediction = "";
let recommendation = "";

if(item.rating >= 8){

prediction = "High Performance";

recommendation =
"Eligible for leadership tasks and advanced projects";

}
else if(item.rating >=5){

prediction = "Average Performance";

recommendation =
"Needs additional skill development";

}
else{

prediction = "Needs Improvement";

recommendation =
"Training and mentoring recommended";

}

return {

employee:item.employeeName,
rating:item.rating,
prediction,
recommendation

};

});

setRecommendations(generatedData);

},[]);

return(

<div style={{padding:"20px"}}>

<h1>AI Recommendations</h1>

{

recommendations.length===0 ?

<p>No recommendations available</p>

:

recommendations.map((item,index)=>(

<div
key={index}
style={{
border:"1px solid gray",
margin:"10px",
padding:"10px",
borderRadius:"10px"
}}
>

<p>
<b>Employee:</b>
{item.employee}
</p>

<p>
<b>Rating:</b>
{item.rating}
</p>

<p>
<b>Prediction:</b>
{item.prediction}
</p>

<p>
<b>Recommendation:</b>
{item.recommendation}
</p>

</div>

))

}

</div>

);

}

export default AIRecommendations;