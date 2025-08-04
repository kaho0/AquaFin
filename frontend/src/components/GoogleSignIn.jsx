import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "./firebase";
import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

function GoogleSignIn() {
  const navigate = useNavigate();
  
  function googleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (result) => {
      console.log(result);
      const user = result.user;
      if (result.user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: user.displayName,
          photo: user.photoURL,
          lastName: "",
        });
        toast.success("User logged in Successfully", {
          position: "top-center",
        });
        navigate("/profile");
      }
    });
  }

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

  return (
    <div>
      {/* Google Sign In */}
      <button style={googleButtonStyle} onClick={googleLogin}>
        <FcGoogle size={24} style={{ marginRight: "10px" }} /> Sign in with
        Google
      </button>
    </div>
  );
}

export default GoogleSignIn; 