// import { createUserWithEmailAndPassword } from "firebase/auth";
// import React, { useState } from "react";
// import { auth,db } from "./components/firebase.js";
// import { setDoc, doc } from "firebase/firestore";
// import { toast } from "react-toastify";

// function Register() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [fname, setFname] = useState("");
//   const [lname, setLname] = useState("");

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       await createUserWithEmailAndPassword(auth, email, password);
//       const user = auth.currentUser;
//       console.log(user);
//       if (user) {
//         await setDoc(doc(db, "Users", user.uid), {
//           email: user.email,
//           firstName: fname,
//           lastName: lname,
//           photo:""
//         });
//       }
//       console.log("User Registered Successfully!!");
//       toast.success("User Registered Successfully!!", {
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
//     <form onSubmit={handleRegister}>
//       <h3>Sign Up</h3>

//       <div className="mb-3">
//         <label>First name</label>
//         <input
//           type="text"
//           className="form-control"
//           placeholder="First name"
//           onChange={(e) => setFname(e.target.value)}
//           required
//         />
//       </div>

//       <div className="mb-3">
//         <label>Last name</label>
//         <input
//           type="text"
//           className="form-control"
//           placeholder="Last name"
//           onChange={(e) => setLname(e.target.value)}
//         />
//       </div>

//       <div className="mb-3">
//         <label>Email address</label>
//         <input
//           type="email"
//           className="form-control"
//           placeholder="Enter email"
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//       </div>

//       <div className="mb-3">
//         <label>Password</label>
//         <input
//           type="password"
//           className="form-control"
//           placeholder="Enter password"
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//       </div>

//       <div className="d-grid">
//         <button type="submit" className="btn btn-primary">
//           Sign Up
//         </button>
//       </div>
//       <p className="forgot-password text-right">
//         Already registered <a href="/login">Login</a>
//       </p>
//     </form>
//   );
// }
// export default Register;
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "./components/firebase.js";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    // Check if the device is online
    if (!navigator.onLine) {
      toast.error("No internet connection. Please check your network.", {
        position: "bottom-center",
      });
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;

      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
          photo: "",
        });
      }

      toast.success("User Registered Successfully!!", {
        position: "top-center",
      });
    } catch (error) {
      console.error("Registration error:", error);

      if (error.code === "auth/network-request-failed") {
        toast.error("Network error! Please check your internet connection.", {
          position: "bottom-center",
        });
      } else {
        toast.error(error.message, {
          position: "bottom-center",
        });
      }
    }
  };

  return (
    <div style={containerStyle}>
      <div style={backgroundStyle}></div>

      <form onSubmit={handleRegister} style={formContainerStyle}>
        <h3 style={headingStyle} className="fade-in">
          Sign Up
        </h3>

        <div className="input-group text-white">
          <label>First Name</label>
          <input
            type="text"
            placeholder="First name"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            required
            style={inputStyle}
          />
        </div>

        <div className="input-group text-white">
          <label>Last Name</label>
          <input
            type="text"
            placeholder="Last name"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            required
            style={inputStyle}
          />
        </div>

        <div className="input-group text-white">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
        </div>

        <div className="input-group text-white">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />
        </div>

        <button type="submit" style={buttonStyle} className="ripple">
          Sign Up
        </button>

        <p style={linkTextStyle}>
          Already registered?{" "}
          <a href="/login" style={linkStyle}>
            Login
          </a>
        </p>
      </form>
    </div>
  );
}

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
};

const backgroundStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundImage: "url('/11.png')", // Replace with your image path
  backgroundSize: "cover",
  backgroundPosition: "center",
  filter: "brightness(0.8) blur(3px)", // Light blur effect
  zIndex: -1,
  animation: "fadeIn 1.5s ease-in-out",
};

const formContainerStyle = {
  width: "90%",
  maxWidth: "400px",
  background: "rgba(255, 255, 255, 0.15)", // Glass effect
  padding: "30px",
  borderRadius: "15px",
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", // Soft shadow
  backdropFilter: "blur(12px)", // Stronger glass effect
  textAlign: "center",
  border: "1px solid rgba(255, 255, 255, 0.3)", // Subtle border
  animation: "fadeInUp 0.8s ease-in-out",
};

const headingStyle = {
  fontSize: "1.8rem",
  fontWeight: "bold",
  color: "white",
  marginBottom: "15px",
  animation: "fadeIn 1s ease-in-out",
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
  position: "relative",
  overflow: "hidden",
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

/* Keyframe Animations */
const styles = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

button.ripple::after {
  content: "";
  position: absolute;
  background: rgba(255, 255, 255, 0.5);
  width: 100px;
  height: 100px;
  top: -50px;
  left: -50px;
  border-radius: 50%;
  transform: scale(0);
  animation: ripple 0.6s linear;
}

@keyframes ripple {
  to {
    transform: scale(4);
    opacity: 0;
  }
}
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default Register;
