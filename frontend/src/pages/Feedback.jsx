import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";

function Feedback() {

const [loading,setLoading]=useState(true);

const [employees,setEmployees]=useState([]);

const [feedbackList,setFeedbackList]=useState([]);

const [formData,setFormData]=useState({

employeeId:"",
comment:"",
rating:"5"

});


useEffect(()=>{

loadData();

},[]);



const getHeaders=()=>({

headers:{
Authorization:
`Bearer ${localStorage.getItem("token")}`
}

});



const loadData=async()=>{

try{

const [

employeeResponse,
feedbackResponse

]=await Promise.all([

axios.get(
"import.meta.env.VITE_API_URL/employees",
getHeaders()
),

axios.get(
"import.meta.env.VITE_API_URL/feedback",
getHeaders()
)

]);


setEmployees(
employeeResponse.data.data || []
);

setFeedbackList(
feedbackResponse.data.data || []
);

}
catch(error){

console.log(error);

}
finally{

setLoading(false);

}

};



const addFeedback=async()=>{

if(

!formData.employeeId ||
!formData.comment

){

alert(
"Please fill all fields"
);

return;

}

try{

await axios.post(

"import.meta.env.VITE_API_URL/feedback",

{

employeeId:Number(
formData.employeeId
),

comment:
formData.comment,

rating:Number(
formData.rating
)

},

getHeaders()

);


alert(
"Feedback Added Successfully"
);


setFormData({

employeeId:"",
comment:"",
rating:"5"

});


loadData();

}
catch(error){

console.log(error);

alert(

error.response?.data?.message ||

"Failed to add feedback"

);

}

};



if(loading){

return <Loader/>;

}



return(

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
⭐ Employee Feedback
</h1>

<br/>


<div style={formBox}>

<h2>
Add Feedback
</h2>

<br/>


<select

value={formData.employeeId}

onChange={(e)=>

setFormData({

...formData,
employeeId:e.target.value

})

}

style={inputStyle}

>

<option value="">
Select Employee
</option>

{

employees.map(employee=>(

<option
key={employee.id}
value={employee.id}
>

{employee.name}

</option>

))

}

</select>



<textarea

placeholder="Write feedback"

value={formData.comment}

onChange={(e)=>

setFormData({

...formData,
comment:e.target.value

})

}

style={{

...inputStyle,
height:"100px"

}}

></textarea>



<select

value={formData.rating}

onChange={(e)=>

setFormData({

...formData,
rating:e.target.value

})

}

style={inputStyle}

>

<option value="1">⭐ 1</option>
<option value="2">⭐⭐ 2</option>
<option value="3">⭐⭐⭐ 3</option>
<option value="4">⭐⭐⭐⭐ 4</option>
<option value="5">⭐⭐⭐⭐⭐ 5</option>

</select>



<button

onClick={addFeedback}

style={buttonStyle}

>

Submit Feedback

</button>

</div>



<div style={formBox}>

<h2>
Feedback History
</h2>

<br/>

{

feedbackList.length===0

?

<p>
No feedback available
</p>

:

feedbackList.map(item=>(

<div
key={item.id}
style={feedbackCard}
>

<h3>

👤 {item.employee?.name}

</h3>

<p>

{item.comment}

</p>

<p>

⭐ {item.rating}/5

</p>

</div>

))

}

</div>

</div>

</div>

);

}



const formBox={

background:"white",
padding:"25px",
borderRadius:"15px",
marginBottom:"20px",

boxShadow:
"0 4px 10px rgba(0,0,0,0.1)"

};



const inputStyle={

width:"100%",
padding:"12px",
marginBottom:"15px",

border:"1px solid #ddd",

borderRadius:"10px"

};



const buttonStyle={

padding:"12px 20px",

background:"#2563eb",

color:"white",

border:"none",

borderRadius:"10px",

cursor:"pointer",

fontWeight:"bold"

};



const feedbackCard={

padding:"15px",

border:"1px solid #ddd",

marginBottom:"10px",

borderRadius:"10px"

};


export default Feedback;
