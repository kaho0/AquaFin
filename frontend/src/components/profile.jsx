import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Swal from "sweetalert2";

function AquariumCart() {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [promoCode, setPromoCode] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchUserData = async (user) => {
      if (!user) return;
      try {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists() && isMounted) {
          setUserDetails({ ...docSnap.data(), id: user.uid });
          fetchCartItems(user.uid);
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

  // Handler for placing order
  const handlePlaceOrder = async () => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("No user logged in");

      // Update in Firestore with form data (assuming form data would be captured elsewhere)
      await updateDoc(doc(db, "Users", user.uid), {
        firstName: userDetails.firstName,
        lastName: userDetails.lastName || "",
        phone: userDetails.phone || "",
        address: userDetails.address || "",
        city: userDetails.city || "",
        zipCode: userDetails.zipCode || "",
      });

      // Clear cart after successful order
      await clearCart();

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
      {loading ? (
        <p className="text-lg text-gray-600 text-center py-8">Loading...</p>
      ) : userDetails ? (
        <>
          {/* Profile Section */}
          <div className="flex flex-row items-center bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-md p-4 mb-6 flex-wrap">
            <div className="relative mr-5 mb-3">
              <div className="w-16 h-16 rounded-full bg-blue-500 text-white text-2xl font-bold flex items-center justify-center uppercase shadow-lg z-10 md:w-20 md:h-20 md:text-3xl">
                {userDetails.firstName.charAt(0).toUpperCase()}
              </div>
              <div className="absolute -top-1 -right-1">
                <div className="w-3 h-3 rounded-full bg-white bg-opacity-70 m-0.5 animate-pulse"></div>
                <div className="w-3 h-3 rounded-full bg-white bg-opacity-70 m-0.5 animate-pulse delay-300"></div>
                <div className="w-3 h-3 rounded-full bg-white bg-opacity-70 m-0.5 animate-pulse delay-500"></div>
              </div>
            </div>
            <div className="flex-1 min-w-[200px]">
              <h3 className="m-0 mb-1 text-xl font-bold text-blue-700">
                {userDetails.firstName}
              </h3>
              <p className="m-0 mb-3 text-gray-600 text-sm break-all">
                {userDetails.email}
              </p>
              <button
                className="bg-blue-500 text-white border-none rounded-full px-5 py-2 cursor-pointer text-sm transition-colors hover:bg-blue-600"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>

          {/* Cart Section */}
          <div className="bg-blue-50 rounded-lg shadow-md overflow-hidden">
            <h2 className="p-4 m-0 text-xl border-b border-blue-100 text-blue-700 text-center bg-gradient-to-r from-blue-50 to-blue-100 md:text-2xl md:p-5">
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
                          <th className="text-left py-4 px-3 border-b-2 border-blue-100 text-gray-600 font-semibold text-sm whitespace-nowrap">
                            Description
                          </th>
                          <th className="text-left py-4 px-3 border-b-2 border-blue-100 text-gray-600 font-semibold text-sm whitespace-nowrap">
                            Quantity
                          </th>
                          <th className="text-left py-4 px-3 border-b-2 border-blue-100 text-gray-600 font-semibold text-sm whitespace-nowrap">
                            Remove
                          </th>
                          <th className="text-left py-4 px-3 border-b-2 border-blue-100 text-gray-600 font-semibold text-sm whitespace-nowrap">
                            Price
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map((item) => (
                          <tr
                            key={`${item.product_id}-${item.category}`}
                            className="border-b border-blue-50"
                          >
                            <td className="py-4 px-3 min-w-[250px]">
                              <div className="flex items-center">
                                <img
                                  src={item.image_url}
                                  alt={item.product_name}
                                  className="w-16 h-16 rounded-md mr-4 object-cover border border-blue-200"
                                />
                                <div>
                                  <p className="m-0 mb-2 font-semibold text-blue-500 text-base">
                                    {item.product_name}
                                  </p>
                                  <p className="m-0 text-sm text-gray-500">
                                    Product Code: {item.product_id}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-3 w-1/5 text-center">
                              <div className="flex items-center justify-center border border-blue-200 rounded w-24 mx-auto h-9">
                                <button
                                  className="bg-blue-500 text-white border-none w-8 h-8 flex items-center justify-center cursor-pointer text-base font-bold mx-0.5"
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
                                  className="bg-blue-500 text-white border-none w-8 h-8 flex items-center justify-center cursor-pointer text-base font-bold mx-0.5"
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
                            <td className="py-4 px-3 w-1/6 text-right font-bold text-blue-500 text-base">
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
                        className="border border-blue-100 rounded-lg mb-4 shadow-sm overflow-hidden"
                      >
                        <div className="flex p-3 border-b border-blue-50 relative">
                          <img
                            src={item.image_url}
                            alt={item.product_name}
                            className="w-14 h-14 rounded md mr-3 object-cover border border-blue-200"
                          />
                          <div className="flex-1">
                            <p className="m-0 mb-2 font-semibold text-blue-500 text-sm">
                              {item.product_name}
                            </p>
                            <p className="m-0 text-xs text-gray-500">
                              Product Code: {item.product_id}
                            </p>
                            <p className="mt-1 mb-0 font-bold text-blue-500">
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
                        <div className="flex justify-between items-center p-3 bg-blue-50">
                          <div className="flex items-center border border-blue-200 rounded bg-white">
                            <button
                              className="bg-blue-500 text-white border-none w-7 h-7 flex items-center justify-center cursor-pointer text-sm font-bold"
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
                              className="bg-blue-500 text-white border-none w-7 h-7 flex items-center justify-center cursor-pointer text-sm font-bold"
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
                            <span className="text-blue-500 font-bold">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 p-4 border-t border-blue-100">
                  <div className="mb-5">
                    <div className="mb-4">
                      <p className="m-0 mb-2 text-sm text-gray-600">
                        If you have a promotion code, please enter it here:
                      </p>
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="Promo code"
                          className="p-3 border border-blue-200 rounded text-sm w-full max-w-xs"
                        />
                        <button
                          onClick={applyPromoCode}
                          className="bg-blue-500 text-white border-none rounded p-3 cursor-pointer text-sm font-medium w-fit whitespace-nowrap"
                        >
                          Apply Discount
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="w-full max-w-md ml-auto">
                    <div className="flex justify-between py-2 border-b border-blue-100">
                      <span className="text-gray-600 text-sm">Discount</span>
                      <span className="font-medium text-sm">$0.00</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-blue-100">
                      <span className="text-gray-600 text-sm">Delivery</span>
                      <span className="font-medium text-sm">$0.00</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-blue-100">
                      <span className="text-gray-600 text-sm">Subtotal</span>
                      <span className="font-medium text-sm">
                        ${calculateSubtotal()}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-blue-100">
                      <span className="text-gray-600 text-sm">Total</span>
                      <span className="font-bold text-lg text-blue-500">
                        ${calculateSubtotal()}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 max-w-md ml-auto mt-5">
                    <button
                      className="bg-blue-500 text-white border-none rounded p-4 cursor-pointer text-base font-semibold flex justify-between items-center"
                      onClick={handlePlaceOrder}
                    >
                      Place Order
                      <span className="font-bold text-lg">→</span>
                    </button>
                    <div className="flex flex-col w-full">
                      <button
                        className="bg-white text-blue-500 border border-blue-200 rounded p-3 cursor-pointer text-sm font-medium w-full text-center"
                        onClick={continueShopping}
                      >
                        Continue Shopping
                      </button>
                    </div>
                    {cartItems.length > 0 && (
                      <button
                        className="bg-red-50 text-red-500 border border-red-200 rounded p-3 cursor-pointer text-sm font-medium mt-1"
                        onClick={clearCart}
                      >
                        Clear Cart
                      </button>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <p className="py-10 px-5 text-center text-blue-500 text-base">
                Your aquarium is empty. Add some beautiful fish to your
                collection!
              </p>
            )}
          </div>
        </>
      ) : (
        <p className="text-center text-lg text-gray-600 py-10 px-5">
          Please log in to view your aquarium collection.
        </p>
      )}
    </div>
  );
}

export default AquariumCart;
