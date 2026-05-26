import { useEffect,useState } from "react";
import axios from "axios";

import {
Chart as ChartJS,
CategoryScale,
LinearScale,
BarElement,
PointElement,
LineElement,
ArcElement,
Title,
Tooltip,
Legend
} from "chart.js";

import {
Bar,
Line,
Pie
} from "react-chartjs-2";

ChartJS.register(
CategoryScale,
LinearScale,
BarElement,
PointElement,
LineElement,
ArcElement,
Title,
Tooltip,
Legend
);

function Charts(){

const [employees,setEmployees]=useState([]);

useEffect(()=>{

loadData();

},[]);


const loadData=async()=>{

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


const totalEmployees=
employees.length;

const highest=

employees.length>0 ?

Math.max(
...employees.map(
e=>e.performanceScore
)
)

:

0;


const lowest=

employees.length>0 ?

Math.min(
...employees.map(
e=>e.performanceScore
)
)

:

0;


const average=

employees.length>0 ?

(

employees.reduce(

(sum,e)=>

sum+e.performanceScore,

0

)

/

employees.length

).toFixed(1)

:

0;


const barData={

labels:
employees.map(
e=>e.name
),

datasets:[

{

label:"Performance Score",

data:
employees.map(
e=>e.performanceScore
),

backgroundColor:

employees.map(

e=>

e.performanceScore>=80

?

"#22c55e"

:

e.performanceScore>=50

?

"#f59e0b"

:

"#ef4444"

)

}

]

};



const lineData={

labels:
employees.map(
e=>e.name
),

datasets:[

{

label:"Performance Trend",

data:
employees.map(
e=>e.performanceScore
),

borderColor:"#2563eb",

fill:false

}

]

};



const pieData={

labels:[
"Excellent",
"Average",
"Low"
],

datasets:[

{

data:[

employees.filter(
e=>e.performanceScore>=80
).length,

employees.filter(
e=>
e.performanceScore>=50 &&
e.performanceScore<80
).length,

employees.filter(
e=>e.performanceScore<50
).length

],

backgroundColor:[

"#22c55e",
"#f59e0b",
"#ef4444"

]

}

]

};


return(

<div
style={{
padding:"30px",
background:"#f3f4f6",
minHeight:"100vh"
}}
>

<h1>
📊 Performance Analytics
</h1>

<br/>


<div
style={{

display:"grid",
gridTemplateColumns:"repeat(4,1fr)",
gap:"20px"

}}
>

<Card
title="Employees"
value={totalEmployees}
/>

<Card
title="Average"
value={average}
/>

<Card
title="Highest"
value={highest}
/>

<Card
title="Lowest"
value={lowest}
/>

</div>

<br/>


<div
style={{

display:"grid",

gridTemplateColumns:"2fr 1fr",

gap:"20px"

}}

>

<div style={box}>

<h2>
Performance Score
</h2>

<Bar data={barData}/>

</div>


<div style={box}>

<h2>
Distribution
</h2>

<Pie data={pieData}/>

</div>

</div>


<br/>


<div style={box}>

<h2>
Performance Trend
</h2>

<Line data={lineData}/>

</div>


<br/>


<div style={box}>

<h2>
🏆 Employee Ranking
</h2>

<table
style={{
width:"100%"
}}
>

<thead>

<tr>

<th>Name</th>

<th>Department</th>

<th>Score</th>

</tr>

</thead>

<tbody>

{

[...employees]

.sort(
(a,b)=>

b.performanceScore-
a.performanceScore
)

.map((employee)=>(

<tr key={employee.id}>

<td>
{employee.name}
</td>

<td>
{employee.department}
</td>

<td>
⭐ {employee.performanceScore}
</td>

</tr>

))

}

</tbody>

</table>

</div>

</div>

);

}


function Card({title,value}){

return(

<div
style={{

background:"white",

padding:"20px",

borderRadius:"15px",

boxShadow:
"0px 3px 10px rgba(0,0,0,0.2)"

}}
>

<h3>{title}</h3>

<h1>{value}</h1>

</div>

);

}


const box={

background:"white",
padding:"25px",
borderRadius:"15px",
boxShadow:"0px 3px 10px rgba(0,0,0,0.2)"

};


export default Charts;