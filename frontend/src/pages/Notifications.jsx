import { useEffect, useState } from "react";
import api from "../services/api";

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => { loadNotifications(); }, []);

  const loadNotifications = async () => {
    try {
      const res = await api.get("/notifications");
      setNotifications(res.data);
    } catch (err) { console.log(err); }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Notifications</h1>
      {notifications.length === 0 ? <p>No notifications</p> :
        notifications.map((n, i) => (
          <div key={i} style={{border:"1px solid gray", padding:"10px", margin:"10px"}}>
            <p><b>Employee:</b> {n.employee}</p>
            <p>{n.message}</p>
          </div>
        ))
      }
    </div>
  );
}

export default Notifications;