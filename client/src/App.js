import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import AppNavbar from "./components/AppNavbar";
import AdminDashboard from "./screens/AdminDashboard";
import HomeScreen from "./screens/HomeScreen";
import Login from "./screens/Login";
import AdminLogin from "./screens/AdminLogin";
import Signup from "./screens/Signup";
import StudentDashboard from "./screens/StudentDashboard";
import { UserProvider } from "./context/UserContext";
import { AdminProvider } from "./context/AdminContext";

function App() {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);

  return (
    <div className="App">
      <UserProvider value={{ user, setUser }}>
        <Router>
          <AdminProvider value={{ admin, setAdmin }}>
            <AppNavbar />
          </AdminProvider>
          <Switch>
            <Route path="/" exact component={HomeScreen} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/login" exact component={Login} />
            <Route path="/dashboard" exact component={StudentDashboard} />
            <AdminProvider value={{ admin, setAdmin }}>
              <Route path="/admin-login" exact component={AdminLogin} />
              <Route path="/admin-dashboard" exact component={AdminDashboard} />
            </AdminProvider>
          </Switch>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
