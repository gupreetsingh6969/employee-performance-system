import Sidebar from "../components/Sidebar";

function Testing(){

const metrics=[

{
title:"AI Accuracy",
value:92
},

{
title:"Precision",
value:89
},

{
title:"Recall",
value:87
},

{
title:"F1 Score",
value:88
}

];


const tests=[

"Authentication Tested",
"Employee CRUD Tested",
"Notifications Tested",
"AI Recommendation Tested",
"Dashboard Analytics Tested",
"Task Module Tested",
"Charts Tested"

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
width:"100%"
}}
>

<div
style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center"
}}
>

<h1>
🧪 Testing Metrics Dashboard
</h1>

<button

style={{

padding:"12px 20px",
background:"#2563eb",
border:"none",
color:"white",
borderRadius:"10px",
cursor:"pointer"

}}

>

🔄 Run Test

</button>

</div>

<br/>

<div
style={{

display:"flex",
gap:"20px",
flexWrap:"wrap"

}}
>

{

metrics.map((item,index)=>(

<div
key={index}
style={{

background:"white",
padding:"20px",
width:"220px",
borderRadius:"15px",
boxShadow:"0 4px 10px rgba(0,0,0,0.1)"

}}
>

<h3>
{item.title}
</h3>

<h1>
{item.value}%
</h1>

<br/>

<div
style={{
height:"10px",
background:"#e5e7eb",
borderRadius:"20px"
}}
>

<div
style={{
height:"100%",
width:`${item.value}%`,
background:"#22c55e",
borderRadius:"20px"
}}
>

</div>

</div>

</div>

))

}

</div>

<br/>

<div
style={{

background:"white",
padding:"25px",
borderRadius:"15px",
boxShadow:"0 4px 10px rgba(0,0,0,0.1)"

}}
>

<h2>
📋 Test Summary
</h2>

<br/>

{

tests.map((test,index)=>(

<p
key={index}
style={{
marginBottom:"15px"
}}
>

✅ {test}

</p>

))

}

</div>

<br/>

<div
style={{

background:"white",
padding:"25px",
borderRadius:"15px",
boxShadow:"0 4px 10px rgba(0,0,0,0.1)"

}}
>

<h2>
💚 System Health

</h2>

<h1>

95%

</h1>

<p>

All modules functioning correctly

</p>

</div>

</div>

</div>

);

}

export default Testing;