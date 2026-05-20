import { useEffect, useState } from "react";
import api from "../services/api";

function Performance() {

const [reviews, setReviews] = useState([]);
const [rating, setRating] = useState("");
const [feedback, setFeedback] = useState("");
const [editId, setEditId] = useState(null);

useEffect(() => {
fetchReviews();
}, []);

const fetchReviews = async () => {

try{

const response = await api.get("/performance");

setReviews(response.data);

}catch(error){

console.log(error);

}

};

const saveReview = async()=>{

try{

if(rating===""){

alert("Rating required");

return;

}

if(feedback.trim()===""){

alert("Feedback required");

return;

}

if(editId){

await api.put(`/performance/${editId}`,{

rating,
feedback

});

setEditId(null);

}else{

await api.post("/performance",{

rating,
feedback

});

}

setRating("");
setFeedback("");

fetchReviews();

}catch(error){

console.log(error);

}

};

const editReview=(review)=>{

setRating(review.rating);
setFeedback(review.review);

setEditId(review.id);

};

const deleteReview=async(id)=>{

try{

await api.delete(`/performance/${id}`);

fetchReviews();

}catch(error){

console.log(error);

}

};

return(

<div>

<h1>Performance Reviews</h1>

<input
type="number"
placeholder="Rating"
value={rating}
onChange={(e)=>setRating(e.target.value)}
/>

<br/><br/>

<input
type="text"
placeholder="Feedback"
value={feedback}
onChange={(e)=>setFeedback(e.target.value)}
/>

<br/><br/>

<button onClick={saveReview}>
{editId ? "Update Review" : "Add Review"}
</button>

<hr/>

{

reviews.length===0 ? (

<p>No Reviews Found</p>

) : (

reviews.map((review)=>(

<div
key={review.id}
style={{
border:"1px solid gray",
padding:"10px",
margin:"10px"
}}
>

<h3>
Rating: {review.rating}
</h3>

<p>
Feedback: {review.review}
</p>

<button
onClick={()=>editReview(review)}
>
Edit
</button>

{" "}

<button
onClick={()=>deleteReview(review.id)}
>
Delete
</button>

</div>

))

)

}

</div>

);

}

export default Performance;