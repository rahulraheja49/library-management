import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import AppNavbar from "./components/AppNavbar";
import AdminDashboard from "./screens/AdminDashboard";
import HomeScreen from "./screens/HomeScreen";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import StudentDashboard from "./screens/StudentDashboard";
import { UserProvider } from "./context/UserContext";

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <UserProvider value={{ user, setUser }}>
        <Router>
          <AppNavbar />
          <Switch>
            <Route path="/" exact component={HomeScreen} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/login" exact component={Login} />
            <Route path="/dashboard" exact component={StudentDashboard} />
            <Route path="/admin-dashboard" exact component={AdminDashboard} />
          </Switch>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
