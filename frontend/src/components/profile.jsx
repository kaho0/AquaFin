// import React, { useEffect, useState } from "react";
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
// export default Profile;
import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { Avatar } from "@mui/material";

function ProfileAndCart() {
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
      window.location.href = "/login";
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }

  return (
    <div style={styles.container}>
      {/* User Profile Section */}
      {loading ? (
        <p style={styles.loading}>Loading...</p>
      ) : userDetails ? (
        <div style={styles.profileCard}>
          {/* Profile Image or Material UI Avatar */}
          {userDetails.photo ? (
            <img
              src={userDetails.photo}
              alt="Profile"
              style={styles.profileImage}
            />
          ) : (
            <Avatar style={styles.avatar}>
              {userDetails.firstName ? userDetails.firstName[0] : "U"}
            </Avatar>
          )}

          <h3 style={styles.userName}>{userDetails.firstName}</h3>
          <p style={styles.userEmail}>{userDetails.email}</p>

          {/* Logout Button */}
          <button style={styles.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <p style={styles.noUser}>No user data found.</p>
      )}

      {/* Shopping Cart Section */}
      <div style={styles.cartContainer}>
        <h2 style={styles.cartTitle}>Your Shopping Cart</h2>

        {/* Example of Cart Items */}
        {[1, 2, 3].map((item) => (
          <div key={item} style={styles.cartItem}>
            <img
              src={`https://via.placeholder.com/80`}
              alt="Product"
              style={styles.productImage}
            />
            <div style={styles.productDetails}>
              <h4 style={styles.productName}>Martha Knit Top</h4>
              <p style={styles.productInfo}>Color: Green | Size: S</p>
            </div>
            <p style={styles.productPrice}>$25.00</p>
            <p style={styles.productDate}>22-10-2022</p>
            <span style={styles.statusBadge}>Pending</span>
          </div>
        ))}

        {/* Cart Actions */}
        <div style={styles.cartActions}>
          <button style={styles.continueShopping}>← Continue Shopping</button>
          <button style={styles.clearCart}>🗑 Clear Shopping Cart</button>
        </div>
      </div>
    </div>
  );
}

// Styles
const styles = {
  container: {
    maxWidth: "900px",
    margin: "auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  loading: {
    textAlign: "center",
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
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    marginBottom: "10px",
  },
  avatar: {
    width: "100px",
    height: "100px",
    backgroundColor: "#00ACC1",
    fontSize: "2rem",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
  },
  userName: {
    fontSize: "20px",
    fontWeight: "bold",
    margin: "10px 0",
  },
  userEmail: {
    fontSize: "14px",
    color: "#666",
  },
  logoutButton: {
    background: "#dc3545",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "10px",
  },
  cartContainer: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  cartTitle: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  cartItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },
  productImage: {
    width: "80px",
    height: "80px",
    borderRadius: "5px",
  },
  productDetails: {
    flexGrow: 1,
    marginLeft: "10px",
  },
  productName: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  productInfo: {
    fontSize: "14px",
    color: "#777",
  },
  productPrice: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  productDate: {
    fontSize: "14px",
    color: "#777",
  },
  statusBadge: {
    background: "red",
    color: "white",
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: "bold",
  },
  cartActions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  continueShopping: {
    background: "transparent",
    border: "none",
    color: "#007BFF",
    fontSize: "16px",
    cursor: "pointer",
  },
  clearCart: {
    background: "transparent",
    border: "none",
    color: "red",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default ProfileAndCart;
