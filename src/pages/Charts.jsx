import { useEffect,useState } from "react";
import axios from "axios";

import {
Chart as ChartJS,
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend
);

function Charts(){

const [chartData,setChartData]=useState({

labels:[],
datasets:[]

});

const API_URL = import.meta.env.VITE_API_URL;
useEffect(()=>{

loadChartData();

},[]);

const loadChartData=async()=>{

try{

const token=
localStorage.getItem("token");

if(!token){

console.log(
"No token found"
);

return;

}

const response=
await axios.get(

`${API_URL}/employees`,
{
headers:{
Authorization:`Bearer ${token}`
}
}

);

const employees=
response.data.data ||
response.data ||
[];

setChartData({

labels:
employees.map(
employee=>employee.name
),

datasets:[

{

label:"Performance Score",

data:
employees.map(
employee=>
employee.performanceScore
),

backgroundColor:[
"#2563eb",
"#22c55e",
"#f59e0b",
"#ef4444",
"#8b5cf6"
]

}

]

});

}
catch(error){

console.log(

"Charts Error:",

error.response?.data ||
error.message

);

}

};

return(

<div style={{padding:"20px"}}>

<h1>

Performance Analytics

</h1>

<div
style={{

width:"900px",
marginTop:"30px"

}}
>

<Bar data={chartData}/>

</div>

</div>

);

}

export default Charts;


