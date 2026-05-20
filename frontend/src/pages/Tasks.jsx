import { useEffect, useState } from "react";
import api from "../services/api";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [deadline, setDeadline] = useState("");
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    loadTasks();
    loadEmployees();
  }, []);

  const loadTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadEmployees = async () => {
    try {
      const res = await api.get("/users");
      setEmployees(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddTask = async () => {
    try {
      await api.post("/tasks", { title, description, employeeId, deadline });
      setTitle(""); setDescription(""); setEmployeeId(""); setDeadline("");
      loadTasks();
    } catch (err) { console.log(err); }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      loadTasks();
    } catch (err) { console.log(err); }
  };

  const toggleStatus = async (task) => {
    try {
      const newStatus = task.status === "Completed" ? "Pending" : "Completed";
      await api.put(`/tasks/${task.id}`, { status: newStatus });
      loadTasks();
    } catch (err) { console.log(err); }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Tasks Management</h1>

      <div style={{ marginBottom: "20px" }}>
        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <select value={employeeId} onChange={(e) => setEmployeeId(e.target.value)}>
          <option value="">Select Employee</option>
          {employees.map(emp => <option key={emp.id} value={emp.id}>{emp.name}</option>)}
        </select>
        <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      {tasks.map(task => (
        <div key={task.id} style={{ border: "1px solid lightgray", padding: "10px", margin: "10px" }}>
          <p><b>Title:</b> {task.title}</p>
          <p><b>Description:</b> {task.description}</p>
          <p><b>Assigned To:</b> {task.employee?.name}</p>
          <p><b>Status:</b> {task.status}</p>
          <p><b>Deadline:</b> {new Date(task.deadline).toLocaleDateString()}</p>
          <button onClick={() => toggleStatus(task)}>Toggle Status</button>
          <button onClick={() => handleDelete(task.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Tasks;