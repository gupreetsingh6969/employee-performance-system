import { useState } from "react";

function Employee(){

const [searchText,setSearchText]=useState("");

const [employeeList,setEmployeeList]=useState([

{
id:1,
name:"John Smith",
email:"john@gmail.com",
department:"HR"
},

{
id:2,
name:"Sarah Lee",
email:"sarah@gmail.com",
department:"Manager"
},

{
id:3,
name:"David Wilson",
email:"david@gmail.com",
department:"Employee"
}

]);


const removeEmployee=(id)=>{

const updatedEmployees=

employeeList.filter(
(employee)=>employee.id!==id
);

setEmployeeList(
updatedEmployees
);

};


const filteredEmployees=

employeeList.filter((employee)=>

employee.name
.toLowerCase()
.includes(
searchText.toLowerCase()
)

);


return(

<div style={{padding:"20px"}}>

<h1>Employee Management</h1>

<input

type="text"

placeholder="Search employee"

value={searchText}

onChange={(e)=>
setSearchText(
e.target.value
)
}

style={{
padding:"10px",
width:"250px"
}}

/>

<br/><br/>


{

filteredEmployees.map((employee)=>(

<div

key={employee.id}

style={{

border:"1px solid gray",
padding:"15px",
marginBottom:"10px",
borderRadius:"10px"

}}

>

<p>Name: {employee.name}</p>

<p>Email: {employee.email}</p>

<p>Department: {employee.department}</p>

<button
onClick={()=>
removeEmployee(employee.id)
}
>

Delete

</button>

</div>

))

}

</div>

);

}

export default Employee;