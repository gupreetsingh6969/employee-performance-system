import { useState } from "react";

function Achievements(){

const [achievementInfo,setAchievementInfo] = useState({

employee:"",
title:"",
description:""

});

const [achievementList,setAchievementList] = useState([]);


const addAchievement=()=>{

if(
!achievementInfo.employee ||
!achievementInfo.title
){

alert("Required fields missing");

return;

}

const newAchievement={

id:Date.now(),

employee:achievementInfo.employee,

title:achievementInfo.title,

description:achievementInfo.description

};

setAchievementList([

...achievementList,
newAchievement

]);

setAchievementInfo({

employee:"",
title:"",
description:""

});

};



const deleteAchievement=(id)=>{

const updated=

achievementList.filter(

(item)=>item.id!==id

);

setAchievementList(updated);

};



return(

<div style={{padding:"20px"}}>

<h1>
Employee Achievements
</h1>

<input
type="text"
placeholder="Employee Name"
value={achievementInfo.employee}
onChange={(e)=>
setAchievementInfo({

...achievementInfo,
employee:e.target.value

})
}
/>

<br/><br/>

<input
type="text"
placeholder="Achievement Title"
value={achievementInfo.title}
onChange={(e)=>
setAchievementInfo({

...achievementInfo,
title:e.target.value

})
}
/>

<br/><br/>

<textarea
placeholder="Description"
value={achievementInfo.description}
onChange={(e)=>
setAchievementInfo({

...achievementInfo,
description:e.target.value

})
}
/>

<br/><br/>

<button
onClick={addAchievement}
>

Add Achievement

</button>

<hr/>

<h2>
Achievement Records
</h2>

{

achievementList.map((item)=>(

<div
key={item.id}
style={{
border:"1px solid gray",
padding:"15px",
marginBottom:"10px"
}}
>

<h3>{item.title}</h3>

<p>Employee: {item.employee}</p>

<p>{item.description}</p>

<button
onClick={()=>
deleteAchievement(item.id)
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

export default Achievements;