import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiPhone } from "react-icons/fi";

const Orders = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { orderId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);

        if (orderId) {
          // Fetch specific order details
          const response = await fetch(
      `https://aquafin.onrender.com/api/v1/orders/${orderId}`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch order details");
          }

          const data = await response.json();
          setOrder(data);
        } else {
          // Redirect to user orders page if no orderId
          navigate("/account/orders");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading order details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-xl">
          Error: {error}. Please try again later.
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">No order found</div>
      </div>
    );
  }

  // Format date
  const orderDate = new Date(order.orderDate).toLocaleString();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-green-100 p-4 mb-6 rounded-lg text-center">
        <h1 className="text-2xl font-bold text-green-800">Order Confirmed!</h1>
        <p className="text-green-700">
          Thank you for your order. Your aquarium supplies are on the way!
        </p>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
        <div className="border-b p-4 bg-gray-50">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              Order #{order.id || order._id}
            </h2>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {order.status.toUpperCase()}
            </span>
          </div>
          <p className="text-gray-600">Placed on {orderDate}</p>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2">Items</h3>
          <div className="divide-y">
            {order.items.map((item) => (
              <div
                key={item.id || item.product_id}
                className="py-3 flex justify-between items-center"
              >
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-md mr-3"></div>
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </div>
                <div className="font-medium">
                  ${parseFloat(item.price).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t mt-4 pt-4">
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>
                ${parseFloat(order.totalPrice || order.total_price).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4 border-b bg-gray-50">
          <h2 className="text-xl font-semibold">Shipping Address</h2>
        </div>
        <div className="p-4">
          {/* Parse address string to extract components */}
          {(() => {
            const addressStr = order.address || '';
            const phoneMatch = addressStr.match(/\| Phone: (.+)$/);
            const phoneNumber = phoneMatch ? phoneMatch[1] : '';
            const addressWithoutPhone = addressStr.replace(/\| Phone: .+$/, '').trim();
            
            return (
              <>
                <p>{addressWithoutPhone}</p>
                {phoneNumber && (
                  <p className="mt-2 text-sm text-gray-600">
                    <FiPhone className="inline mr-1" /> {phoneNumber}
                  </p>
                )}
              </>
            );
          })()}
        </div>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default Orders;
