import {
BrowserRouter,
Routes,
Route,
Navigate
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import EmployeeList from "./pages/EmployeeList";
import AddEmployee from "./pages/AddEmployee";
import Analytics from "./pages/Analytics";
import AIRecommendations from "./pages/AIRecommendations";
import Notifications from "./pages/Notifications";
import TestingMetrics from "./pages/TestingMetrics";
import Charts from "./pages/Charts";
import Tasks from "./pages/Tasks";
import Reports from "./pages/Reports";
import Feedback from "./pages/Feedback";

import ProtectedRoute from "./components/ProtectedRoute";


function App(){

return(

<BrowserRouter>

<Routes>

{/* Public */}

<Route
path="/"
element={<Login/>}
/>

<Route
path="/login"
element={<Login/>}
/>

<Route
path="/register"
element={<Register/>}
/>


{/* Protected */}

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
path="/tasks"
element={
<ProtectedRoute>
<Tasks/>
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
path="/reports"
element={
<ProtectedRoute>
<Reports/>
</ProtectedRoute>
}
/>

<Route
path="/feedback"
element={
<ProtectedRoute>
<Feedback/>
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
path="/charts"
element={
<ProtectedRoute>
<Charts/>
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


{/* Invalid routes */}

<Route
path="*"
element={
<Navigate
to="/login"
replace
/>
}
/>

</Routes>

</BrowserRouter>

);

}

export default App;
