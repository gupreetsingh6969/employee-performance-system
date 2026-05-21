import { useEffect, useState } from "react";
import api from "../services/api";

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const response = await api.get("/notifications");
      setNotifications(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>
        Notifications
      </h1>

      {notifications.length === 0 ? (
        <h3>No notifications available</h3>
      ) : (
        notifications.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid lightgray",
              padding: "15px",
              margin: "15px",
              borderRadius: "10px"
            }}
          >
            <h3>{item.title}</h3>

            <p>{item.message}</p>

            <small>
              {new Date(item.createdAt).toLocaleDateString()}
            </small>
          </div>
        ))
      )}
    </div>
  );
}

export default Notifications;