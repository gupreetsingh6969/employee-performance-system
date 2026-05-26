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
CartesianGrid,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer
}from "recharts";

function Dashboard(){

const [loading,setLoading]=useState(true);

const [employees,setEmployees]=useState([]);
const [tasks,setTasks]=useState([]);
const [feedbackCount,setFeedbackCount]=useState(0);

const [stats,setStats]=useState({

totalEmployees:0,
averageScore:0,
highestScore:0,
totalTasks:0,
completedTasks:0

});


useEffect(()=>{

loadDashboard();

},[]);



const loadDashboard=async()=>{

try{

const token=
localStorage.getItem("token");

const headers={

headers:{

Authorization:`Bearer ${token}`

}

};


const [

employeeResponse,
taskResponse,
feedbackResponse

]=await Promise.all([

axios.get(
"import.meta.env.VITE_API_URL/employees",
headers
),

axios.get(
"import.meta.env.VITE_API_URL/tasks",
headers
),

axios.get(
"import.meta.env.VITE_API_URL/feedback",
headers
)

]);


const employeeData=
employeeResponse.data.data || [];

const taskData=
taskResponse.data.data ||
taskResponse.data ||
[];

const feedbackData=
feedbackResponse.data.data || [];


setEmployees(employeeData);

setTasks(taskData);

setFeedbackCount(
feedbackData.length
);


setStats({

totalEmployees:
employeeData.length,

averageScore:

employeeData.length>0

?

(

employeeData.reduce(

(sum,employee)=>

sum+
(employee.performanceScore||0),

0

)

/

employeeData.length

).toFixed(1)

:0,


highestScore:

employeeData.length>0

?

Math.max(

...employeeData.map(

employee=>

employee.performanceScore||0

)

)

:0,


totalTasks:
taskData.length,

completedTasks:

taskData.filter(

task=>

task.status==="Completed"

).length

});


}
catch(error){

console.log(error);

}
finally{

setLoading(false);

}

};



if(loading){

return <Loader/>;

}



const employeeGraph=

employees.length>0

?

employees.map(employee=>({

name:employee.name,

score:
employee.performanceScore || 0

}))

:

[{

name:"No Data",

score:0

}];


const completed=

tasks.filter(

task=>

task.status==="Completed"

).length;


const pending=

tasks.filter(

task=>

task.status!=="Completed"

).length;


const taskGraph=

completed===0 && pending===0

?

[{

name:"No Tasks",

value:1

}]

:

[

{

name:"Completed",

value:completed

},

{

name:"Pending",

value:pending

}

];


const colors=[

"#22c55e",
"#ef4444",
"#94a3b8"

];



return(

<div
style={{

display:"flex",

background:"#f1f5f9",

minHeight:"100vh",

alignItems:"flex-start"

}}
>

<Sidebar/>


<div
style={{

padding:"30px",

width:"100%",

overflowX:"hidden"

}}
>

<h1
style={{

marginBottom:"25px",

fontSize:"30px",

color:"#1e293b"

}}
>

📊 Employee Performance Dashboard

</h1>



<div
style={{

display:"grid",

gridTemplateColumns:

"repeat(auto-fit,minmax(180px,1fr))",

gap:"20px"

}}
>

{

[

["Employees",stats.totalEmployees],

["Average",stats.averageScore],

["Highest",stats.highestScore],

["Tasks",stats.totalTasks],

["Completed",stats.completedTasks],

["Feedback",feedbackCount]

]

.map((item,index)=>(

<div

key={index}

style={{

background:"white",

padding:"20px",

borderRadius:"16px",

boxShadow:
"0 4px 12px rgba(0,0,0,0.08)"

}}

>

<h3
style={{

color:"#64748b"

}}
>

{item[0]}

</h3>

<h1
style={{

marginTop:"10px",

color:"#2563eb"

}}
>

{item[1]}

</h1>

</div>

))

}

</div>


<br/>


<div
style={{

display:"grid",

gridTemplateColumns:

"repeat(auto-fit,minmax(450px,1fr))",

gap:"25px"

}}
>


<div
style={{

background:"white",

padding:"20px",

borderRadius:"16px",

boxShadow:
"0 4px 12px rgba(0,0,0,0.08)",

minHeight:"400px"

}}
>

<h2>

Performance Graph

</h2>

<ResponsiveContainer
width="100%"
height={300}
>

<BarChart
data={employeeGraph}
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

</ResponsiveContainer>

</div>



<div
style={{

background:"white",

padding:"20px",

borderRadius:"16px",

boxShadow:
"0 4px 12px rgba(0,0,0,0.08)",

minHeight:"400px"

}}
>

<h2>

Task Status

</h2>


<ResponsiveContainer
width="100%"
height={300}
>

<PieChart>

<Pie
data={taskGraph}
dataKey="value"
outerRadius={100}
label
>

{

taskGraph.map(

(item,index)=>(

<Cell
key={index}
fill={colors[index]}
/>

)

)

}

</Pie>

<Tooltip/>

</PieChart>

</ResponsiveContainer>

</div>


</div>

</div>

</div>

);

}

export default Dashboard;
