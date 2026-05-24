import Sidebar from "../components/Sidebar";

import {
LineChart,
Line,
XAxis,
YAxis,
CartesianGrid,
Tooltip,
ResponsiveContainer
} from "recharts";

function Analytics() {

const analytics = [

{
title:"Top Performers",
value:"15 Employees"
},

{
title:"Employees Need Training",
value:"8 Employees"
},

{
title:"Average Attendance",
value:"91%"
},

{
title:"Completed Tasks",
value:"120"
}

];

const performanceData = [

{month:"Jan",score:70},
{month:"Feb",score:75},
{month:"Mar",score:80},
{month:"Apr",score:85},
{month:"May",score:90}

];

return (

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
Employee Analytics
</h1>

<div
style={{
display:"flex",
gap:"20px",
flexWrap:"wrap",
marginTop:"20px"
}}
>

{

analytics.map((item,index)=>(

<div
key={index}
style={{
background:"white",
padding:"20px",
borderRadius:"12px",
minWidth:"220px",
boxShadow:"0px 2px 10px rgba(0,0,0,0.1)"
}}
>

<h3>{item.title}</h3>

<h2>{item.value}</h2>

</div>

))

}

</div>

<div
style={{
background:"white",
padding:"20px",
marginTop:"40px",
borderRadius:"12px",
height:"400px"
}}
>

<h2>
Performance Trend
</h2>

<ResponsiveContainer
width="100%"
height="90%"
>

<LineChart data={performanceData}>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="month"/>

<YAxis/>

<Tooltip/>

<Line
type="monotone"
dataKey="score"
/>

</LineChart>

</ResponsiveContainer>

</div>

</div>

</div>

);

}

export default Analytics;