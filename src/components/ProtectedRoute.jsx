import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

const token = localStorage.getItem("token");

console.log("Token:", token);

if (!token) {
  return <Navigate to="/login" />;
}

return children;

}

export default ProtectedRoute;


