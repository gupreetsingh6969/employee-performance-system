import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EmployeeList from "./pages/EmployeeList";
import AddEmployee from "./pages/AddEmployee";
import Analytics from "./pages/Analytics";
import AIRecommendations from "./pages/AIRecommendations";
import Notifications from "./pages/Notifications";
import TestingMetrics from "./pages/TestingMetrics";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

return(

<BrowserRouter>

<Routes>

<Route
path="/"
element={<Login/>}
/>

<Route
path="/dashboard"
element={
<ProtectedRoute>
<Dashboard/>
</ProtectedRoute>
}
/>

<Route
path="/employees"
element={
<ProtectedRoute>
<EmployeeList/>
</ProtectedRoute>
}
/>

<Route
path="/add-employee"
element={
<ProtectedRoute>
<AddEmployee/>
</ProtectedRoute>
}
/>

<Route
path="/analytics"
element={
<ProtectedRoute>
<Analytics/>
</ProtectedRoute>
}
/>

<Route
path="/ai"
element={
<ProtectedRoute>
<AIRecommendations/>
</ProtectedRoute>
}
/>

<Route
path="/notifications"
element={
<ProtectedRoute>
<Notifications/>
</ProtectedRoute>
}
/>

<Route
path="/testing"
element={
<ProtectedRoute>
<TestingMetrics/>
</ProtectedRoute>
}
/>

</Routes>

</BrowserRouter>

);

}

export default App;