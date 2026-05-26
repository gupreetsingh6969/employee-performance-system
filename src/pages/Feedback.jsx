import { useState } from "react";

function Feedback(){

const [feedbackList,setFeedbackList]=useState([

{
id:1,
employee:"John",
feedback:"Excellent communication skills"
},

{
id:2,
employee:"Sarah",
feedback:"Needs additional training in reporting"
}

]);

const addFeedback=()=>{

const newFeedback={

id:Date.now(),
employee:"New Employee",
feedback:"Good performance improvement"

};

setFeedbackList([
...feedbackList,
newFeedback
]);

};

return(

<div style={{padding:"20px"}}>

<h1>
Employee Feedback
</h1>

<br/>

<button
onClick={addFeedback}
style={{
padding:"10px",
cursor:"pointer"
}}
>
Add Feedback
</button>

<br/><br/>

{

feedbackList.map((item)=>(

<div
key={item.id}
style={{
border:"1px solid #d1d5db",
padding:"15px",
marginBottom:"10px",
borderRadius:"10px"
}}
>

<h3>{item.employee}</h3>

<p>{item.feedback}</p>

</div>

))

}

</div>

);

}

export default Feedback;
