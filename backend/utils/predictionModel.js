export const predictPerformance=(employees)=>{

return employees.map((employee)=>{

let prediction="";

if(employee.score>=85){

prediction="High Performer";

}
else if(employee.score>=60){

prediction="Average Performer";

}
else{

prediction="Needs Training";

}

return{

...employee,
prediction

};

});

};
