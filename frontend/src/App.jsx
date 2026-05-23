const currentUserType = localStorage.getItem("userRole");

<div
style={{
display:"flex",
flexDirection:"column",
gap:"14px"
}}
>

<Link
to="/dashboard"
style={{color:"white"}}
>
Dashboard
</Link>


{currentUserType === "ADMIN" && (

<div
style={{
display:"flex",
flexDirection:"column",
gap:"14px"
}}
>

<Link
to="/employees"
style={{color:"white"}}
>
Employee Records
</Link>

<Link
to="/tasks"
style={{color:"white"}}
>
Task Center
</Link>

</div>

)}


<Link
to="/performance"
style={{color:"white"}}
>
Performance Analysis
</Link>


<Link
to="/notifications"
style={{color:"white"}}
>
Alerts & Notifications
</Link>


<Link
to="/processing"
style={{color:"white"}}
>
Data Processing
</Link>


<Link
to="/ai"
style={{color:"white"}}
>
AI Insights
</Link>


<Link
to="/achievements"
style={{color:"white"}}
>
Achievements
</Link>


<Link
to="/testing"
style={{color:"white"}}
>
Testing Reports
</Link>

</div>