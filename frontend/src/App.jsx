import React, { useEffect, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./LogIn";
import Register from "./Register";
import Profile from "./components/profile";
import { auth } from "./components/firebase";
import Home from "./pages/Home";
import FishList from "./pages/FishList";
import PlantList from "./pages/PlantList";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  return (
    <Router>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route
                path="/"
                element={user ? <Navigate to="/home" /> : <Login />}
              />
              <Route
                path="/login"
                element={user ? <Navigate to="/home" /> : <Login />}
              />
              <Route path="/register" element={<Register />} />
              <Route
                path="/profile"
                element={user ? <Profile /> : <Navigate to="/login" />}
              />
              <Route
                path="/home"
                element={user ? <Home /> : <Navigate to="/login" />}
              />
              <Route
                path="/allfish"
                element={user ? <FishList /> : <Navigate to="/login" />}
              />
              <Route
                path="/allplant"
                element={user ? <PlantList /> : <Navigate to="/login" />}
              />
            </Routes>
            <ToastContainer />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
