import { useState } from "react";

function Employee() {

const [searchText,setSearchText] = useState("");

const [employeeList,setEmployeeList] = useState([

{
id:1,
name:"Gurpreet Singh",
email:"gurpreet@gmail.com",
role:"Employee"
},

{
id:2,
name:"Rahul Kumar",
email:"rahul@gmail.com",
role:"Manager"
},

{
id:3,
name:"Priya Sharma",
email:"priya@gmail.com",
role:"HR"
}

]);

const [editingId,setEditingId] = useState(null);

const [updatedName,setUpdatedName] = useState("");



const removeEmployee=(id)=>{

const filteredData=

employeeList.filter(
(item)=>item.id!==id
);

setEmployeeList(filteredData);

};



const startEdit=(employee)=>{

setEditingId(employee.id);

setUpdatedName(employee.name);

};



const saveEmployee=()=>{

const updatedList=

employeeList.map((employee)=>{

if(employee.id===editingId){

return{

...employee,
name:updatedName

};

}

return employee;

});

setEmployeeList(updatedList);

setEditingId(null);

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
placeholder="Search Employee..."
value={searchText}
onChange={(e)=>
setSearchText(e.target.value)
}
style={{
padding:"10px",
width:"300px"
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
marginBottom:"10px"
}}
>

{

editingId===employee.id ?

<div>

<input
value={updatedName}
onChange={(e)=>
setUpdatedName(
e.target.value
)
}
/>

<button
onClick={saveEmployee}
>
Save
</button>

</div>

:

<div>

<h3>{employee.name}</h3>

<p>{employee.email}</p>

<p>{employee.role}</p>

<button
onClick={()=>
startEdit(employee)
}
>

Edit

</button>

<button
style={{
marginLeft:"10px"
}}
onClick={()=>
removeEmployee(employee.id)
}
>

Delete

</button>

</div>

}

</div>

))

}

</div>

);

}

export default Employee;