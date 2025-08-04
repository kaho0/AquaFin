import React, { useState, useEffect } from "react";
import { auth } from "./components/firebase.js";

import Swal from "sweetalert2";

function CartComponent() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        fetchCartItems(user.uid);
      } else {
        setCartItems([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchCartItems = async (uid) => {
    try {
      setLoading(true);
      const response = await fetch(
      `https://aquafin.onrender.com/api/v1/cart/${uid}`
      );

      if (!response.ok) throw new Error("Failed to fetch cart items");

      const data = await response.json();
      setCartItems(data.items || []);
      setTotal(data.total || 0);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to load your cart. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const response = await fetch(
      "https://aquafin.onrender.com/api/v1/cart/update",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userId,
            item_id: itemId,
            quantity: newQuantity,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to update cart");

      // Refetch cart after update
      fetchCartItems(userId);
    } catch (error) {
      console.error("Error updating cart:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to update item quantity. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const response = await fetch(
      "https://aquafin.onrender.com/api/v1/cart/remove",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userId,
            item_id: itemId,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to remove item from cart");

      // Refetch cart after removal
      fetchCartItems(userId);

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

  const clearCart = async () => {
    try {
      Swal.fire({
        title: "Clear Cart?",
        text: "Are you sure you want to remove all items from your cart?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, clear it!",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#d33",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await fetch(
      "https://aquafin.onrender.com/api/v1/cart/clear",
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                user_id: userId,
              }),
            }
          );

          if (!response.ok) throw new Error("Failed to clear cart");

          // Refetch cart after clearing
          fetchCartItems(userId);

          Swal.fire({
            title: "Cart Cleared",
            text: "All items have been removed from your cart.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
        }
      });
    } catch (error) {
      console.error("Error clearing cart:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to clear your cart. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const checkout = async () => {
    try {
      // Implement checkout logic here
      // You can redirect to a checkout page or handle it directly

      Swal.fire({
        title: "Proceed to Checkout?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, proceed",
        cancelButtonText: "Continue shopping",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/checkout";
        }
      });
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="text-center py-10">
        <p className="text-lg text-gray-600 mb-4">
          Please log in to view your cart.
        </p>
        <button
          onClick={() => (window.location.href = "/login")}
          className="bg-blue-500 text-white py-2 px-6 rounded font-medium hover:bg-blue-600 transition-colors"
        >
          Log In
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto my-5 px-4 font-sans text-gray-800">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">
        Your Shopping Cart
      </h2>

      {cartItems.length === 0 ? (
        <div className="bg-blue-50 rounded-lg shadow p-10 text-center">
          <p className="text-gray-600 mb-4">Your cart is empty.</p>
          <button
            onClick={() => (window.location.href = "/allfish")}
            className="bg-blue-500 text-white py-2 px-6 rounded font-medium hover:bg-blue-600 transition-colors"
          >
            Browse Fish
          </button>
        </div>
      ) : (
        <div className="bg-blue-50 rounded-lg shadow p-5">
          <div className="space-y-4 mb-6">
            {cartItems.map((item) => (
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
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full font-bold"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
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
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center border-t border-blue-100 pt-6">
            <div className="mb-4 md:mb-0">
              <button
                onClick={clearCart}
                className="text-red-500 border border-red-500 py-2 px-4 rounded hover:bg-red-50 transition-colors"
              >
                Clear Cart
              </button>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="text-right">
                <p className="text-gray-600 mb-1">
                  Total Items:{" "}
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </p>
                <p className="text-xl font-bold text-blue-700">
                  ${total.toFixed(2)}
                </p>
              </div>

              <button
                onClick={checkout}
                className="bg-green-500 text-white py-3 px-6 rounded font-medium hover:bg-green-600 transition-colors"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6">
        <button
          onClick={() => (window.location.href = "/allfish")}
          className="bg-blue-500 text-white py-2 px-6 rounded font-medium hover:bg-blue-600 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default CartComponent;
