const currentRole = localStorage.getItem("userRole");

<div
style={{
display:"flex",
flexDirection:"column",
gap:"15px"
}}
>

<Link style={{color:"white"}} to="/dashboard">
Dashboard
</Link>

{
currentRole==="ADMIN" && (

<>

<Link
style={{color:"white"}}
to="/employees"
>
Employees
</Link>

<Link
style={{color:"white"}}
to="/tasks"
>
Tasks
</Link>

</>

)

}

<Link style={{color:"white"}} to="/performance">
Performance
</Link>

<Link style={{color:"white"}} to="/notifications">
Notifications
</Link>

<Link style={{color:"white"}} to="/ai">
AI Recommendations
</Link>

<Link style={{color:"white"}} to="/achievements">
Achievements
</Link>

</div>