import { useState } from "react";

function Testing(){

const [testResults] = useState([

{
id:1,
testType:"Login Authentication",
result:"Passed",
accuracy:"100%"
},

{
id:2,
testType:"Task Management",
result:"Passed",
accuracy:"96%"
},

{
id:3,
testType:"Performance Tracking",
result:"Passed",
accuracy:"94%"
},

{
id:4,
testType:"AI Recommendation",
result:"Passed",
accuracy:"91%"
}

]);


return(

<div style={{padding:"20px"}}>

<h1>
System Testing Metrics
</h1>

{

testResults.map((item)=>(

<div
key={item.id}
style={{
border:"1px solid gray",
padding:"15px",
marginBottom:"10px",
borderRadius:"10px"
}}
>

<h3>
{item.testType}
</h3>

<p>
Status: {item.result}
</p>

<p>
Accuracy: {item.accuracy}
</p>

</div>

))

}

</div>

);

}

export default Testing;