import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {

  const [stats, setStats] = useState({});
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {

      const token = localStorage.getItem("token");

      console.log("TOKEN:", token);

      const dashboardRes = await api.get(
        "/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log("Dashboard Data:", dashboardRes.data);

      const usersRes = await api.get("/users");

      console.log("Users:", usersRes.data);

      setStats(dashboardRes.data);
      setEmployees(usersRes.data);

    } catch(error) {

      console.log("FULL ERROR:", error);

    }
  };

  return (
    <div>

      <h1>Admin Dashboard</h1>

      <h3>Total Employees: {stats.totalEmployees}</h3>
      <h3>Total Tasks: {stats.totalTasks}</h3>
      <h3>Completed Tasks: {stats.completedTasks}</h3>
      <h3>Pending Tasks: {stats.pendingTasks}</h3>
      <h3>Total Reviews: {stats.totalReviews}</h3>

      <hr/>

      <h2>Employees</h2>

      {employees.map((emp)=>(
        <p key={emp.id}>
          {emp.name} | {emp.email}
        </p>
      ))}

    </div>
  );
}

export default Dashboard;