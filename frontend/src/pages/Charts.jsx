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

useEffect(()=>{

loadChartData();

},[]);

const loadChartData=async()=>{

try{

const response=await axios.get(
"https://employee-performance-system-production-2fc6.up.railway.app/api/employees"
);

const employees=
response.data.data;

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
employee=>employee.performanceScore
)
}

]

});

}
catch(error){

console.log(error);

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