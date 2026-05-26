import { useEffect,useState } from "react";
import axios from "axios";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function Reports(){

const [loading,setLoading]=useState(false);

const [employees,setEmployees]=useState([]);


useEffect(()=>{

loadEmployees();

},[]);


const loadEmployees=async()=>{

try{

const token=
localStorage.getItem("token");

const response=
await axios.get(

"import.meta.env.VITE_API_URL/employees",

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



const downloadCSV=()=>{

try{

setLoading(true);

const headers=[

"Name",
"Email",
"Department",
"Performance Score"

];


const rows=

employees.map(employee=>([

employee.name || "",

employee.email || "",

employee.department || "",

employee.performanceScore || 0

]));


const csvContent=[

headers.join(","),

...rows.map(
row=>row.join(",")
)

].join("\n");


const blob=

new Blob(

[csvContent],

{
type:"text/csv;charset=utf-8;"
}

);


const url=

window.URL.createObjectURL(
blob
);


const link=
document.createElement("a");

link.href=url;

link.setAttribute(
"download",
"employee-report.csv"
);

document.body.appendChild(
link
);

link.click();

document.body.removeChild(
link
);

window.URL.revokeObjectURL(
url
);

}
catch(error){

console.log(error);

alert(
"CSV Export Failed"
);

}
finally{

setLoading(false);

}

};



const downloadPDF=()=>{

const doc=
new jsPDF();

doc.text(
"Employee Performance Report",
20,
15
);

autoTable(doc,{

head:[[
"Name",
"Email",
"Department",
"Score"
]],

body:

employees.map(

employee=>([

employee.name,

employee.email,

employee.department,

employee.performanceScore

])

)

});

doc.save(
"employee-report.pdf"
);

};



const downloadExcel=()=>{

const worksheet=

XLSX.utils.json_to_sheet(
employees
);

const workbook=

XLSX.utils.book_new();

XLSX.utils.book_append_sheet(

workbook,

worksheet,

"Employees"

);

const excelBuffer=

XLSX.write(

workbook,

{
bookType:"xlsx",
type:"array"
}

);

const file=

new Blob(

[excelBuffer],

{

type:

"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"

}

);

saveAs(
file,
"employee-report.xlsx"
);

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
📄 Reports Dashboard
</h1>

<br/>

<div
style={{

display:"flex",
gap:"15px",
marginBottom:"25px"

}}
>

<button
onClick={downloadCSV}
style={buttonStyle}
>

{

loading
?
"Exporting..."
:
"📊 CSV"

}

</button>


<button
onClick={downloadPDF}
style={buttonStyle}
>

📄 PDF

</button>


<button
onClick={downloadExcel}
style={buttonStyle}
>

📗 Excel

</button>

</div>


<div
style={{

background:"white",
padding:"20px",
borderRadius:"15px",
marginBottom:"25px"

}}
>

<h2>

Total Employees: {employees.length}

</h2>

</div>


<div
style={{

background:"white",
padding:"20px",
borderRadius:"15px"

}}
>

<h2>
Employee Reports
</h2>

<br/>

<table
style={{
width:"100%"
}}
>

<thead>

<tr>

<th>Name</th>
<th>Email</th>
<th>Department</th>
<th>Score</th>

</tr>

</thead>

<tbody>

{

employees.map(employee=>(

<tr key={employee.id}>

<td>{employee.name}</td>

<td>{employee.email}</td>

<td>{employee.department}</td>

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


const buttonStyle={

padding:"14px",

border:"none",

borderRadius:"10px",

background:"#2563eb",

color:"white",

fontWeight:"bold",

cursor:"pointer"

};


export default Reports;
