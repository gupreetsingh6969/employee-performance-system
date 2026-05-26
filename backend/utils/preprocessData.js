export const preprocessEmployeeData=(employees)=>{

return employees.map((employee)=>({

id:employee.id,

name:employee.name,

score:
Math.min(
100,
Math.max(
0,
Number(employee.performanceScore)||0
)
),

feedback:
employee.feedback || "No Feedback",

achievements:
employee.achievements || "None",

department:
employee.department || "General"

}));

};
