import Sidebar from "../components/Sidebar";

function TestingMetrics() {

const tests = [

{
name:"API Connectivity",
status:"Passed"
},

{
name:"Dashboard Functionality",
status:"Passed"
},

{
name:"AI Prediction Accuracy",
status:"92%"
},

{
name:"Authentication",
status:"Passed"
},

{
name:"Performance Test",
status:"Passed"
},

{
name:"System Response Time",
status:"1.2 sec"
}

];

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
flex:1
}}
>

<h1>Testing Metrics</h1>

<div style={{marginTop:"20px"}}>

{tests.map((item,index)=>(

<div
key={index}
style={{
background:"white",
padding:"20px",
marginBottom:"15px",
borderRadius:"12px"
}}
>

<h3>{item.name}</h3>

<p>{item.status}</p>

</div>

))}

</div>

</div>

</div>

);

}

export default TestingMetrics;