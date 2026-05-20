import { useEffect, useState } from "react";
import api from "../services/api";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

function Dashboard() {
  const [stats, setStats] = useState({});
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const dashboardRes = await api.get("/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const usersRes = await api.get("/users");

      setStats(dashboardRes.data);
      setEmployees(usersRes.data);

    } catch (error) {
      console.log(error);
    }
  };

  // Charts data
  const taskChartData = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        label: "Tasks",
        data: [
          stats.completedTasks || 0,
          (stats.totalTasks || 0) -
          (stats.completedTasks || 0)
        ],
        backgroundColor: [
          "#4caf50",
          "#ff9800"
        ]
      }
    ]
  };

  const employeeChartData = {
    labels: [
      "Employees",
      "Reviews"
    ],
    datasets: [
      {
        label: "Analytics",
        data: [
          stats.totalEmployees || 0,
          stats.totalReviews || 0
        ],
        backgroundColor: [
          "#2196f3",
          "#9c27b0"
        ]
      }
    ]
  };

  return (
    <div style={{ padding: "20px" }}>

      <h1 style={{ textAlign: "center" }}>
        Employee Performance Dashboard
      </h1>

      {/* Stats Boxes */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "30px"
        }}
      >

        <div
          style={{
            border: "1px solid gray",
            padding: "20px",
            width: "200px",
            textAlign: "center"
          }}
        >
          <h3>Total Employees</h3>
          <h1>{stats.totalEmployees}</h1>
        </div>

        <div
          style={{
            border: "1px solid gray",
            padding: "20px",
            width: "200px",
            textAlign: "center"
          }}
        >
          <h3>Total Tasks</h3>
          <h1>{stats.totalTasks}</h1>
        </div>

        <div
          style={{
            border: "1px solid gray",
            padding: "20px",
            width: "200px",
            textAlign: "center"
          }}
        >
          <h3>Completed Tasks</h3>
          <h1>{stats.completedTasks}</h1>
        </div>

        <div
          style={{
            border: "1px solid gray",
            padding: "20px",
            width: "200px",
            textAlign: "center"
          }}
        >
          <h3>Total Reviews</h3>
          <h1>{stats.totalReviews}</h1>
        </div>

      </div>

      <hr />

      {/* Charts */}

      <h2>Analytics Dashboard</h2>

      <div
        style={{
          display: "flex",
          gap: "50px",
          flexWrap: "wrap",
          justifyContent: "center"
        }}
      >

        <div style={{ width: "400px" }}>
          <Bar data={employeeChartData}/>
        </div>

        <div style={{ width: "400px" }}>
          <Pie data={taskChartData}/>
        </div>

      </div>

      <hr />

      {/* Navigation Buttons */}

      <h2 style={{ textAlign:"center" }}>
        Quick Access
      </h2>

      <div
        style={{
          margin:"20px 0",
          display:"flex",
          gap:"15px",
          justifyContent:"center",
          flexWrap:"wrap"
        }}
      >

        <button
          onClick={() =>
            window.location.href="/employees"
          }
        >
          Employees
        </button>

        <button
          onClick={() =>
            window.location.href="/tasks"
          }
        >
          Tasks
        </button>

        <button
          onClick={() =>
            window.location.href="/performance"
          }
        >
          Performance
        </button>

        <button
          onClick={() =>
            window.location.href="/notifications"
          }
        >
          Notifications
        </button>

        <button
          onClick={() =>
            window.location.href="/ai"
          }
        >
          AI Recommendations
        </button>

      </div>

      <hr />

      {/* Employee List */}

      <h2>Employee List</h2>

      {employees.map((emp) => (

        <div
          key={emp.id}
          style={{
            border:"1px solid lightgray",
            padding:"10px",
            margin:"10px"
          }}
        >

          <p>
            <b>Name:</b> {emp.name}
          </p>

          <p>
            <b>Email:</b> {emp.email}
          </p>

          <p>
            <b>Role:</b> {emp.role}
          </p>

        </div>

      ))}

    </div>
  );
}

export default Dashboard;