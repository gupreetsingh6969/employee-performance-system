import { useState } from "react";

function Achievements(){

const [achievementList,setAchievementList]=useState([

{
id:1,
employee:"John",
achievement:"Employee of the Month"
},

{
id:2,
employee:"Sarah",
achievement:"Best Team Contributor"
}

]);

const addAchievement=()=>{

const newAchievement={

id:Date.now(),
employee:"New Employee",
achievement:"Project Excellence Award"

};

setAchievementList([
...achievementList,
newAchievement
]);

};

return(

<div style={{padding:"20px"}}>

<h1>
Achievements
</h1>

<br/>

<button
onClick={addAchievement}
style={{
padding:"10px",
cursor:"pointer"
}}
>
Add Achievement
</button>

<br/><br/>

{

achievementList.map((item)=>(

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

<p>{item.achievement}</p>

</div>

))

}

</div>

);

}

export default Achievements;
