import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc, updateDoc, collection, addDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import NavBar from "../pages/NavBar";

function AquariumCart() {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [userOrders, setUserOrders] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(null);
  const [addressDetails, setAddressDetails] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  useEffect(() => {
    let isMounted = true;

    const fetchUserData = async (user) => {
      if (!user) return;
      try {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists() && isMounted) {
          const userData = docSnap.data();
          setUserDetails({ ...userData, id: user.uid });
          // Pre-fill address if available
          if (userData.address) {
            setAddressDetails({
              street: userData.address || "",
              city: userData.city || "",
              state: userData.state || "",
              zipCode: userData.zipCode || "",
              country: userData.country || "",
            });
          }
          fetchCartItems(user.uid);
          fetchUserOrders(user.uid);
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

  // Fetch cart items
  const fetchCartItems = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/cart/${userId}`
      );
      if (!response.ok) throw new Error("Failed to fetch cart items");

      const data = await response.json();
      setCartItems(data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  // Fetch user orders
  const fetchUserOrders = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/orders/user/${userId}`
      );
      if (!response.ok) throw new Error("Failed to fetch user orders");

      const data = await response.json();
      setUserOrders(data);
    } catch (error) {
      console.error("Error fetching user orders:", error);
    }
  };

  // Remove item from cart
  const removeItem = async (product_id, category) => {
    try {
      await fetch("http://localhost:4000/api/v1/cart/remove", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: auth.currentUser?.uid,
          product_id,
          category,
        }),
      });
      setCartItems((prevItems) =>
        prevItems.filter(
          (item) =>
            !(item.product_id === product_id && item.category === category)
        )
      );
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  // Update cart quantity
  const updateQuantity = async (product_id, category, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.product_id === product_id && item.category === category
            ? { ...item, quantity: newQuantity }
            : item
        )
      );

      const response = await fetch("http://localhost:4000/api/v1/cart/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: auth.currentUser?.uid,
          product_id,
          category,
          quantity: newQuantity,
        }),
      });

      if (!response.ok) throw new Error("Failed to update quantity");
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // Clear entire cart
  const clearCart = async () => {
    try {
      await fetch("http://localhost:4000/api/v1/cart/clear", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: auth.currentUser?.uid }),
      });
      setCartItems([]);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  // Apply promo code
  const applyPromoCode = () => {
    // Implementation for promo code would go here
    console.log("Applying promo code:", promoCode);
    // Clear the input field after applying
    setPromoCode("");
  };

  // Calculate subtotal
  const calculateSubtotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  // Handler for address form input changes
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Show address form
  const showAddressFormModal = () => {
    setShowAddressForm(true);
  };

  // Hide address form modal - ADDED FUNCTION
  const hideAddressFormModal = () => {
    setShowAddressForm(false);
  };

  // Place order function - ADDED FUNCTION
  const placeOrder = () => {
    // Call the existing handlePlaceOrder function
    handlePlaceOrder();
  };

  // Show order details modal
  const toggleOrderDetails = (orderId) => {
    setShowOrderDetails(showOrderDetails === orderId ? null : orderId);
  };

  // Format date for display
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-green-100 text-green-800";
      case "delivered":
        return "bg-green-500 text-white";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Handler for placing order
  const handlePlaceOrder = async () => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("No user logged in");

      // Validate address fields
      for (const field in addressDetails) {
        if (!addressDetails[field]) {
          Swal.fire({
            title: "Missing Information",
            text: "Please fill in all address fields to continue.",
            icon: "warning",
            confirmButtonText: "OK",
            confirmButtonColor: "#0088cc",
          });
          return;
        }
      }

      // Format complete address
      const formattedAddress = `${addressDetails.street}, ${addressDetails.city}, ${addressDetails.state} ${addressDetails.zipCode}, ${addressDetails.country}`;

      // Prepare order data
      const orderData = {
        user_id: user.uid,
        ordered_products: cartItems.map((item) => ({
          product_id: item.product_id,
          category: item.category,
          product_name: item.product_name,
          price: item.price,
          quantity: item.quantity,
          image_url: item.image_url,
        })),
        address: formattedAddress,
        order_date: new Date().toISOString().slice(0, 19).replace("T", " "),
        total_amount: parseFloat(calculateSubtotal()),
        status: "pending",
      };

      // 1. Save to SQL database via API endpoint
      const orderResponse = await fetch(
        "http://localhost:4000/api/v1/orders/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        }
      );

      if (!orderResponse.ok)
        throw new Error("Failed to create order in database");

      // 2. Update user profile in Firestore
      await updateDoc(doc(db, "Users", user.uid), {
        firstName: userDetails.firstName,
        lastName: userDetails.lastName || "",
        phone: userDetails.phone || "",
        address: addressDetails.street,
        city: addressDetails.city,
        state: addressDetails.state,
        zipCode: addressDetails.zipCode,
        country: addressDetails.country,
      });

      // 3. Add to Orders collection in Firestore
      await addDoc(collection(db, "Orders"), orderData);

      // Clear cart after successful order
      await clearCart();

      // Close address form
      setShowAddressForm(false);

      // Refresh orders list
      fetchUserOrders(user.uid);

      // Show success message
      Swal.fire({
        title: "Order Placed!",
        text: "Your order has been successfully placed.",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#0088cc",
      });

      console.log("Order placed successfully");
    } catch (error) {
      console.error("Error placing order:", error.message);
      Swal.fire({
        title: "Error",
        text: "There was a problem placing your order. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#0088cc",
      });
    }
  };

  // Continue shopping handler with warning
  const continueShopping = () => {
    Swal.fire({
      title: "Would you like to add more to your aquarium?",
      text: "Choose where you'd like to go",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Browse Fish",
      cancelButtonText: "Browse Plants",
      confirmButtonColor: "#0088cc",
      cancelButtonColor: "#4CAF50",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "http://localhost:5173/allfish/";
      } else {
        window.location.href = "/allplants"; // Assuming plants are at /products
      }
    });
  };

  // Logout user
  const handleLogout = async () => {
    try {
      await auth.signOut();
      window.location.href = "/login";
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto my-5 px-4 font-sans text-gray-800">
      <NavBar></NavBar>
      {loading ? (
        <p className="text-lg text-gray-600 text-center py-8">Loading...</p>
      ) : userDetails ? (
        <>
          {/* Profile Section */}
          <div className="flex flex-row items-center bg-gradient-to-r from-blue-100 to-teal-100 rounded-lg shadow-md p-4 mb-6 flex-wrap">
            <div className="relative mr-5 mb-3">
              <div className="w-16 h-16 rounded-full bg-teal-500 text-white text-2xl font-bold flex items-center justify-center uppercase shadow-lg z-10 md:w-20 md:h-20 md:text-3xl">
                {userDetails.firstName.charAt(0).toUpperCase()}
              </div>
              <div className="absolute -top-1 -right-1">
                <div className="w-3 h-3 rounded-full bg-cyan-300 bg-opacity-80 m-0.5 animate-pulse"></div>
                <div className="w-3 h-3 rounded-full bg-cyan-300 bg-opacity-80 m-0.5 animate-pulse delay-300"></div>
                <div className="w-3 h-3 rounded-full bg-cyan-300 bg-opacity-80 m-0.5 animate-pulse delay-500"></div>
              </div>
            </div>
            <div className="flex-1 min-w-[200px]">
              <h3 className="m-0 mb-1 text-xl font-bold text-teal-700">
                {userDetails.firstName}
              </h3>
              <p className="m-0 mb-3 text-gray-600 text-sm break-all">
                {userDetails.email}
              </p>
              <button
                className="bg-teal-500 text-white border-none rounded-full px-5 py-2 cursor-pointer text-sm transition-colors hover:bg-teal-600"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>

          {/* Cart Section */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg shadow-md overflow-hidden mb-8">
            <h2 className="p-4 m-0 text-xl border-b border-blue-100 text-teal-700 text-center bg-gradient-to-r from-blue-50 to-cyan-100 md:text-2xl md:p-5">
              <span className="inline-block mr-2">🐠</span>
              Your Aquarium Collection
            </h2>

            {cartItems.length > 0 ? (
              <>
                {/* Desktop view: Table */}
                <div className="hidden md:block">
                  <div className="px-4 overflow-x-auto">
                    <table className="w-full border-collapse mb-5 min-w-[650px]">
                      <thead>
                        <tr>
                          <th className="text-left py-4 px-3 border-b-2 border-cyan-100 text-teal-600 font-semibold text-sm whitespace-nowrap">
                            Description
                          </th>
                          <th className="text-left py-4 px-3 border-b-2 border-cyan-100 text-teal-600 font-semibold text-sm whitespace-nowrap">
                            Quantity
                          </th>
                          <th className="text-left py-4 px-3 border-b-2 border-cyan-100 text-teal-600 font-semibold text-sm whitespace-nowrap">
                            Remove
                          </th>
                          <th className="text-left py-4 px-3 border-b-2 border-cyan-100 text-teal-600 font-semibold text-sm whitespace-nowrap">
                            Price
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map((item) => (
                          <tr
                            key={`${item.product_id}-${item.category}`}
                            className="border-b border-cyan-50"
                          >
                            <td className="py-4 px-3 min-w-[250px]">
                              <div className="flex items-center">
                                <img
                                  src={item.image_url}
                                  alt={item.product_name}
                                  className="w-16 h-16 rounded-md mr-4 object-cover border border-cyan-200"
                                />
                                <div>
                                  <p className="m-0 mb-2 font-semibold text-teal-600 text-base">
                                    {item.product_name}
                                  </p>
                                  <p className="m-0 text-sm text-gray-500">
                                    Product Code: {item.product_id}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-3 w-1/5 text-center">
                              <div className="flex items-center justify-center border border-cyan-200 rounded-full w-24 mx-auto h-9">
                                <button
                                  className="bg-teal-500 text-white border-none w-8 h-8 flex items-center justify-center cursor-pointer text-base font-bold mx-0.5 rounded-full"
                                  onClick={() =>
                                    updateQuantity(
                                      item.product_id,
                                      item.category,
                                      item.quantity - 1
                                    )
                                  }
                                >
                                  -
                                </button>
                                <span className="px-3 text-sm font-medium">
                                  {item.quantity}
                                </span>
                                <button
                                  className="bg-teal-500 text-white border-none w-8 h-8 flex items-center justify-center cursor-pointer text-base font-bold mx-0.5 rounded-full"
                                  onClick={() =>
                                    updateQuantity(
                                      item.product_id,
                                      item.category,
                                      item.quantity + 1
                                    )
                                  }
                                >
                                  +
                                </button>
                              </div>
                            </td>
                            <td className="py-4 px-3 w-1/6 text-center">
                              <button
                                className="bg-transparent border-none text-red-500 text-2xl cursor-pointer p-1 px-3"
                                onClick={() =>
                                  removeItem(item.product_id, item.category)
                                }
                              >
                                ×
                              </button>
                            </td>
                            <td className="py-4 px-3 w-1/6 text-right font-bold text-teal-600 text-base">
                              ${item.price}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Mobile view: Card-based layout */}
                <div className="block md:hidden">
                  <div className="p-3">
                    {cartItems.map((item) => (
                      <div
                        key={`${item.product_id}-${item.category}`}
                        className="border border-cyan-100 rounded-lg mb-4 shadow-sm overflow-hidden bg-white bg-opacity-70"
                      >
                        <div className="flex p-3 border-b border-cyan-50 relative">
                          <img
                            src={item.image_url}
                            alt={item.product_name}
                            className="w-14 h-14 rounded-md mr-3 object-cover border border-cyan-200"
                          />
                          <div className="flex-1">
                            <p className="m-0 mb-2 font-semibold text-teal-600 text-sm">
                              {item.product_name}
                            </p>
                            <p className="m-0 text-xs text-gray-500">
                              Product Code: {item.product_id}
                            </p>
                            <p className="mt-1 mb-0 font-bold text-teal-600">
                              ${item.price}
                            </p>
                          </div>
                          <button
                            className="absolute top-2 right-2 bg-transparent border-none text-red-500 text-xl cursor-pointer p-1"
                            onClick={() =>
                              removeItem(item.product_id, item.category)
                            }
                          >
                            ×
                          </button>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-cyan-50 bg-opacity-50">
                          <div className="flex items-center border border-cyan-200 rounded-full bg-white">
                            <button
                              className="bg-teal-500 text-white border-none w-7 h-7 flex items-center justify-center cursor-pointer text-sm font-bold rounded-full"
                              onClick={() =>
                                updateQuantity(
                                  item.product_id,
                                  item.category,
                                  item.quantity - 1
                                )
                              }
                            >
                              -
                            </button>
                            <span className="px-2 text-xs font-medium">
                              {item.quantity}
                            </span>
                            <button
                              className="bg-teal-500 text-white border-none w-7 h-7 flex items-center justify-center cursor-pointer text-sm font-bold rounded-full"
                              onClick={() =>
                                updateQuantity(
                                  item.product_id,
                                  item.category,
                                  item.quantity + 1
                                )
                              }
                            >
                              +
                            </button>
                          </div>
                          <div className="text-sm font-medium">
                            <span>Total: </span>
                            <span className="text-teal-600 font-bold">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 border-t border-blue-100">
                  <div className="mb-5">
                    <div className="mb-4">
                      <p className="m-0 mb-2 text-sm text-gray-600">
                        <span className="inline-block mr-1">🎟️</span> If you
                        have a promotion code, please enter it here:
                      </p>
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="Promo code"
                          className="p-3 border border-cyan-200 rounded text-sm w-full max-w-xs"
                        />
                        <button
                          onClick={applyPromoCode}
                          className="bg-teal-500 text-white border-none rounded-full p-3 cursor-pointer text-sm font-medium w-fit whitespace-nowrap"
                        >
                          Apply Discount
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="w-full max-w-md ml-auto">
                    <div className="flex justify-between py-2 border-b border-cyan-100">
                      <span className="text-gray-600 text-sm">Discount</span>
                      <span className="font-medium text-sm">$0.00</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-cyan-100">
                      <span className="text-gray-600 text-sm">Delivery</span>
                      <span className="font-medium text-sm">$0.00</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-cyan-100">
                      <span className="text-gray-600 text-sm">Subtotal</span>
                      <span className="font-medium text-sm">
                        ${calculateSubtotal()}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-cyan-100">
                      <span className="text-gray-600 text-sm">Total</span>
                      <span className="font-bold text-lg text-teal-600">
                        ${calculateSubtotal()}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 max-w-md ml-auto mt-5">
                    <button
                      className="bg-teal-500 text-white border-none rounded-full p-4 cursor-pointer text-base font-semibold flex justify-between items-center"
                      onClick={showAddressFormModal}
                    >
                      <span className="mx-auto">Place Order</span>
                      <span className="font-bold text-lg">→</span>
                    </button>
                    <div className="flex flex-col w-full">
                      <button
                        className="bg-white text-teal-500 border border-teal-200 rounded-full p-3 cursor-pointer text-sm font-medium w-full text-center"
                        onClick={continueShopping}
                      >
                        <span className="inline-block mr-1">🔍</span> Continue
                        Shopping
                      </button>
                    </div>
                    {cartItems.length > 0 && (
                      <button
                        className="bg-red-50 text-red-500 border border-red-200 rounded-full p-3 cursor-pointer text-sm font-medium mt-1"
                        onClick={clearCart}
                      >
                        <span className="inline-block mr-1">🗑️</span> Clear Cart
                      </button>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <p className="py-10 px-5 text-center text-teal-600 text-base">
                <span className="block text-5xl mb-4">🐠</span>
                Your aquarium is empty. Add some beautiful fish to your
                collection!
              </p>
            )}
          </div>

          {/* Orders Section */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg shadow-md overflow-hidden mb-8">
            <h2 className="p-4 m-0 text-xl border-b border-blue-100 text-teal-700 text-center bg-gradient-to-r from-blue-50 to-cyan-100 md:text-2xl md:p-5">
              <span className="inline-block mr-2">📦</span>
              Your Orders
            </h2>

            {userOrders.length > 0 ? (
              <div className="p-4">
                {userOrders.map((order) => (
                  <div
                    key={order.order_id}
                    className="bg-white rounded-lg shadow-sm p-4 mb-4 cursor-pointer transition-all hover:shadow-md"
                    onClick={() => toggleOrderDetails(order.order_id)}
                  >
                    <div className="flex flex-wrap justify-between items-center mb-3">
                      <h3 className="text-lg font-semibold text-teal-600">
                        <span className="inline-block mr-1">🧾</span> Order #
                        {order.order_id}
                      </h3>
                      <span
                        className={`${getStatusColor(
                          order.status
                        )} text-xs font-medium px-2.5 py-0.5 rounded-full`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="inline-block mr-1">📅</span> Date:{" "}
                      {formatDate(order.order_date)}
                    </p>
                    <p className="text-sm text-gray-600 mb-3">
                      <span className="inline-block mr-1">💲</span> Total: $
                      {parseFloat(order.total_amount).toFixed(2)}
                    </p>

                    {showOrderDetails === order.order_id && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <h4 className="text-sm font-medium text-gray-700 mb-3">
                          <span className="inline-block mr-1">🐟</span> Items:
                        </h4>
                        <div className="space-y-3">
                          {/* Parse the JSON string if it's a string, otherwise use as is */}
                          {(typeof order.ordered_products === "string"
                            ? JSON.parse(order.ordered_products)
                            : order.ordered_products
                          ).map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center bg-cyan-50 p-2 rounded-lg"
                            >
                              <div className="w-12 h-12 rounded-lg overflow-hidden mr-3 border border-cyan-100">
                                <img
                                  src={item.image_url}
                                  alt={item.product_name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-teal-600 mb-1">
                                  {item.product_name}
                                </p>
                                <div className="flex justify-between text-xs text-gray-500">
                                  <span>Quantity: {item.quantity}</span>
                                  <span>
                                    ${parseFloat(item.price).toFixed(2)} each
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 pt-3 border-t border-gray-100">
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">
                              <span className="inline-block mr-1">🏠</span>{" "}
                              Shipping Address:
                            </span>{" "}
                            {order.address}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="mt-3 flex justify-end">
                      <button
                        className="bg-cyan-50 text-teal-500 border border-cyan-200 rounded-full px-3 py-1 cursor-pointer text-xs font-medium"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleOrderDetails(order.order_id);
                        }}
                      >
                        {showOrderDetails === order.order_id
                          ? "Hide Details"
                          : "View Details"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="py-8 px-5 text-center text-teal-600 text-base">
                <span className="block text-4xl mb-4">📦</span>
                You haven't placed any orders yet.
              </p>
            )}
          </div>

          {/* Address Form Modal */}
          {showAddressForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
                <h3 className="text-xl font-bold text-teal-700 mb-4">
                  <span className="inline-block mr-2">🏠</span> Shipping Address
                </h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="street"
                      value={addressDetails.street}
                      onChange={handleAddressChange}
                      className="w-full p-3 border border-cyan-200 rounded text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={addressDetails.city}
                      onChange={handleAddressChange}
                      className="w-full p-3 border border-cyan-200 rounded text-sm"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={addressDetails.state}
                        onChange={handleAddressChange}
                        className="w-full p-3 border border-cyan-200 rounded text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1">
                        Zip Code
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={addressDetails.zipCode}
                        onChange={handleAddressChange}
                        className="w-full p-3 border border-cyan-200 rounded text-sm"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={addressDetails.country}
                      onChange={handleAddressChange}
                      className="w-full p-3 border border-cyan-200 rounded text-sm"
                      required
                    />
                  </div>
                  <div className="flex justify-end pt-4 gap-3">
                    <button
                      type="button"
                      className="bg-white text-teal-500 border border-teal-200 rounded-full px-5 py-2 cursor-pointer text-sm font-medium"
                      onClick={hideAddressFormModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="bg-teal-500 text-white border-none rounded-full px-5 py-2 cursor-pointer text-sm font-medium"
                      onClick={placeOrder}
                    >
                      Confirm Order
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      ) : (
        <p className="text-lg text-gray-600 text-center py-8">
          Please login to view your profile.
        </p>
      )}
    </div>
  );
}
export default AquariumCart;
