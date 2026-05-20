import { useEffect, useState } from "react";
import api from "../services/api";

function AIRecommendations() {
  const [data, setData] = useState([]);

  useEffect(() => { loadAI(); }, []);

  const loadAI = async () => {
    try {
      const res = await api.get("/ai/recommendations");
      setData(res.data.data || res.data);
    } catch (err) { console.log(err); }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>AI Recommendations</h1>
      {data.length === 0 ? <p>No recommendations</p> :
        data.map((d, i) => (
          <div key={i} style={{border:"1px solid gray", margin:"10px", padding:"10px"}}>
            <p><b>Employee:</b> {d.employee}</p>
            <p><b>Rating:</b> {d.rating}</p>
            <p><b>Prediction:</b> {d.prediction}</p>
            <p><b>Recommendation:</b> {d.recommendation}</p>
          </div>
        ))
      }
    </div>
  );
}

export default AIRecommendations;