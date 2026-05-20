import { useEffect, useState } from "react";
import api from "../services/api";

function Performance() {
  const [performances, setPerformances] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [rating, setRating] = useState(0);
  const [kpi, setKpi] = useState("");
  const [review, setReview] = useState("");

  useEffect(() => {
    loadPerformances();
    loadEmployees();
  }, []);

  const loadPerformances = async () => {
    try {
      const res = await api.get("/performance");
      setPerformances(res.data);
    } catch (err) { console.log(err); }
  };

  const loadEmployees = async () => {
    try {
      const res = await api.get("/users");
      setEmployees(res.data);
    } catch (err) { console.log(err); }
  };

  const handleAddPerformance = async () => {
    try {
      await api.post("/performance", { employeeId, rating, kpi, review });
      setEmployeeId(""); setRating(0); setKpi(""); setReview("");
      loadPerformances();
    } catch (err) { console.log(err); }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/performance/${id}`);
      loadPerformances();
    } catch (err) { console.log(err); }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Performance Reviews</h1>

      <div style={{ marginBottom: "20px" }}>
        <select value={employeeId} onChange={(e) => setEmployeeId(e.target.value)}>
          <option value="">Select Employee</option>
          {employees.map(emp => <option key={emp.id} value={emp.id}>{emp.name}</option>)}
        </select>
        <input type="number" placeholder="Rating" value={rating} onChange={(e) => setRating(Number(e.target.value))} />
        <input placeholder="KPI" value={kpi} onChange={(e) => setKpi(e.target.value)} />
        <input placeholder="Review" value={review} onChange={(e) => setReview(e.target.value)} />
        <button onClick={handleAddPerformance}>Add Review</button>
      </div>

      {performances.map(p => (
        <div key={p.id} style={{ border: "1px solid lightgray", padding: "10px", margin: "10px" }}>
          <p><b>Employee:</b> {p.employee?.name}</p>
          <p><b>Rating:</b> {p.rating}</p>
          <p><b>KPI:</b> {p.kpi}</p>
          <p><b>Review:</b> {p.review}</p>
          <p><b>Reviewed on:</b> {new Date(p.reviewDate).toLocaleDateString()}</p>
          <button onClick={() => handleDelete(p.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Performance;