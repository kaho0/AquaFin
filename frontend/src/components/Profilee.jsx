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
  const [cart, setCart] = useState({ items: [], total: 0 });

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
          fetchCart(user.uid);
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

  const fetchCart = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/cart/${userId}`
      );
      if (!response.ok) throw new Error("Failed to fetch cart");

      const data = await response.json();
      setCart(data);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCart({ items: [], total: 0 });
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
    window.location.href = `/cart/${userDetails.id}`;
  };

  const removeFromCart = async (itemId) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("No user logged in");

      const response = await fetch(
        `http://localhost:4000/api/v1/cart/${user.uid}/item/${itemId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to remove item from cart");

      fetchCart(user.uid);

      Swal.fire({
        title: "Item Removed",
        text: "Item has been removed from your cart.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error removing item from cart:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to remove item from cart. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const user = auth.currentUser;
      if (!user) throw new Error("No user logged in");

      const response = await fetch(
        `http://localhost:4000/api/v1/cart/${user.uid}/item/${itemId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity: newQuantity }),
        }
      );

      if (!response.ok) throw new Error("Failed to update cart");

      fetchCart(user.uid);
    } catch (error) {
      console.error("Error updating cart:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to update cart. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const checkout = async () => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("No user logged in");

      const response = await fetch(
        `http://localhost:4000/api/v1/cart/${user.uid}/checkout`,
        {
          method: "POST",
        }
      );

      if (!response.ok) throw new Error("Checkout failed");

      Swal.fire({
        title: "Order Placed!",
        text: "Your order has been successfully placed.",
        icon: "success",
        confirmButtonText: "OK",
      });

      fetchCart(user.uid);
      fetchOrderHistory(user.uid);
    } catch (error) {
      console.error("Error during checkout:", error);
      Swal.fire({
        title: "Checkout Failed",
        text: "There was an error processing your order. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto my-5 px-4 font-sans text-gray-800">
      {loading ? (
        <p className="text-lg text-gray-600 text-center py-8">Loading...</p>
      ) : userDetails ? (
        <>
          {/* Profile Header Section */}
          <div className="flex flex-wrap items-center bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-md p-5 mb-6">
            <div className="relative mr-5 mb-3">
              <div className="w-20 h-20 rounded-full bg-blue-500 text-white text-3xl font-bold flex items-center justify-center uppercase shadow-lg z-10">
                {userDetails.firstName.charAt(0)}
                {userDetails.lastName ? userDetails.lastName.charAt(0) : ""}
              </div>
              <div className="absolute -top-1 -right-1">
                <div className="w-3 h-3 rounded-full bg-white bg-opacity-70 m-1 animate-bounce"></div>
                <div className="w-3 h-3 rounded-full bg-white bg-opacity-70 m-1 animate-bounce delay-100"></div>
                <div className="w-3 h-3 rounded-full bg-white bg-opacity-70 m-1 animate-bounce delay-200"></div>
              </div>
            </div>
            <div className="flex-1 min-w-[200px]">
              <h2 className="text-2xl font-bold text-blue-700 m-0 mb-1">
                Welcome, {userDetails.firstName}!
              </h2>
              <p className="text-gray-600 text-sm m-0 mb-4">
                {userDetails.email}
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  className="px-5 py-2 bg-white text-blue-500 border border-blue-500 rounded-full text-sm cursor-pointer transition-colors hover:bg-blue-50"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? "Cancel" : "Edit Profile"}
                </button>
                <button
                  className="px-5 py-2 bg-blue-500 text-white border-none rounded-full text-sm cursor-pointer transition-colors hover:bg-blue-600"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Profile Quick Stats */}
          <div className="flex flex-wrap justify-between gap-4 mb-6">
            <div className="flex items-center flex-1 min-w-[150px] bg-blue-50 rounded-lg shadow p-5">
              <span className="text-3xl mr-4">🛒</span>
              <div className="flex flex-col">
                <h3 className="text-xl font-bold text-blue-700 m-0">
                  {orders.length}
                </h3>
                <p className="text-sm text-gray-600 mt-1 m-0">Orders</p>
              </div>
            </div>
            <div className="flex items-center flex-1 min-w-[150px] bg-blue-50 rounded-lg shadow p-5">
              <span className="text-3xl mr-4">🐠</span>
              <div className="flex flex-col">
                <h3 className="text-xl font-bold text-blue-700 m-0">
                  {userDetails.tankSize || "N/A"}
                </h3>
                <p className="text-sm text-gray-600 mt-1 m-0">Tank Size</p>
              </div>
            </div>
            <div className="flex items-center flex-1 min-w-[150px] bg-blue-50 rounded-lg shadow p-5">
              <span className="text-3xl mr-4">💧</span>
              <div className="flex flex-col">
                <h3 className="text-xl font-bold text-blue-700 m-0">
                  {userDetails.preferredFish || "None"}
                </h3>
                <p className="text-sm text-gray-600 mt-1 m-0">Favorite Fish</p>
              </div>
            </div>
          </div>

          {isEditing ? (
            /* Profile Edit Form */
            <div className="bg-blue-50 rounded-lg shadow p-5 mb-6">
              <h3 className="text-xl text-blue-500 m-0 mb-5 pb-3 border-b border-blue-100">
                Edit Profile
              </h3>
              <form onSubmit={handleSubmit} className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="w-full">
                    <label className="block mb-2 text-sm text-gray-600 font-medium">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-blue-200 rounded text-sm"
                      required
                    />
                  </div>
                  <div className="w-full">
                    <label className="block mb-2 text-sm text-gray-600 font-medium">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-blue-200 rounded text-sm"
                    />
                  </div>
                  <div className="w-full">
                    <label className="block mb-2 text-sm text-gray-600 font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      className="w-full p-3 border border-blue-200 rounded text-sm bg-gray-100"
                      disabled
                    />
                  </div>
                  <div className="w-full">
                    <label className="block mb-2 text-sm text-gray-600 font-medium">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-blue-200 rounded text-sm"
                    />
                  </div>
                  <div className="w-full md:col-span-2">
                    <label className="block mb-2 text-sm text-gray-600 font-medium">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-blue-200 rounded text-sm"
                    />
                  </div>
                  <div className="w-full">
                    <label className="block mb-2 text-sm text-gray-600 font-medium">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-blue-200 rounded text-sm"
                    />
                  </div>
                  <div className="w-full">
                    <label className="block mb-2 text-sm text-gray-600 font-medium">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-blue-200 rounded text-sm"
                    />
                  </div>
                  <div className="w-full">
                    <label className="block mb-2 text-sm text-gray-600 font-medium">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-blue-200 rounded text-sm"
                    />
                  </div>
                  <div className="w-full">
                    <label className="block mb-2 text-sm text-gray-600 font-medium">
                      Preferred Fish
                    </label>
                    <input
                      type="text"
                      name="preferredFish"
                      value={formData.preferredFish}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-blue-200 rounded text-sm"
                      placeholder="e.g., Betta, Goldfish"
                    />
                  </div>
                  <div className="w-full">
                    <label className="block mb-2 text-sm text-gray-600 font-medium">
                      Tank Size
                    </label>
                    <input
                      type="text"
                      name="tankSize"
                      value={formData.tankSize}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-blue-200 rounded text-sm"
                      placeholder="e.g., 10 gallons"
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white border-none rounded px-6 py-3 cursor-pointer text-base font-medium hover:bg-blue-600 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Profile Info Display */
            <div className="bg-blue-50 rounded-lg shadow p-5 mb-6">
              <div className="mb-5">
                <h3 className="text-xl text-blue-500 m-0 mb-5 pb-3 border-b border-blue-100">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded border border-blue-100 shadow-sm">
                    <span className="block text-sm text-gray-500 mb-1">
                      Full Name
                    </span>
                    <span className="block text-base text-gray-800 font-medium">
                      {userDetails.firstName} {userDetails.lastName || ""}
                    </span>
                  </div>
                  <div className="bg-white p-4 rounded border border-blue-100 shadow-sm">
                    <span className="block text-sm text-gray-500 mb-1">
                      Email
                    </span>
                    <span className="block text-base text-gray-800 font-medium">
                      {userDetails.email}
                    </span>
                  </div>
                  <div className="bg-white p-4 rounded border border-blue-100 shadow-sm">
                    <span className="block text-sm text-gray-500 mb-1">
                      Phone
                    </span>
                    <span className="block text-base text-gray-800 font-medium">
                      {userDetails.phone || "Not provided"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-5">
                <h3 className="text-xl text-blue-500 m-0 mb-5 pb-3 border-b border-blue-100">
                  Address
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white p-4 rounded border border-blue-100 shadow-sm">
                    <span className="block text-sm text-gray-500 mb-1">
                      Street
                    </span>
                    <span className="block text-base text-gray-800 font-medium">
                      {userDetails.address || "Not provided"}
                    </span>
                  </div>
                  <div className="bg-white p-4 rounded border border-blue-100 shadow-sm">
                    <span className="block text-sm text-gray-500 mb-1">
                      City
                    </span>
                    <span className="block text-base text-gray-800 font-medium">
                      {userDetails.city || "Not provided"}
                    </span>
                  </div>
                  <div className="bg-white p-4 rounded border border-blue-100 shadow-sm">
                    <span className="block text-sm text-gray-500 mb-1">
                      State
                    </span>
                    <span className="block text-base text-gray-800 font-medium">
                      {userDetails.state || "Not provided"}
                    </span>
                  </div>
                  <div className="bg-white p-4 rounded border border-blue-100 shadow-sm">
                    <span className="block text-sm text-gray-500 mb-1">
                      ZIP Code
                    </span>
                    <span className="block text-base text-gray-800 font-medium">
                      {userDetails.zipCode || "Not provided"}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl text-blue-500 m-0 mb-5 pb-3 border-b border-blue-100">
                  Aquarium Preferences
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded border border-blue-100 shadow-sm">
                    <span className="block text-sm text-gray-500 mb-1">
                      Preferred Fish
                    </span>
                    <span className="block text-base text-gray-800 font-medium">
                      {userDetails.preferredFish || "Not specified"}
                    </span>
                  </div>
                  <div className="bg-white p-4 rounded border border-blue-100 shadow-sm">
                    <span className="block text-sm text-gray-500 mb-1">
                      Tank Size
                    </span>
                    <span className="block text-base text-gray-800 font-medium">
                      {userDetails.tankSize || "Not specified"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Cart Section */}
          <div className="bg-blue-50 rounded-lg shadow p-5 mb-6">
            <h3 className="text-xl text-blue-500 m-0 mb-5 pb-3 border-b border-blue-100">
              Your Cart
            </h3>
            {cart.items && cart.items.length > 0 ? (
              <div className="space-y-4">
                {cart.items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg shadow p-4 flex flex-wrap items-center"
                  >
                    <div className="w-16 h-16 mr-4 mb-2">
                      <img
                        src={item.image_url || "/placeholder-fish.jpg"}
                        alt={item.product_name}
                        className="w-full h-full object-cover rounded border border-blue-100"
                      />
                    </div>
                    <div className="flex-1 min-w-[200px] mb-2">
                      <h4 className="font-medium text-base m-0">
                        {item.product_name}
                      </h4>
                      <p className="text-gray-500 text-sm m-0 mt-1">
                        ${item.price.toFixed(2)} each
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mr-4">
                      <button
                        className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full font-bold"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full font-bold"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="font-medium m-0">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        className="text-red-500 bg-red-50 p-2 rounded-full hover:bg-red-100"
                        onClick={() => removeFromCart(item.id)}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}

                <div className="flex justify-between items-center border-t border-blue-100 pt-4 mt-4">
                  <div>
                    <span className="text-gray-600">Total: </span>
                    <span className="text-lg font-bold">
                      ${cart.total.toFixed(2)}
                    </span>
                  </div>
                  <button
                    className="bg-green-500 text-white py-2 px-6 rounded font-medium hover:bg-green-600 transition-colors"
                    onClick={checkout}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-600 mb-4">Your cart is empty.</p>
                <button
                  className="bg-blue-500 text-white py-2 px-6 rounded font-medium hover:bg-blue-600 transition-colors"
                  onClick={() => (window.location.href = "/allfish")}
                >
                  Browse Fish
                </button>
              </div>
            )}
          </div>

          {/* Order History Section */}
          <div className="bg-blue-50 rounded-lg shadow p-5 mb-6">
            <h3 className="text-xl text-blue-500 m-0 mb-5 pb-3 border-b border-blue-100">
              Order History
            </h3>
            {orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.order_id}
                    className="bg-white rounded-lg shadow overflow-hidden border border-blue-100"
                  >
                    <div className="flex justify-between p-3 bg-blue-50 border-b border-blue-100">
                      <span className="text-gray-600 text-sm">
                        {new Date(order.order_date).toLocaleDateString()}
                      </span>
                      <span className="text-sm font-bold text-green-500">
                        {order.status}
                      </span>
                    </div>
                    <div className="flex justify-between p-3 border-b border-dashed border-blue-100">
                      <span className="text-blue-500 font-medium">
                        Order #{order.order_id}
                      </span>
                      <span className="font-bold">
                        ${order.total.toFixed(2)}
                      </span>
                    </div>
                    <div className="p-3">
                      {order.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center mb-3 last:mb-0"
                        >
                          <img
                            src={item.image_url || "/placeholder-fish.jpg"}
                            alt={item.product_name}
                            className="w-10 h-10 object-cover rounded border border-blue-100 mr-3"
                          />
                          <div className="flex flex-col">
                            <span className="text-gray-800 text-sm">
                              {item.product_name}
                            </span>
                            <span className="text-gray-500 text-xs">
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
              <div className="text-center py-6">
                <p className="text-gray-600 mb-4">
                  You haven't placed any orders yet.
                </p>
                <button
                  className="bg-blue-500 text-white py-2 px-6 rounded font-medium hover:bg-blue-600 transition-colors"
                  onClick={() => (window.location.href = "/allfish")}
                >
                  Browse Fish
                </button>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mb-6">
            <button
              className="flex-1 bg-blue-500 text-white border-none rounded py-4 px-6 cursor-pointer text-base font-medium hover:bg-blue-600 transition-colors min-w-[150px]"
              onClick={viewCart}
            >
              View Your Cart
            </button>
            <button
              className="flex-1 bg-green-500 text-white border-none rounded py-4 px-6 cursor-pointer text-base font-medium hover:bg-green-600 transition-colors min-w-[150px]"
              onClick={() => (window.location.href = "/allfish")}
            >
              Shop Fish
            </button>
          </div>
        </>
      ) : (
        <p className="text-center text-lg text-gray-600 py-10">
          Please log in to view your profile.
        </p>
      )}
    </div>
  );
}

export default AquariumProfile;
