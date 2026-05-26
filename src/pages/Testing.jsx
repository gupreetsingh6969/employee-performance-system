function Testing(){

const testReport=[

{
name:"Authentication Test",
result:"Passed"
},

{
name:"Dashboard Functionality",
result:"Passed"
},

{
name:"Task Module Test",
result:"Passed"
},

{
name:"Employee Module Test",
result:"Passed"
},

{
name:"Notification Test",
result:"Passed"
},

{
name:"AI Prediction Accuracy",
result:"89%"
}

];

return(

<div style={{padding:"20px"}}>

<h1>
Testing Metrics
</h1>

<br/>

{

testReport.map((item,index)=>(

<div
key={index}
style={{
border:"1px solid #d1d5db",
padding:"15px",
marginBottom:"15px",
borderRadius:"10px"
}}
>

<h3>
{item.name}
</h3>

<p>
Result: {item.result}
</p>

</div>

))

}

</div>

);

}

export default Testing;



