// // import { createUserWithEmailAndPassword } from "firebase/auth";
// import React, { useState } from "react";
// import { auth, db } from "./firebase";
// import { setDoc, doc } from "firebase/firestore";
// import { toast } from "react-toastify";
// import { createUserWithEmailAndPassword } from "firebase/auth";

// function Register() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [fname, setFname] = useState("");
//   const [lname, setLname] = useState("");

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     // Check if the device is online
//     if (!navigator.onLine) {
//       toast.error("No internet connection. Please check your network.", {
//         position: "bottom-center",
//       });
//       return;
//     }

//     try {
//       await createUserWithEmailAndPassword(auth, email, password);
//       const user = auth.currentUser;

//       if (user) {
//         await setDoc(doc(db, "Users", user.uid), {
//           email: user.email,
//           firstName: fname,
//           lastName: lname,
//           photo: "",
//         });
//       }

//       toast.success("User Registered Successfully!!", {
//         position: "top-center",
//       });

//     } catch (error) {
//       console.error("Registration error:", error);

//       if (error.code === "auth/network-request-failed") {
//         toast.error("Network error! Please check your internet connection.", {
//           position: "bottom-center",
//         });
//       } else {
//         toast.error(error.message, {
//           position: "bottom-center",
//         });
//       }
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
//           value={fname}
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
//           value={lname}
//           onChange={(e) => setLname(e.target.value)}
//           required
//         />
//       </div>

//       <div className="mb-3">
//         <label>Email address</label>
//         <input
//           type="email"
//           className="form-control"
//           placeholder="Enter email"
//           value={email}
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
//           value={password}
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
//         Already registered? <a href="/login">Login</a>
//       </p>
//     </form>
//   );
// }

// export default Register;
import React, { useState } from "react";
import { auth, db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./register.css"; // ✅ Import the CSS file

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

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
    <div className="register-container">
      <div className="register-background"></div>

      <form onSubmit={handleRegister} className="register-form">
        <h3 className="fade-in">Sign Up</h3>

        <div className="input-group">
          <label>First Name</label>
          <input
            type="text"
            placeholder="First name"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Last Name</label>
          <input
            type="text"
            placeholder="Last name"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="register-button">
          Sign Up
        </button>

        <p className="register-link">
          Already registered? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
}

export default Register;
