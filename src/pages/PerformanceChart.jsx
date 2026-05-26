import {useEffect,useState} from "react";
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

import {Bar} from "react-chartjs-2";

ChartJS.register(

CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend

);

function PerformanceChart(){

const [employees,setEmployees]=useState([]);

useEffect(()=>{

loadData();

},[]);

const loadData=async()=>{

try{

const response=await axios.get(
"https://employee-performance-system-production-2fc6.up.railway.app/api/employees"
);

setEmployees(
response.data.data
);

}
catch(error){

console.log(error);

}

};

const data={

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

)

}

]

};

return(

<div style={{padding:"20px"}}>

<h1>

Performance Chart

</h1>

<Bar data={data}/>

</div>

);

}

export default PerformanceChart;


