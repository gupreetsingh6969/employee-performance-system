const userAccessLevel = localStorage.getItem("userRole");

<div
style={{
display:"flex",
flexDirection:"column",
rowGap:"15px"
}}
>

<Link
style={{color:"white"}}
to="/dashboard"
>
Dashboard
</Link>


{
userAccessLevel==="ADMIN"
?

<div
style={{
display:"flex",
flexDirection:"column",
rowGap:"15px"
}}
>

<Link
style={{color:"white"}}
to="/employees"
>
Employee Management
</Link>

<Link
style={{color:"white"}}
to="/tasks"
>
Task Management
</Link>

</div>

:null
}


<Link
style={{color:"white"}}
to="/performance"
>
Performance
</Link>


<Link
style={{color:"white"}}
to="/notifications"
>
Notifications
</Link>


<Link
style={{color:"white"}}
to="/ai"
>
AI Recommendations
</Link>


<Link
style={{color:"white"}}
to="/achievements"
>
Achievements
</Link>


<Link
style={{color:"white"}}
to="/testing"
>
Testing Metrics
</Link>

</div>