// import { signInWithEmailAndPassword } from "firebase/auth";
// import React, { useState } from "react";
// import { auth } from "./components/firebase.js";
// import { toast } from "react-toastify";
// import SignInwithGoogle from "./components/signInWithGoogle";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       console.log("User logged in Successfully");
//       window.location.href = "/profile";
//       toast.success("User logged in Successfully", {
//         position: "top-center",
//       });
//     } catch (error) {
//       console.log(error.message);

//       toast.error(error.message, {
//         position: "bottom-center",
//       });
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h3>Login</h3>

//       <div className="mb-3">
//         <label>Email address</label>
//         <input
//           type="email"
//           className="form-control"
//           placeholder="Enter email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </div>

//       <div className="mb-3">
//         <label>Password</label>
//         <input
//           type="password"
//           className="form-control"
//           placeholder="Enter password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </div>

//       <div className="d-grid">
//         <button type="submit" className="btn btn-primary">
//           Submit
//         </button>
//       </div>
//       <p className="forgot-password text-right">
//         New user <a href="/register">Register Here</a>
//       </p>
//       <SignInwithGoogle/>
//     </form>
//   );
// }

// export default Login;
// import { signInWithEmailAndPassword } from "firebase/auth";
// import React, { useState } from "react";
// import { auth } from "./components/firebase.js";
// import { toast } from "react-toastify";
// import SignInwithGoogle from "./components/signInWithGoogle";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       console.log("User logged in Successfully");
//       window.location.href = "/profile";
//       toast.success("User logged in Successfully", {
//         position: "top-center",
//       });
//     } catch (error) {
//       console.log(error.message);
//       toast.error(error.message, {
//         position: "bottom-center",
//       });
//     }
//   };

//   return (
//     <div style={containerStyle}>
//       <div style={cardStyle}>
//         {/* Left Side (Form) */}
//         <div style={formContainerStyle}>
//           <h3 style={headingStyle}>Hello there.</h3>
//           <p style={subTextStyle}>You need an account to continue.</p>

//           <form onSubmit={handleSubmit} style={formStyle}>
//             <div style={inputContainerStyle}>
//               <label style={labelStyle}>Full Name</label>
//               <input
//                 type="text"
//                 placeholder="Enter your name"
//                 style={inputStyle}
//               />
//             </div>

//             <div style={inputContainerStyle}>
//               <label style={labelStyle}>Email</label>
//               <input
//                 type="email"
//                 placeholder="Enter email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 style={inputStyle}
//               />
//             </div>

//             <div style={inputContainerStyle}>
//               <label style={labelStyle}>Password</label>
//               <input
//                 type="password"
//                 placeholder="Enter password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 style={inputStyle}
//               />
//             </div>

//             <button type="submit" style={buttonStyle}>
//               Sign up
//             </button>

//             <p style={termsTextStyle}>
//               By signing up, you agree to the{" "}
//               <a href="#" style={anchorStyle}>
//                 Terms & Conditions.
//               </a>
//             </p>
//           </form>

//           <SignInwithGoogle />
//         </div>

//         {/* Right Side (Image) */}
//         <div style={imageContainerStyle}>
//           <img src="/login.png" alt="Coffee cups" style={imageStyle} />
//         </div>
//       </div>
//     </div>
//   );
// }

// // **Styles**
// const containerStyle = {
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   height: "100vh",
//   backgroundColor: "#A0B19C",
// };

// const cardStyle = {
//   display: "flex",
//   width: "900px",
//   backgroundColor: "#ffffff",
//   borderRadius: "10px",
//   boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
//   overflow: "hidden",
// };

// const formContainerStyle = {
//   flex: 1,
//   padding: "50px",
// };

// const headingStyle = {
//   fontSize: "2rem",
//   fontWeight: "bold",
//   color: "#333",
//   marginBottom: "10px",
// };

// const subTextStyle = {
//   fontSize: "1rem",
//   color: "#666",
//   marginBottom: "20px",
// };

// const formStyle = {
//   display: "flex",
//   flexDirection: "column",
// };

// const inputContainerStyle = {
//   marginBottom: "15px",
// };

// const labelStyle = {
//   fontSize: "1rem",
//   fontWeight: "500",
//   color: "#333",
//   marginBottom: "5px",
//   display: "block",
// };

// const inputStyle = {
//   width: "100%",
//   padding: "10px",
//   border: "1px solid #ccc",
//   borderRadius: "5px",
//   fontSize: "1rem",
//   outline: "none",
//   marginBottom: "10px",
// };

// const buttonStyle = {
//   backgroundColor: "#445D48",
//   color: "white",
//   padding: "12px",
//   border: "none",
//   borderRadius: "5px",
//   cursor: "pointer",
//   fontSize: "1rem",
//   width: "100%",
//   transition: "background-color 0.3s",
// };

// const termsTextStyle = {
//   fontSize: "0.9rem",
//   color: "#555",
//   marginTop: "10px",
// };

// const anchorStyle = {
//   color: "#445D48",
//   textDecoration: "none",
//   fontWeight: "bold",
// };

// const imageContainerStyle = {
//   flex: 1,
// };

// const imageStyle = {
//   width: "100%",
//   height: "100%",
//   objectFit: "cover",
// };

// export default Login;
// Login.js
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./components/firebase.js";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import SignInwithGoogle from "./components/signInWithGoogle.jsx";

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
        <SignInwithGoogle></SignInwithGoogle>
        <p style={linkTextStyle}>
          Don't have an account?{" "}
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
