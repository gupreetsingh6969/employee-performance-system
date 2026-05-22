import { useEffect, useState } from "react";

function Performance() {

const [reviews,setReviews]=useState([]);
const [employees,setEmployees]=useState([]);

const [employeeId,setEmployeeId]=useState("");
const [rating,setRating]=useState("");
const [kpi,setKpi]=useState("");
const [review,setReview]=useState("");

useEffect(()=>{

const storedEmployees =
JSON.parse(
localStorage.getItem("employees")
) || [];

const storedReviews =
JSON.parse(
localStorage.getItem("reviews")
) || [];

setEmployees(storedEmployees);
setReviews(storedReviews);

},[]);

const handleAddReview=()=>{

if(
!employeeId ||
!rating ||
!kpi ||
!review
){
return;
}

const selectedEmployee =
employees.find(
(emp)=>
emp.id===Number(employeeId)
);

const newReview={

id:Date.now(),

employeeName:selectedEmployee.name,

rating,

kpi,

review,

reviewDate:new Date()

};

const updatedReviews=[

...reviews,
newReview

];

setReviews(updatedReviews);

localStorage.setItem(
"reviews",
JSON.stringify(updatedReviews)
);

setEmployeeId("");
setRating("");
setKpi("");
setReview("");

};

const handleDelete=(id)=>{

const updatedReviews=
reviews.filter(
(item)=>
item.id!==id
);

setReviews(updatedReviews);

localStorage.setItem(
"reviews",
JSON.stringify(updatedReviews)
);

};

return(

<div style={{padding:"20px"}}>

<h1>Performance Reviews</h1>

<div style={{marginBottom:"20px"}}>

<select
value={employeeId}
onChange={(e)=>
setEmployeeId(e.target.value)
}
>

<option value="">
Select Employee
</option>

{

employees.map((emp)=>(

<option
key={emp.id}
value={emp.id}
>

{emp.name}

</option>

))

}

</select>

<input
type="number"
placeholder="Rating"
value={rating}
onChange={(e)=>
setRating(e.target.value)
}
/>

<input
placeholder="KPI"
value={kpi}
onChange={(e)=>
setKpi(e.target.value)
}
/>

<input
placeholder="Review"
value={review}
onChange={(e)=>
setReview(e.target.value)
}
/>

<button onClick={handleAddReview}>
Add Review
</button>

</div>

{

reviews.map((item)=>(

<div
key={item.id}
style={{
border:"1px solid lightgray",
padding:"10px",
margin:"10px"
}}
>

<p>
<b>Employee:</b>
{item.employeeName}
</p>

<p>
<b>Rating:</b>
{item.rating}
</p>

<p>
<b>KPI:</b>
{item.kpi}
</p>

<p>
<b>Review:</b>
{item.review}
</p>

<p>
<b>Date:</b>

{new Date(
item.reviewDate
).toLocaleDateString()}

</p>

<button
onClick={()=>
handleDelete(item.id)
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

export default Performance;