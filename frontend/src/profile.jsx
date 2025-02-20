import React, { useEffect, useState } from "react";
// import { auth, db } from "./firebase";
// import { doc, getDoc } from "firebase/firestore";

// function Profile() {
//   const [userDetails, setUserDetails] = useState(null);
//   const fetchUserData = async () => {
//     auth.onAuthStateChanged(async (user) => {
//       console.log(user);

//       const docRef = doc(db, "Users", user.uid);
//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) {
//         setUserDetails(docSnap.data());
//         console.log(docSnap.data());
//       } else {
//         console.log("User is not logged in");
//       }
//     });
//   };
//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   async function handleLogout() {
//     try {
//       await auth.signOut();
//       window.location.href = "/login";
//       console.log("User logged out successfully!");
//     } catch (error) {
//       console.error("Error logging out:", error.message);
//     }
//   }
//   return (
//     <div>
//       {userDetails ? (
//         <>
//           <div style={{ display: "flex", justifyContent: "center" }}>
//             <img
//               src={userDetails.photo}
//               width={"40%"}
//               style={{ borderRadius: "50%" }}
//             />
//           </div>
//           <h3>Welcome {userDetails.firstName} 🙏🙏</h3>
//           <div>
//             <p>Email: {userDetails.email}</p>
//             <p>First Name: {userDetails.firstName}</p>
//             {/* <p>Last Name: {userDetails.lastName}</p> */}
//           </div>
//           <button className="btn btn-primary" onClick={handleLogout}>
//             Logout
//           </button>
//         </>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// }
// export default Profile;import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "Users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserDetails(docSnap.data());
          } else {
            console.log("No user data found in Firestore.");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        console.log("User is not logged in.");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/login"; // Redirect to login page after logout
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }

  return (
    <div style={styles.container}>
      {loading ? (
        <p style={styles.loading}>Loading...</p>
      ) : userDetails ? (
        <>
          {/* Profile Card */}
          <div style={styles.profileCard}>
            <img
              src={userDetails.photo || "https://via.placeholder.com/150"}
              alt="Profile"
              width="100"
              height="100"
              style={styles.profileImage}
            />
            <h3 style={styles.userName}>{userDetails.firstName}</h3>
            <p style={styles.userEmail}>{userDetails.email}</p>
          </div>

          {/* User Stats */}
          <div style={styles.statsContainer}>
            <div style={styles.statsBox}>
              <span>Total Orders</span>
              <h2>0</h2>
            </div>
            <div style={styles.statsBox}>
              <span>Total Spent</span>
              <h2>$0</h2>
            </div>
            <div style={styles.statsBox}>
              <span>Active Orders</span>
              <h2>0</h2>
            </div>
          </div>

          {/* Order History */}
          <div style={styles.orderHistory}>
            <h3 style={{ textAlign: "center" }}>No Orders Found</h3>
            <p>You haven't placed any orders yet.</p>
          </div>

          {/* Logout Button */}
          <button style={styles.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <p style={styles.noUser}>No user data found.</p>
      )}
    </div>
  );
}

// Styles
const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    maxWidth: "600px",
    margin: "auto",
    fontFamily: "Arial, sans-serif",
  },
  loading: {
    fontSize: "18px",
    color: "#555",
  },
  profileCard: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    textAlign: "center",
    marginBottom: "20px",
  },
  profileImage: {
    borderRadius: "50%",
    marginBottom: "10px",
  },
  userName: {
    margin: "10px 0 5px",
    fontSize: "22px",
    fontWeight: "bold",
  },
  userEmail: {
    color: "#666",
    fontSize: "14px",
  },
  statsContainer: {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "20px",
  },
  statsBox: {
    background: "#f8f9fa",
    padding: "15px",
    borderRadius: "10px",
    width: "30%",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  orderHistory: {
    background: "#f1f1f1",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  logoutButton: {
    background: "#dc3545",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "20px",
  },
  noUser: {
    fontSize: "18px",
    color: "#777",
  },
};

export default Profile;
