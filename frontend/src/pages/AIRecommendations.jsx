import { useEffect,useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";

import{
BarChart,
Bar,
PieChart,
Pie,
Cell,
XAxis,
YAxis,
CartesianGrid,
Tooltip
}from "recharts";

function AIRecommendations(){

const [data,setData]=useState(null);

useEffect(()=>{

loadAI();

},[]);


const loadAI=async()=>{

try{

const token=
localStorage.getItem("token");

const response=
await axios.get(

"import.meta.env.VITE_API_URL/ai",

{
headers:{
Authorization:`Bearer ${token}`
}
}

);

setData(
response.data
);

}
catch(error){

console.log(
"AI Error:",
error
);

}

};


if(!data){

return <Loader/>;

}


const performanceGraph=

data.allPredictions?.map(
employee=>({

name:employee.name,

score:
Number(
employee.performanceScore ||
employee.score ||
0
)

})

) || [];


const pieData=[

{

name:"Top Performers",

value:
data.topPerformers?.length || 0

},

{

name:"Training",

value:
data.trainingNeeded?.length || 0

},

{

name:"Risk",

value:
data.riskEmployees?.length || 0

}

];


const colors=[

"#22c55e",
"#f59e0b",
"#ef4444"

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

<h1>
🤖 AI Recommendations Dashboard
</h1>

<br/>


<div
style={{

display:"flex",
gap:"20px",
flexWrap:"wrap"

}}
>

<div style={card}>
<h3>Total Employees</h3>
<h1>{data.totalEmployees}</h1>
</div>


<div style={card}>
<h3>Average Score</h3>
<h1>{data.averageScore}</h1>
</div>


<div style={card}>
<h3>Top Performers</h3>
<h1>{data.topPerformers?.length}</h1>
</div>


<div style={card}>
<h3>Training Needed</h3>
<h1>{data.trainingNeeded?.length}</h1>
</div>

</div>


<br/>


<div
style={{

display:"flex",
gap:"20px",
flexWrap:"wrap"

}}
>

<div style={graphBox}>

<h2>
📈 Performance Graph
</h2>

<BarChart
width={450}
height={300}
data={performanceGraph}
>

<CartesianGrid/>

<XAxis dataKey="name"/>

<YAxis/>

<Tooltip/>

<Bar
dataKey="score"
fill="#2563eb"
/>

</BarChart>

</div>



<div style={graphBox}>

<h2>
📊 Prediction Status
</h2>

<PieChart
width={400}
height={300}
>

<Pie
data={pieData}
dataKey="value"
outerRadius={100}
label
>

{

pieData.map(
(entry,index)=>(

<Cell
key={index}
fill={colors[index]}
/>

))

}

</Pie>

<Tooltip/>

</PieChart>

</div>

</div>



<div style={section}>

<h2>
🏆 Promotion Candidates
</h2>

{

data.promotionCandidates?.map(
employee=>(

<div key={employee.id}>

• {employee.name}

</div>

))

}

</div>



<div style={section}>

<h2>
🤖 AI Actions
</h2>

{

data.actions?.map(
(action,index)=>(

<div key={index}>

• {action}

</div>

))

}

</div>



<div style={section}>

<h2>
🧠 Smart Suggestions
</h2>

{

data.smartSuggestions?.length>0

?

data.smartSuggestions.map(

(item,index)=>(

<div
key={index}
style={{

padding:"10px",
marginBottom:"10px",
borderBottom:
"1px solid #ddd"

}}
>

<h4>

👤 {item.name}

</h4>

<p>

{item.message}

</p>

</div>

)

)

:

<p>
No AI suggestions available
</p>

}

</div>


</div>

</div>

);

}



const card={

background:"white",

padding:"20px",

width:"220px",

borderRadius:"15px",

boxShadow:
"0 4px 10px rgba(0,0,0,0.1)"

};



const graphBox={

background:"white",

padding:"20px",

borderRadius:"15px",

boxShadow:
"0 4px 10px rgba(0,0,0,0.1)"

};



const section={

background:"white",

padding:"20px",

marginTop:"20px",

borderRadius:"15px",

boxShadow:
"0 4px 10px rgba(0,0,0,0.1)"

};


export default AIRecommendations;
