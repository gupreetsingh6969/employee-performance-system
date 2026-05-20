import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Notifications from "./pages/Notifications";
import AIRecommendations from "./pages/AIRecommendations";
import Employee from "./pages/Employee";
import Tasks from "./pages/Tasks";
import Performance from "./pages/Performance";

function App() {

return (

<BrowserRouter>

<Routes>

<Route path="/" element={<Login />} />

<Route path="/signup" element={<Signup />} />

<Route path="/dashboard" element={<Dashboard />} />

<Route path="/notifications" element={<Notifications />} />

<Route path="/ai" element={<AIRecommendations />} />

<Route path="/employees" element={<Employee />} />

<Route path="/tasks" element={<Tasks />} />

<Route path="/performance" element={<Performance />} />

</Routes>

</BrowserRouter>

);

}

export default App;