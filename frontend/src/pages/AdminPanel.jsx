import React, { useEffect, useState } from "react";
import { FiBarChart2, FiPackage, FiDollarSign, FiZap } from "react-icons/fi";

const ADMIN_EMAILS = ["kahonbintezaman@gmail.com", "zamanibna2005@gmail.com"];

function AdminPanel({ user }) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [orders, setOrders] = useState([]);
  const [fishes, setFishes] = useState([]);
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [analytics, setAnalytics] = useState({
    totalStats: { total_orders: 0, total_sales: 0, average_order_value: 0 },
    statusCounts: [],
    dailySales: [],
    topProducts: [],
  });

  // Product management states
  const [editingProduct, setEditingProduct] = useState(null);
  const [showProductForm, setShowProductForm] = useState(false);
  const [productForm, setProductForm] = useState({
    name: "",
    price: "",
    description: "",
    image_url: "",
    category: "fish",
    stock: "",
    tags: "",
  });

  // Order management states
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderFilter, setOrderFilter] = useState({
    status: "all",
    dateFrom: "",
    dateTo: "",
  });

  useEffect(() => {
    if (!user || !ADMIN_EMAILS.includes(user.email)) return;
    fetchAllData();
  }, [user]);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [ordersRes, fishesRes, plantsRes, analyticsRes] = await Promise.all([
        fetch("https://aquafin.onrender.com/api/v1/admin/orders"),
        fetch("https://aquafin.onrender.com/api/v1/admin/products/fish"),
        fetch("https://aquafin.onrender.com/api/v1/admin/products/plant"),
        fetch("https://aquafin.onrender.com/api/v1/admin/analytics"),
      ]);

      const ordersData = await ordersRes.json();
      const fishesData = await fishesRes.json();
      const plantsData = await plantsRes.json();
      const analyticsData = await analyticsRes.json();

      setOrders(ordersData);
      setFishes(fishesData.data || []);
      setPlants(plantsData.data || []);
      setAnalytics(analyticsData);

      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`https://aquafin.onrender.com/api/v1/admin/orders/${orderId}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchAllData(); // Refresh data
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = productForm.category === "fish" ? "fish" : "plant";
      const method = editingProduct ? "PUT" : "POST";
      const url = editingProduct 
        ? `https://aquafin.onrender.com/api/v1/admin/products/${endpoint}/${editingProduct.id}`
        : `https://aquafin.onrender.com/api/v1/admin/products/${endpoint}`;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productForm),
      });

      if (response.ok) {
        setShowProductForm(false);
        setEditingProduct(null);
        setProductForm({
          name: "",
          price: "",
          description: "",
          image_url: "",
          category: "fish",
          stock: "",
          tags: "",
        });
        fetchAllData();
      }
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const deleteProduct = async (productId, category) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const endpoint = category === "fish" ? "fish" : "plant";
      const response = await fetch(`https://aquafin.onrender.com/api/v1/admin/products/${endpoint}/${productId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchAllData();
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const exportOrdersCSV = () => {
    const csvContent = [
      ["Order ID", "User ID", "Total Amount", "Status", "Order Date", "Products"],
      ...orders.map(order => [
        order.id,
        order.user_id,
        order.total_amount,
        order.status,
        new Date(order.order_date).toLocaleString(),
        JSON.stringify(order.ordered_products)
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "orders.csv";
    a.click();
  };

  if (!user || !ADMIN_EMAILS.includes(user.email)) {
    return <div className="p-8 text-center text-red-600 font-bold">Access denied. Admins only.</div>;
  }

  if (loading) return <div className="p-8 text-center">Loading admin data...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;



  const filteredOrders = orders.filter(order => {
    if (orderFilter.status !== "all" && order.status !== orderFilter.status) return false;
    if (orderFilter.dateFrom && new Date(order.order_date) < new Date(orderFilter.dateFrom)) return false;
    if (orderFilter.dateTo && new Date(order.order_date) > new Date(orderFilter.dateTo)) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 font-['Poppins']">
      {/* Modern Header with Aqua Theme */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-8">
                          <div className="flex items-center space-x-3">
                <div className="w-32 h-32 bg-opacity-20 rounded-lg flex items-center justify-center">
                  <img src="/loogo.png" alt="AquaFin Logo" className="w-28 h-28 object-contain" />
                </div>
              <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`px-6 py-3 font-medium text-base transition-all duration-300 ${
                  activeTab === "dashboard" 
                    ? "bg-white text-teal-600 shadow-xl transform scale-105" 
                    : "text-white hover:text-teal-200 hover:scale-102"
                }`}
                style={{ borderRadius: '12px' }}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab("products")}
                className={`px-6 py-3 font-medium text-base transition-all duration-300 ${
                  activeTab === "products" 
                    ? "bg-white text-teal-600 shadow-xl transform scale-105" 
                    : "text-white hover:text-teal-200 hover:scale-102"
                }`}
                style={{ borderRadius: '12px' }}
              >
                Products
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`px-6 py-3 font-medium text-base transition-all duration-300 ${
                  activeTab === "orders" 
                    ? "bg-white text-teal-600 shadow-xl transform scale-105" 
                    : "text-white hover:text-teal-200 hover:scale-102"
                }`}
                style={{ borderRadius: '12px' }}
              >
                Orders
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            {/* Enhanced Stats Cards with Aqua Theme */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl shadow-lg p-8 border border-teal-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Orders</h3>
                    <p className="text-4xl font-bold text-teal-600">{parseInt(analytics.totalStats.total_orders) || 0}</p>
                    <p className="text-sm text-teal-500 mt-2">All time orders</p>
                  </div>
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
                    <img src="/loogo.png" alt="Orders" className="w-10 h-10 object-contain" />
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl shadow-lg p-8 border border-emerald-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Sales</h3>
                    <p className="text-4xl font-bold text-emerald-600">৳{parseFloat(analytics.totalStats.total_sales || 0).toFixed(2)}</p>
                    <p className="text-sm text-emerald-500 mt-2">Revenue generated</p>
                  </div>
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                    <img src="/loogo.png" alt="Sales" className="w-10 h-10 object-contain" />
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl shadow-lg p-8 border border-blue-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Products</h3>
                    <p className="text-4xl font-bold text-blue-600">{fishes.length + plants.length}</p>
                    <p className="text-sm text-blue-500 mt-2">Fish & Plants</p>
                  </div>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <img src="/loogo.png" alt="Products" className="w-10 h-10 object-contain" />
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Recent Orders</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.slice(0, 5).map((order) => (
                      <tr key={order.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{order.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">৳{parseFloat(order.total_amount).toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                            order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(order.order_date).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === "products" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Product Management</h2>
              <button
                onClick={() => {
                  setShowProductForm(true);
                  setEditingProduct(null);
                  setProductForm({
                    name: "",
                    price: "",
                    description: "",
                    image_url: "",
                    category: "fish",
                    stock: "",
                    tags: "",
                  });
                }}
                className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700"
              >
                Add New Product
              </button>
            </div>

            {/* Product Form Modal */}
            {showProductForm && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                  <div className="mt-3">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      {editingProduct ? "Edit Product" : "Add New Product"}
                    </h3>
                    <form onSubmit={handleProductSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <select
                          value={productForm.category}
                          onChange={(e) => setProductForm({...productForm, category: e.target.value})}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                        >
                          <option value="fish">Fish</option>
                          <option value="plant">Plant</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                          type="text"
                          value={productForm.name}
                          onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Price</label>
                        <input
                          type="number"
                          value={productForm.price}
                          onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                          value={productForm.description}
                          onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                          rows="3"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Image URL</label>
                        <input
                          type="url"
                          value={productForm.image_url}
                          onChange={(e) => setProductForm({...productForm, image_url: e.target.value})}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                        />
                      </div>
                      <div className="flex justify-end space-x-3">
                        <button
                          type="button"
                          onClick={() => setShowProductForm(false)}
                          className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
                        >
                          {editingProduct ? "Update" : "Create"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* Products List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...fishes, ...plants].map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <img
                    src={product.image_url || "/placeholder.jpg"}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">
                      Category: {product.category || (fishes.find(f => f.id === product.id) ? "Fish" : "Plant")}
                    </p>
                    <p className="text-lg font-bold text-teal-600">৳{product.price}</p>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">{product.description}</p>
                    <div className="mt-4 flex space-x-2">
                      <button
                        onClick={() => {
                          setEditingProduct(product);
                          setProductForm({
                            name: product.name,
                            price: product.price,
                            description: product.description,
                            image_url: product.image_url,
                            category: fishes.find(f => f.id === product.id) ? "fish" : "plant",
                            stock: product.stock || "",
                            tags: product.tags || "",
                          });
                          setShowProductForm(true);
                        }}
                        className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-md text-sm hover:bg-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id, fishes.find(f => f.id === product.id) ? "fish" : "plant")}
                        className="flex-1 bg-red-600 text-white px-3 py-2 rounded-md text-sm hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Order Management</h2>
              <button
                onClick={exportOrdersCSV}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Export CSV
              </button>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    value={orderFilter.status}
                    onChange={(e) => setOrderFilter({...orderFilter, status: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="canceled">Canceled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">From Date</label>
                  <input
                    type="date"
                    value={orderFilter.dateFrom}
                    onChange={(e) => setOrderFilter({...orderFilter, dateFrom: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">To Date</label>
                  <input
                    type="date"
                    value={orderFilter.dateTo}
                    onChange={(e) => setOrderFilter({...orderFilter, dateTo: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => setOrderFilter({status: "all", dateFrom: "", dateTo: ""})}
                    className="w-full bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredOrders.map((order) => (
                      <tr key={order.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{order.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.user_id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">৳{parseFloat(order.total_amount).toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                            className={`px-2 py-1 text-xs font-semibold rounded-full border ${
                              order.status === 'delivered' ? 'bg-green-100 text-green-800 border-green-200' :
                              order.status === 'shipped' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                              order.status === 'pending' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                              'bg-red-100 text-red-800 border-red-200'
                            }`}
                          >
                            <option value="pending">Pending</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="canceled">Canceled</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(order.order_date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="text-teal-600 hover:text-teal-900"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Order Details #{selectedOrder.id}</h3>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Order Information</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Order ID:</span> #{selectedOrder.id}</p>
                      <p><span className="font-medium">User ID:</span> {selectedOrder.user_id}</p>
                      <p><span className="font-medium">Total Amount:</span> ৳{parseFloat(selectedOrder.total_amount).toFixed(2)}</p>
                      <p><span className="font-medium">Status:</span> {selectedOrder.status}</p>
                      <p><span className="font-medium">Order Date:</span> {new Date(selectedOrder.order_date).toLocaleString()}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Shipping Address</h4>
                    <p className="text-sm text-gray-600">{selectedOrder.address}</p>
                  </div>
                </div>
                <div className="mt-6">
                  <h4 className="font-medium text-gray-900 mb-2">Products</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    {Array.isArray(selectedOrder.ordered_products) ? (
                      selectedOrder.ordered_products.map((product, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                          <div>
                            <p className="font-medium">{product.product_name}</p>
                            <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
                          </div>
                          <p className="font-medium">৳{parseFloat(product.price).toFixed(2)}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-600">No product details available</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPanel; 