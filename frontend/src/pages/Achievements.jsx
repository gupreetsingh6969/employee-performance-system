import { useState } from "react";

function Achievements() {

const [achievements,setAchievements]=useState([]);
const [title,setTitle]=useState("");

const addAchievement=()=>{

if(!title) return;

setAchievements([
...achievements,
{
id:Date.now(),
title
}
]);

setTitle("");

};

return(

<div style={{padding:"20px"}}>

<h1>Employee Achievements</h1>

<input
type="text"
placeholder="Achievement"
value={title}
onChange={(e)=>setTitle(e.target.value)}
/>

<button
onClick={addAchievement}
style={{marginLeft:"10px"}}
>
Add
</button>

<hr/>

{
achievements.map((item)=>(

<div
key={item.id}
style={{
border:"1px solid lightgray",
padding:"10px",
margin:"10px"
}}
>

🏆 {item.title}

</div>

))
}

</div>

);

}

export default Achievements;