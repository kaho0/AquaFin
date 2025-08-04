import { useEffect, useState } from "react";
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
// You'll need to create these new components

import TrustedBlogs from "./pages/Blog";
import ContactPage from "./pages/ContactUs";
import AboutPage from "./pages/About";
import Cart from "./Cart";
import AdminPanel from "./pages/AdminPanel";

// import About from "./pages/About";
// import Contact from "./pages/Contact";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log(
        "App: Auth state changed",
        user ? `User: ${user.uid}` : "No user"
      );
      setUser(user);
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  return (
    <Router>
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={user ? <Profile user={user} /> : <Navigate to="/login" />}
        />
        <Route path="/allfish" element={<FishList />} />
        <Route path="/allplants" element={<PlantList />} />

        {/* New routes */}
        <Route path="/blog" element={<TrustedBlogs user={user} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route
          path="/admin"
          element={user ? <AdminPanel user={user} /> : <Navigate to="/login" />}
        />

        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
