import { useState } from "react";

function AIRecommendations(){

const [recommendations] = useState([

{
id:1,
title:"Training Suggestion",
message:"Employees with lower KPI scores may benefit from technical workshops."
},

{
id:2,
title:"Performance Insight",
message:"High-performing employees can be considered for leadership roles."
},

{
id:3,
title:"Productivity Advice",
message:"Task completion trends indicate a need for improved time management."
}

]);

return(

<div style={{padding:"20px"}}>

<h1>
AI Recommendations
</h1>

<p>
System-generated insights for employee improvement
</p>

<hr/>

{

recommendations.map((item)=>(

<div
key={item.id}
style={{
border:"1px solid #d1d5db",
padding:"15px",
marginBottom:"12px",
borderRadius:"8px"
}}
>

<h3>{item.title}</h3>

<p>{item.message}</p>

</div>

))

}

</div>

);

}

export default AIRecommendations;