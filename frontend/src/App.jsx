import {
BrowserRouter,
Routes,
Route
} from "react-router-dom";

import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Employee from "./pages/Employee";
import Tasks from "./pages/Tasks";
import Performance from "./pages/Performance";

function App() {

return (

<BrowserRouter>

<Navbar />

<Routes>

<Route
path="/"
element={<Login />}
/>

<Route
path="/dashboard"
element={
<PrivateRoute>
<Dashboard />
</PrivateRoute>
}
/>

<Route
path="/employees"
element={
<PrivateRoute>
<Employee />
</PrivateRoute>
}
/>

<Route
path="/tasks"
element={
<PrivateRoute>
<Tasks />
</PrivateRoute>
}
/>

<Route
path="/performance"
element={
<PrivateRoute>
<Performance />
</PrivateRoute>
}
/>

</Routes>

</BrowserRouter>

);

}

export default App;