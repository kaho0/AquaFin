import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./components/firebase.js";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import SignInWithGoogle from "./components/SignInWithGoogle";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("User logged in Successfully", { position: "top-center" });
      navigate("/"); // Redirect to homepage after login
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, { position: "bottom-center" });
    }
  };

  return (
    <div style={containerStyle}>
      {/* Background Image */}
      <div style={backgroundStyle}></div>

      {/* Form Section */}
      <div style={formContainerStyle}>
        <h2 style={headingStyle}>Welcome Back! 😊</h2>

        <form onSubmit={handleSubmit} style={formStyle}>
          <label style={labelStyle}>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />

          <label style={labelStyle}>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />

          <button type="submit" style={buttonStyle}>
            Log In
          </button>
        </form>

        {/* Google Sign In */}
        {/* <button style={googleButtonStyle}>
          <FcGoogle size={24} style={{ marginRight: "10px" }} /> Sign in with
          Google
        </button> */}
        <SignInWithGoogle></SignInWithGoogle>
        <p style={linkTextStyle}>
          Don&apos;t have an account?{" "}
          <Link to="/register" style={linkStyle}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

// Styles remain the same as in your original code

/* ======= STYLES ======= */
const containerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  width: "100vw",
  position: "relative",
  fontFamily: "'Poppins', sans-serif",
  overflow: "hidden",
  padding: "20px",
};

const backgroundStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundImage: "url('/2.png')", // Replace with your image path
  backgroundSize: "cover",
  backgroundPosition: "center",
  filter: "brightness(0.8) blur(2px)", // Light blur for depth effect
  zIndex: -1,
};

const formContainerStyle = {
  width: "90%",
  maxWidth: "400px",
  background: "rgba(255, 255, 255, 0.2)", // Glass effect
  padding: "30px",
  borderRadius: "15px",
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", // Soft shadow
  backdropFilter: "blur(12px)", // Stronger glass effect
  textAlign: "center",
  border: "1px solid rgba(255, 255, 255, 0.3)", // Subtle border
};

const headingStyle = {
  fontSize: "1.8rem",
  fontWeight: "bold",
  color: "white",
  marginBottom: "15px",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const labelStyle = {
  fontSize: "1rem",
  color: "white",
  marginBottom: "5px",
  fontWeight: "500",
  alignSelf: "flex-start",
};

const inputStyle = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid rgba(255, 255, 255, 0.5)", // Semi-transparent border
  fontSize: "1rem",
  width: "100%",
  marginBottom: "15px",
  outline: "none",
  background: "rgba(255, 255, 255, 0.1)", // Transparent input
  color: "white",
  transition: "all 0.3s ease",
};

inputStyle[":focus"] = {
  borderColor: "#E74C3C",
  background: "rgba(255, 255, 255, 0.2)",
};

const buttonStyle = {
  backgroundColor: "#E74C3C",
  color: "white",
  padding: "12px",
  borderRadius: "8px",
  border: "none",
  fontSize: "1rem",
  fontWeight: "600",
  cursor: "pointer",
  width: "100%",
  transition: "background-color 0.3s ease-in-out",
};

buttonStyle[":hover"] = {
  backgroundColor: "#C0392B",
};

const googleButtonStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  padding: "12px",
  marginTop: "10px",
  borderRadius: "8px",
  border: "1px solid rgba(255, 255, 255, 0.5)",
  background: "rgba(255, 255, 255, 0.1)",
  fontSize: "1rem",
  fontWeight: "600",
  color: "white",
  cursor: "pointer",
  transition: "all 0.3s ease",
};

googleButtonStyle[":hover"] = {
  backgroundColor: "rgba(255, 255, 255, 0.2)",
};

const linkTextStyle = {
  fontSize: "0.9rem",
  marginTop: "15px",
  color: "white",
};

const linkStyle = {
  color: "#FFD700",
  textDecoration: "none",
  fontWeight: "bold",
};

export default Login;
