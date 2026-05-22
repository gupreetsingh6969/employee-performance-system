import { useEffect, useState } from "react";

function Achievements() {

const [achievements,setAchievements]=useState([]);
const [title,setTitle]=useState("");

useEffect(()=>{

const storedAchievements =
JSON.parse(
localStorage.getItem("achievements")
) || [];

setAchievements(storedAchievements);

},[]);

const addAchievement=()=>{

if(!title.trim()) return;

const newAchievement={

id:Date.now(),
title:title.trim()

};

const updatedAchievements=[

...achievements,
newAchievement

];

setAchievements(updatedAchievements);

localStorage.setItem(
"achievements",
JSON.stringify(updatedAchievements)
);

setTitle("");

};

const deleteAchievement=(id)=>{

const updatedAchievements=
achievements.filter(
(item)=>
item.id!==id
);

setAchievements(updatedAchievements);

localStorage.setItem(
"achievements",
JSON.stringify(updatedAchievements)
);

};

return(

<div style={{padding:"20px"}}>

<h1>Employee Achievements</h1>

<input
type="text"
placeholder="Achievement"
value={title}
onChange={(e)=>
setTitle(e.target.value)
}
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
margin:"10px",
borderRadius:"8px"
}}
>

🏆 {item.title}

<button
onClick={()=>
deleteAchievement(item.id)
}
style={{
marginLeft:"20px"
}}
>

Delete

</button>

</div>

))

}

</div>

);

}

export default Achievements;