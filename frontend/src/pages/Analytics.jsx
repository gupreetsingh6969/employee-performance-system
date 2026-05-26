import { useEffect,useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

import{
ResponsiveContainer,
BarChart,
Bar,
CartesianGrid,
XAxis,
YAxis,
Tooltip,
LineChart,
Line,
PieChart,
Pie,
Cell
}from "recharts";

function Analytics(){

const [employees,setEmployees]=useState([]);

useEffect(()=>{

loadAnalytics();

},[]);


const loadAnalytics=async()=>{

try{

const token=
localStorage.getItem("token");

const response=
await axios.get(

"http://localhost:5000/api/employees",

{
headers:{
Authorization:`Bearer ${token}`
}
}

);

setEmployees(
response.data.data || []
);

}
catch(error){

console.log(error);

}

};


const chartData=

employees.map(employee=>({

name:employee.name,
score:Number(
employee.performanceScore || 0
)

}));


const averageScore=

employees.length>0

?

(
employees.reduce(

(sum,e)=>

sum+Number(
e.performanceScore || 0
),

0

)

/

employees.length

).toFixed(1)

:

0;


const highestScore=

employees.length>0

?

Math.max(

...employees.map(

e=>
Number(
e.performanceScore || 0
)

)

)

:

0;



const performanceData=[

{

name:"Excellent",

value:

employees.filter(

e=>e.performanceScore>=80

).length

},

{

name:"Average",

value:

employees.filter(

e=>

e.performanceScore>=50 &&
e.performanceScore<80

).length

},

{

name:"Needs Improvement",

value:

employees.filter(

e=>e.performanceScore<50

).length

}

];


const COLORS=[

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
📊 Performance Analytics
</h1>

<br/>


<div
style={{

display:"grid",

gridTemplateColumns:
"repeat(3,1fr)",

gap:"20px"

}}
>

<div style={cardStyle}>
<h3>Total Employees</h3>
<h1>{employees.length}</h1>
</div>

<div style={cardStyle}>
<h3>Average Score</h3>
<h1>{averageScore}</h1>
</div>

<div style={cardStyle}>
<h3>Highest Score</h3>
<h1>{highestScore}</h1>
</div>

</div>

<br/>


{

employees.length===0 ?

<div
style={{

background:"white",
padding:"30px",
borderRadius:"15px",
textAlign:"center"

}}
>

<h2>
No Employee Data Available
</h2>

<p>
Add employees first
</p>

</div>

:

<>

<div style={chartBox}>

<h2>
Performance Score
</h2>

<ResponsiveContainer
width="100%"
height={300}
>

<BarChart data={chartData}>

<CartesianGrid/>

<XAxis dataKey="name"/>

<YAxis/>

<Tooltip/>

<Bar
dataKey="score"
fill="#2563eb"
/>

</BarChart>

</ResponsiveContainer>

</div>


<br/>


<div style={chartBox}>

<h2>
Performance Trend
</h2>

<ResponsiveContainer
width="100%"
height={300}
>

<LineChart data={chartData}>

<CartesianGrid/>

<XAxis dataKey="name"/>

<YAxis/>

<Tooltip/>

<Line
type="monotone"
dataKey="score"
stroke="#22c55e"
strokeWidth={3}
/>

</LineChart>

</ResponsiveContainer>

</div>


<br/>


<div style={chartBox}>

<h2>
Performance Distribution
</h2>

<ResponsiveContainer
width="100%"
height={300}
>

<PieChart>

<Pie

data={performanceData}

dataKey="value"

label

>

{

performanceData.map(

(item,index)=>(

<Cell
key={index}
fill={COLORS[index]}
/>

)

)

}

</Pie>

<Tooltip/>

</PieChart>

</ResponsiveContainer>

</div>

</>

}

</div>

</div>

);

}

const cardStyle={

background:"white",
padding:"20px",
borderRadius:"15px",
boxShadow:"0 3px 10px gray"

};

const chartBox={

background:"white",
padding:"20px",
borderRadius:"15px"

};

export default Analytics;