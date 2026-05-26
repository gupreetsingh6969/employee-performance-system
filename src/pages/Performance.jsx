import { useState } from "react";

function Performance(){

const [performanceList,setPerformanceList]=useState([

{
id:1,
employee:"John Smith",
rating:92,
feedback:"Excellent productivity"
},

{
id:2,
employee:"Sarah Lee",
rating:85,
feedback:"Good communication skills"
},

{
id:3,
employee:"David Wilson",
rating:76,
feedback:"Needs training improvement"
}

]);


return(

<div style={{padding:"20px"}}>

<h1>
Employee Performance
</h1>

{

performanceList.map((record)=>(

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
Rating: {record.rating}%
</p>

<p>
Feedback: {record.feedback}
</p>

</div>

))

}

</div>

);

}

export default Performance;


