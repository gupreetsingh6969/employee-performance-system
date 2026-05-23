import { useState } from "react";

function Achievements(){

const [achievementList] = useState([

{
id:1,
employee:"John Smith",
achievement:"Employee of the Month"
},

{
id:2,
employee:"Sarah Lee",
achievement:"Highest Productivity Award"
},

{
id:3,
employee:"David Wilson",
achievement:"Best Team Contributor"
}

]);


return(

<div style={{padding:"20px"}}>

<h1>
Employee Achievements
</h1>

{

achievementList.map((item)=>(

<div
key={item.id}
style={{

border:"1px solid gray",
padding:"15px",
marginBottom:"10px",
borderRadius:"10px"

}}
>

<h3>
{item.employee}
</h3>

<p>
Achievement:
{item.achievement}
</p>

</div>

))

}

</div>

);

}

export default Achievements;