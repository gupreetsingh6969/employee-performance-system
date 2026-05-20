import { useState } from "react";
import api from "../services/api";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!name || !email || !password) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/api/auth/register", {
        name: name.trim(),
        email: email.trim(),
        password: password.trim(),
        role: "ADMIN"
      });

      console.log("Signup Success:", response.data);
      alert(response.data.message || "Signup Successful");
      window.location.href = "/";

    } catch (error) {
      console.error("Signup Error Full:", error);
      console.error("Signup Error Response:", error.response);

      alert(
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Signup Failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "100px"
      }}
    >
      <h1>Admin Signup</h1>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: "10px", width: "250px" }}
      />

      <br />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: "10px", width: "250px" }}
      />

      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ padding: "10px", width: "250px" }}
      />

      <br />

      <button
        onClick={handleSignup}
        disabled={loading}
        style={{ padding: "10px", width: "120px" }}
      >
        {loading ? "Creating..." : "Sign Up"}
      </button>
    </div>
  );
}

export default Signup;