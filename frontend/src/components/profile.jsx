import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";

function AquariumProfile() {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    preferredFish: "",
    tankSize: "",
  });
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchUserData = async (user) => {
      if (!user) return;
      try {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists() && isMounted) {
          const userData = { ...docSnap.data(), id: user.uid };
          setUserDetails(userData);
          setFormData({
            firstName: userData.firstName || "",
            lastName: userData.lastName || "",
            email: userData.email || "",
            phone: userData.phone || "",
            address: userData.address || "",
            city: userData.city || "",
            state: userData.state || "",
            zipCode: userData.zipCode || "",
            preferredFish: userData.preferredFish || "",
            tankSize: userData.tankSize || "",
          });
          fetchOrderHistory(user.uid);
        } else {
          console.log("No user data found in Firestore.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
      setLoading(false);
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (isMounted) {
        setUserDetails(null);
        fetchUserData(user);
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const fetchOrderHistory = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/orders/${userId}`
      );
      if (!response.ok) throw new Error("Failed to fetch order history");

      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching order history:", error);
      setOrders([]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = auth.currentUser;
      if (!user) throw new Error("No user logged in");

      // Update in Firestore
      await updateDoc(doc(db, "Users", user.uid), {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        preferredFish: formData.preferredFish,
        tankSize: formData.tankSize,
      });

      // Update display name in Auth
      await updateProfile(user, {
        displayName: `${formData.firstName} ${formData.lastName}`,
      });

      setUserDetails({
        ...userDetails,
        ...formData,
      });

      Swal.fire({
        title: "Profile Updated!",
        text: "Your profile has been successfully updated.",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#0088cc",
      });

      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to update profile. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#0088cc",
      });
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      window.location.href = "/login";
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  const viewCart = () => {
    window.location.href = "/cart";
  };

  return (
    <div style={styles.container}>
      {loading ? (
        <p style={styles.loading}>Loading...</p>
      ) : userDetails ? (
        <>
          {/* Profile Header Section */}
          <div style={styles.profileHeader}>
            <div style={styles.initialsContainer}>
              <div style={styles.initialsAvatar}>
                {userDetails.firstName.charAt(0).toUpperCase()}
                {userDetails.lastName
                  ? userDetails.lastName.charAt(0).toUpperCase()
                  : ""}
              </div>
              <div style={styles.bubbles}>
                <div style={styles.bubble}></div>
                <div style={styles.bubble}></div>
                <div style={styles.bubble}></div>
              </div>
            </div>
            <div style={styles.profileHeaderInfo}>
              <h2 style={styles.welcomeText}>
                Welcome, {userDetails.firstName}!
              </h2>
              <p style={styles.userEmail}>{userDetails.email}</p>
              <div style={styles.headerButtons}>
                <button
                  style={styles.editButton}
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? "Cancel" : "Edit Profile"}
                </button>
                <button style={styles.logoutButton} onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Profile Quick Stats */}
          <div style={styles.quickStatsContainer}>
            <div style={styles.quickStat}>
              <span style={styles.statIcon}>🛒</span>
              <div style={styles.statInfo}>
                <h3 style={styles.statValue}>{orders.length}</h3>
                <p style={styles.statLabel}>Orders</p>
              </div>
            </div>
            <div style={styles.quickStat}>
              <span style={styles.statIcon}>🐠</span>
              <div style={styles.statInfo}>
                <h3 style={styles.statValue}>
                  {userDetails.tankSize || "N/A"}
                </h3>
                <p style={styles.statLabel}>Tank Size</p>
              </div>
            </div>
            <div style={styles.quickStat}>
              <span style={styles.statIcon}>💧</span>
              <div style={styles.statInfo}>
                <h3 style={styles.statValue}>
                  {userDetails.preferredFish || "None"}
                </h3>
                <p style={styles.statLabel}>Favorite Fish</p>
              </div>
            </div>
          </div>

          {isEditing ? (
            /* Profile Edit Form */
            <div style={styles.profileForm}>
              <h3 style={styles.sectionTitle}>Edit Profile</h3>
              <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGrid}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      style={styles.input}
                      required
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      style={styles.input}
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      style={{ ...styles.input, backgroundColor: "#f0f0f0" }}
                      disabled
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      style={styles.input}
                    />
                  </div>
                  <div style={styles.formGroupFull}>
                    <label style={styles.label}>Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      style={styles.input}
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      style={styles.input}
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      style={styles.input}
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>ZIP Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      style={styles.input}
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Preferred Fish</label>
                    <input
                      type="text"
                      name="preferredFish"
                      value={formData.preferredFish}
                      onChange={handleInputChange}
                      style={styles.input}
                      placeholder="e.g., Betta, Goldfish"
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Tank Size</label>
                    <input
                      type="text"
                      name="tankSize"
                      value={formData.tankSize}
                      onChange={handleInputChange}
                      style={styles.input}
                      placeholder="e.g., 10 gallons"
                    />
                  </div>
                </div>
                <div style={styles.formActions}>
                  <button type="submit" style={styles.submitButton}>
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Profile Info Display */
            <div style={styles.profileInfo}>
              <div style={styles.infoSection}>
                <h3 style={styles.sectionTitle}>Personal Information</h3>
                <div style={styles.infoGrid}>
                  <div style={styles.infoItem}>
                    <span style={styles.infoLabel}>Full Name</span>
                    <span style={styles.infoValue}>
                      {userDetails.firstName} {userDetails.lastName || ""}
                    </span>
                  </div>
                  <div style={styles.infoItem}>
                    <span style={styles.infoLabel}>Email</span>
                    <span style={styles.infoValue}>{userDetails.email}</span>
                  </div>
                  <div style={styles.infoItem}>
                    <span style={styles.infoLabel}>Phone</span>
                    <span style={styles.infoValue}>
                      {userDetails.phone || "Not provided"}
                    </span>
                  </div>
                </div>
              </div>

              <div style={styles.infoSection}>
                <h3 style={styles.sectionTitle}>Address</h3>
                <div style={styles.infoGrid}>
                  <div style={styles.infoItem}>
                    <span style={styles.infoLabel}>Street</span>
                    <span style={styles.infoValue}>
                      {userDetails.address || "Not provided"}
                    </span>
                  </div>
                  <div style={styles.infoItem}>
                    <span style={styles.infoLabel}>City</span>
                    <span style={styles.infoValue}>
                      {userDetails.city || "Not provided"}
                    </span>
                  </div>
                  <div style={styles.infoItem}>
                    <span style={styles.infoLabel}>State</span>
                    <span style={styles.infoValue}>
                      {userDetails.state || "Not provided"}
                    </span>
                  </div>
                  <div style={styles.infoItem}>
                    <span style={styles.infoLabel}>ZIP Code</span>
                    <span style={styles.infoValue}>
                      {userDetails.zipCode || "Not provided"}
                    </span>
                  </div>
                </div>
              </div>

              <div style={styles.infoSection}>
                <h3 style={styles.sectionTitle}>Aquarium Preferences</h3>
                <div style={styles.infoGrid}>
                  <div style={styles.infoItem}>
                    <span style={styles.infoLabel}>Preferred Fish</span>
                    <span style={styles.infoValue}>
                      {userDetails.preferredFish || "Not specified"}
                    </span>
                  </div>
                  <div style={styles.infoItem}>
                    <span style={styles.infoLabel}>Tank Size</span>
                    <span style={styles.infoValue}>
                      {userDetails.tankSize || "Not specified"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Order History Section */}
          <div style={styles.orderHistory}>
            <h3 style={styles.sectionTitle}>Order History</h3>
            {orders.length > 0 ? (
              <div style={styles.ordersList}>
                {orders.map((order) => (
                  <div key={order.order_id} style={styles.orderCard}>
                    <div style={styles.orderHeader}>
                      <span style={styles.orderDate}>
                        {new Date(order.order_date).toLocaleDateString()}
                      </span>
                      <span style={styles.orderStatus}>{order.status}</span>
                    </div>
                    <div style={styles.orderDetails}>
                      <span style={styles.orderNumber}>
                        Order #{order.order_id}
                      </span>
                      <span style={styles.orderTotal}>
                        ${order.total.toFixed(2)}
                      </span>
                    </div>
                    <div style={styles.orderItems}>
                      {order.items.map((item, idx) => (
                        <div key={idx} style={styles.orderItem}>
                          <img
                            src={item.image_url}
                            alt={item.product_name}
                            style={styles.orderItemImage}
                          />
                          <div style={styles.orderItemDetails}>
                            <span style={styles.orderItemName}>
                              {item.product_name}
                            </span>
                            <span style={styles.orderItemQuantity}>
                              Qty: {item.quantity}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={styles.noOrders}>
                You haven't placed any orders yet.
                <button
                  style={styles.browseButton}
                  onClick={() => (window.location.href = "/allfish")}
                >
                  Browse Fish
                </button>
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div style={styles.actionButtons}>
            <button style={styles.cartButton} onClick={viewCart}>
              View Your Cart
            </button>
            <button
              style={styles.shopButton}
              onClick={() => (window.location.href = "/allfish")}
            >
              Shop Fish
            </button>
          </div>
        </>
      ) : (
        <p style={styles.noUser}>Please log in to view your profile.</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    maxWidth: "1200px",
    margin: "20px auto",
    padding: "0 15px",
    fontFamily: "'Poppins', sans-serif",
    color: "#333",
    boxSizing: "border-box",
  },
  loading: {
    fontSize: "18px",
    color: "#555",
    textAlign: "center",
    padding: "30px 0",
  },
  // Profile Header Styles
  profileHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    background: "linear-gradient(to right, #e1f5fe, #b3e5fc)",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0, 120, 180, 0.1)",
    padding: "20px",
    marginBottom: "25px",
    flexWrap: "wrap",
  },
  initialsContainer: {
    position: "relative",
    marginRight: "20px",
    marginBottom: "10px",
  },
  initialsAvatar: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    backgroundColor: "#0088cc",
    color: "white",
    fontSize: "32px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textTransform: "uppercase",
    boxShadow: "0 4px 8px rgba(0, 120, 180, 0.3)",
    position: "relative",
    zIndex: "1",
  },
  bubbles: {
    position: "absolute",
    top: "-5px",
    right: "-5px",
  },
  bubble: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    margin: "3px",
    animation: "bubbleFloat 3s infinite ease-in-out",
  },
  profileHeaderInfo: {
    flex: "1",
    minWidth: "200px",
  },
  welcomeText: {
    margin: "0 0 5px",
    fontSize: "28px",
    fontWeight: "bold",
    color: "#0073b1",
  },
  userEmail: {
    margin: "0 0 15px",
    color: "#666",
    fontSize: "15px",
  },
  headerButtons: {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
  },
  editButton: {
    background: "white",
    color: "#0088cc",
    border: "1px solid #0088cc",
    borderRadius: "20px",
    padding: "8px 20px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "all 0.2s",
  },
  logoutButton: {
    background: "#0088cc",
    color: "white",
    border: "none",
    borderRadius: "20px",
    padding: "8px 20px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background 0.2s",
  },

  // Quick Stats Styles
  quickStatsContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "15px",
    marginBottom: "25px",
  },
  quickStat: {
    flex: "1",
    minWidth: "150px",
    backgroundColor: "#f8fdff",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 120, 180, 0.08)",
    padding: "20px",
    display: "flex",
    alignItems: "center",
  },
  statIcon: {
    fontSize: "28px",
    marginRight: "15px",
  },
  statInfo: {
    display: "flex",
    flexDirection: "column",
  },
  statValue: {
    margin: "0",
    fontSize: "22px",
    fontWeight: "bold",
    color: "#0073b1",
  },
  statLabel: {
    margin: "5px 0 0",
    fontSize: "14px",
    color: "#666",
  },

  // Profile Form Styles
  profileForm: {
    backgroundColor: "#f8fdff",
    borderRadius: "8px",
    boxShadow: "0 2px 12px rgba(0, 120, 180, 0.1)",
    padding: "20px",
    marginBottom: "25px",
  },
  sectionTitle: {
    fontSize: "20px",
    color: "#0088cc",
    margin: "0 0 20px 0",
    padding: "0 0 10px 0",
    borderBottom: "1px solid #e1f0f7",
  },
  form: {
    width: "100%",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(1, 1fr)",
    gap: "15px",
    "@media (min-width: 600px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
  },
  formGroup: {
    width: "100%",
  },
  formGroupFull: {
    gridColumn: "1 / -1",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontSize: "14px",
    color: "#555",
    fontWeight: "500",
  },
  input: {
    width: "100%",
    padding: "12px",
    border: "1px solid #b3e5fc",
    borderRadius: "4px",
    fontSize: "14px",
    boxSizing: "border-box",
  },
  formActions: {
    marginTop: "25px",
    display: "flex",
    justifyContent: "flex-end",
  },
  submitButton: {
    background: "#0088cc",
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding: "12px 25px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "500",
  },

  // Profile Info Display Styles
  profileInfo: {
    backgroundColor: "#f8fdff",
    borderRadius: "8px",
    boxShadow: "0 2px 12px rgba(0, 120, 180, 0.1)",
    padding: "20px",
    marginBottom: "25px",
  },
  infoSection: {
    marginBottom: "20px",
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(1, 1fr)",
    gap: "15px",
    "@media (min-width: 600px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    "@media (min-width: 900px)": {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
  },
  infoItem: {
    background: "white",
    padding: "15px",
    borderRadius: "6px",
    boxShadow: "0 1px 5px rgba(0, 120, 180, 0.05)",
    border: "1px solid #e1f0f7",
  },
  infoLabel: {
    display: "block",
    fontSize: "13px",
    color: "#888",
    marginBottom: "5px",
  },
  infoValue: {
    display: "block",
    fontSize: "16px",
    color: "#333",
    fontWeight: "500",
  },

  // Order History Styles
  orderHistory: {
    backgroundColor: "#f8fdff",
    borderRadius: "8px",
    boxShadow: "0 2px 12px rgba(0, 120, 180, 0.1)",
    padding: "20px",
    marginBottom: "25px",
  },
  ordersList: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  orderCard: {
    background: "white",
    borderRadius: "6px",
    boxShadow: "0 1px 5px rgba(0, 120, 180, 0.05)",
    border: "1px solid #e1f0f7",
    overflow: "hidden",
  },
  orderHeader: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px",
    background: "#f0f8ff",
    borderBottom: "1px solid #e1f0f7",
  },
  orderDate: {
    fontSize: "14px",
    color: "#555",
  },
  orderStatus: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#4CAF50",
  },
  orderDetails: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px",
    borderBottom: "1px dashed #e1f0f7",
  },
  orderNumber: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#0088cc",
  },
  orderTotal: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  orderItems: {
    padding: "12px",
  },
  orderItem: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },
  orderItemImage: {
    width: "40px",
    height: "40px",
    borderRadius: "4px",
    marginRight: "10px",
    objectFit: "cover",
    border: "1px solid #e1f0f7",
  },
  orderItemDetails: {
    display: "flex",
    flexDirection: "column",
  },
  orderItemName: {
    fontSize: "14px",
    color: "#333",
  },
  orderItemQuantity: {
    fontSize: "12px",
    color: "#777",
  },
  noOrders: {
    textAlign: "center",
    padding: "15px",
    color: "#666",
  },
  browseButton: {
    display: "block",
    margin: "10px auto 0",
    background: "#0088cc",
    color: "white",
    border: "none",
    borderRadius: "20px",
    padding: "8px 20px",
    cursor: "pointer",
    fontSize: "14px",
  },

  // Action Buttons
  actionButtons: {
    display: "flex",
    gap: "15px",
    marginBottom: "25px",
    flexWrap: "wrap",
  },
  cartButton: {
    flex: "1",
    background: "#0088cc",
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding: "14px 20px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "500",
    minWidth: "150px",
  },
  shopButton: {
    flex: "1",
    background: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding: "14px 20px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "500",
    minWidth: "150px",
  },
  noUser: {
    textAlign: "center",
    fontSize: "18px",
    color: "#555",
    padding: "40px 20px",
  },
  // Add keyframe animation for bubbles
  "@keyframes bubbleFloat": {
    "0%": { transform: "translateY(0)" },
    "50%": { transform: "translateY(-8px)" },
    "100%": { transform: "translateY(0)" },
  },
};

export default AquariumProfile;
