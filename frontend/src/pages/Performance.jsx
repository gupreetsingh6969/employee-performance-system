import { useState } from "react";

function Performance(){

const [reviewData,setReviewData] = useState({

employeeName:"",
rating:"",
kpi:"",
feedback:""

});

const [performanceList,setPerformanceList] = useState([]);


const savePerformance = ()=>{

if(
!reviewData.employeeName ||
!reviewData.rating ||
!reviewData.kpi
){

alert("Please fill required fields");

return;

}

const newEntry={

id:Date.now(),

employeeName:reviewData.employeeName,

rating:reviewData.rating,

kpi:reviewData.kpi,

feedback:reviewData.feedback

};

setPerformanceList([

...performanceList,
newEntry

]);

setReviewData({

employeeName:"",
rating:"",
kpi:"",
feedback:""

});

};



return(

<div style={{padding:"20px"}}>

<h1>
Performance Monitoring
</h1>

<input
type="text"
placeholder="Employee Name"
value={reviewData.employeeName}
onChange={(e)=>
setReviewData({

...reviewData,
employeeName:e.target.value

})
}
/>

<br/><br/>

<input
type="number"
placeholder="Rating (1-10)"
value={reviewData.rating}
onChange={(e)=>
setReviewData({

...reviewData,
rating:e.target.value

})
}
/>

<br/><br/>

<input
type="text"
placeholder="KPI Score"
value={reviewData.kpi}
onChange={(e)=>
setReviewData({

...reviewData,
kpi:e.target.value

})
}
/>

<br/><br/>

<textarea
placeholder="Feedback"
value={reviewData.feedback}
onChange={(e)=>
setReviewData({

...reviewData,
feedback:e.target.value

})
}
/>

<br/><br/>

<button
onClick={savePerformance}
>

Save Review

</button>

<hr/>

<h2>
Performance Records
</h2>

{

performanceList.map((record)=>(

<div
key={record.id}
style={{
border:"1px solid #d1d5db",
padding:"15px",
marginBottom:"10px"
}}
>

<h3>{record.employeeName}</h3>

<p>Rating: {record.rating}</p>

<p>KPI: {record.kpi}</p>

<p>Feedback: {record.feedback}</p>

</div>

))

}

</div>

);

}

export default Performance;