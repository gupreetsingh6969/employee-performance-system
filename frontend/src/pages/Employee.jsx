import { useState } from "react";

function Employee(){

const [employeeList,setEmployeeList]=useState([

{
id:1,
name:"John",
department:"Development",
rating:"92%"
},

{
id:2,
name:"Sarah",
department:"HR",
rating:"88%"
}

]);

const addEmployee=()=>{

const newEmployee={

id:Date.now(),
name:"New Employee",
department:"Training",
rating:"80%"

};

setEmployeeList([...employeeList,newEmployee]);

};

return(

<div style={{padding:"20px"}}>

<h1>
Employee Management
</h1>

<br/>

<button
onClick={addEmployee}
style={{
padding:"10px",
cursor:"pointer"
}}
>
Add Employee
</button>

<br/><br/>

{

employeeList.map((employee)=>(

<div
key={employee.id}
style={{
border:"1px solid #d1d5db",
padding:"15px",
marginBottom:"10px",
borderRadius:"10px"
}}
>

<h3>{employee.name}</h3>

<p>Department: {employee.department}</p>

<p>Performance Rating: {employee.rating}</p>

</div>

))

}

</div>

);

}

export default Employee;
