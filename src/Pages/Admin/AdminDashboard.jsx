import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import useAxios from "../../hooks/useAxios";
import { FaSignOutAlt, FaBox, FaCheckCircle, FaClock, FaTruck } from "react-icons/fa";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Admin info
  const adminName = localStorage.getItem("adminName");
  const adminToken = localStorage.getItem("adminToken");

  useEffect(() => {
    // Check if admin is logged in
    if (!adminToken) {
      navigate("/admin/login");
      return;
    }

    fetchDashboardData();
    // Refresh every 10 seconds
    const interval = setInterval(fetchDashboardData, 10000);
    return () => clearInterval(interval);
  }, [adminToken, navigate]);

  const fetchDashboardData = async () => {
    try {
      // Fetch dashboard stats
      const dashResponse = await axiosInstance.get("/api/admin/dashboard", {
        headers: { Authorization: `Bearer ${adminToken}` }
      });

      if (dashResponse.data.success) {
        setDashboard(dashResponse.data.data);
      }

      // Fetch all orders
      const ordersResponse = await axiosInstance.get("/api/admin/orders", {
        headers: { Authorization: `Bearer ${adminToken}` }
      });

      if (ordersResponse.data.success) {
        setOrders(ordersResponse.data.data);
        filterOrders(ordersResponse.data.data, statusFilter, searchTerm);
      }

      setLoading(false);
    } catch (err) {
      console.error("Fetch error:", err);
      if (err.response?.status === 401) {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
      } else {
        setError("Failed to load dashboard data");
      }
      setLoading(false);
    }
  };

  const filterOrders = (orderList, status, search) => {
    let filtered = orderList;

    if (status !== "all") {
      filtered = filtered.filter((order) => order.status === status);
    }

    if (search) {
      filtered = filtered.filter(
        (order) =>
          order.customer_name.toLowerCase().includes(search.toLowerCase()) ||
          order.order_id.toLowerCase().includes(search.toLowerCase()) ||
          order.customer_email.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredOrders(filtered);
  };

  const handleStatusChange = (status) => {
    setStatusFilter(status);
    filterOrders(orders, status, searchTerm);
  };

  const handleSearch = (e) => {
    const search = e.target.value;
    setSearchTerm(search);
    filterOrders(orders, statusFilter, search);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminName");
    localStorage.removeItem("adminEmail");
    navigate("/admin/login");
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "badge-warning",
      confirmed: "badge-info",
      preparing: "badge-info",
      ready: "badge-success",
      on_the_way: "badge-primary",
      delivered: "badge-success",
      cancelled: "badge-error"
    };
    return colors[status] || "badge-gray";
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: <FaClock className="text-warning" />,
      confirmed: <FaCheckCircle className="text-info" />,
      preparing: <FaBox className="text-info" />,
      ready: <FaCheckCircle className="text-success" />,
      on_the_way: <FaTruck className="text-primary" />,
      delivered: <FaCheckCircle className="text-success" />,
      cancelled: <FaCheckCircle className="text-error" />
    };
    return icons[status];
  };

  if (!adminToken) {
    return null;
  }

  return (
    <div className="min-h-screen bg-base-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent text-white p-6 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">👨‍💼 Admin Dashboard</h1>
            <p className="text-white/80 mt-1">Welcome back, {adminName}!</p>
          </div>
          <button
            onClick={handleLogout}
            className="btn btn-outline gap-2 border-white text-white hover:bg-white/10"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        {dashboard && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {/* Total Orders */}
            <div className="card bg-base-100 shadow-md border border-base-300 hover:shadow-lg transition-all">
              <div className="card-body">
                <h2 className="card-title text-2xl text-primary">
                  {dashboard.total_orders_today}
                </h2>
                <p className="text-base-content/60">Orders Today</p>
              </div>
            </div>

            {/* Total Revenue */}
            <div className="card bg-base-100 shadow-md border border-base-300 hover:shadow-lg transition-all">
              <div className="card-body">
                <h2 className="card-title text-2xl text-success">
                  ৳{dashboard.total_revenue_today?.toFixed(0) || 0}
                </h2>
                <p className="text-base-content/60">Revenue Today</p>
              </div>
            </div>

            {/* Pending Orders */}
            <div className="card bg-base-100 shadow-md border border-base-300 hover:shadow-lg transition-all">
              <div className="card-body">
                <h2 className="card-title text-2xl text-warning">
                  {dashboard.pending_orders_count}
                </h2>
                <p className="text-base-content/60">Pending Orders</p>
              </div>
            </div>

            {/* Total Orders Count */}
            <div className="card bg-base-100 shadow-md border border-base-300 hover:shadow-lg transition-all">
              <div className="card-body">
                <h2 className="card-title text-2xl text-info">
                  {Object.values(dashboard.orders_by_status).reduce((a, b) => a + b, 0)}
                </h2>
                <p className="text-base-content/60">Total Orders</p>
              </div>
            </div>
          </div>
        )}

        {/* Filters and Search */}
        <div className="card bg-base-100 shadow-md border border-base-300 mb-8">
          <div className="card-body">
            <h2 className="card-title mb-4">Filter & Search Orders</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Search Box */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Search</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Search by name, email, or order ID..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>

              {/* Status Filter */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Status</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  value={statusFilter}
                  onChange={(e) => handleStatusChange(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="preparing">Preparing</option>
                  <option value="ready">Ready</option>
                  <option value="on_the_way">On the Way</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="card bg-base-100 shadow-md border border-base-300">
          <div className="card-body p-0">
            <div className="overflow-x-auto">
              <table className="table table-compact w-full">
                <thead className="bg-base-200">
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Email</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Items</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="8" className="text-center py-8">
                        <span className="loading loading-spinner loading-lg text-primary"></span>
                      </td>
                    </tr>
                  ) : filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-base-200 transition-colors">
                        <td className="font-bold text-primary">{order.order_id}</td>
                        <td>{order.customer_name}</td>
                        <td className="text-sm text-base-content/60">{order.customer_email}</td>
                        <td className="font-semibold">৳{order.final_amount.toFixed(0)}</td>
                        <td>
                          <div className={`badge ${getStatusColor(order.status)} gap-2`}>
                            {getStatusIcon(order.status)}
                            {order.status.replace("_", " ")}
                          </div>
                        </td>
                        <td className="text-sm">
                          {new Date(order.created_at).toLocaleDateString()} <br />
                          {new Date(order.created_at).toLocaleTimeString()}
                        </td>
                        <td className="text-center badge badge-ghost">
                          {order.item_count} items
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => setSelectedOrder(order)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center py-8 text-base-content/60">
                        No orders found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          adminToken={adminToken}
          onStatusUpdate={() => {
            setSelectedOrder(null);
            fetchDashboardData();
          }}
        />
      )}
    </div>
  );
};

// Order Details Modal Component
const OrderDetailsModal = ({ order, onClose, adminToken, onStatusUpdate }) => {
  const axiosInstance = useAxios();
  const [orderDetails, setOrderDetails] = useState(null);
  const [newStatus, setNewStatus] = useState(order.status);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchOrderDetails();
  }, [order.id]);

  const fetchOrderDetails = async () => {
    try {
      const response = await axiosInstance.get(
        `/api/admin/orders/${order.id}`,
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );

      if (response.data.success) {
        setOrderDetails(response.data.data);
      }
      setLoading(false);
    } catch (err) {
      console.error("Fetch order details error:", err);
      setLoading(false);
    }
  };

  const handleStatusUpdate = async () => {
    if (newStatus === order.status) return;

    setUpdating(true);
    try {
      const response = await axiosInstance.put(
        `/api/admin/orders/${order.id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );

      if (response.data.success) {
        console.log("✅ Order status updated");
        onStatusUpdate();
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update order status");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{order.order_id}</h2>
          <button
            className="btn btn-sm btn-ghost"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : orderDetails ? (
          <div className="space-y-6">
            {/* Customer Info */}
            <div className="bg-base-200 p-4 rounded-lg">
              <h3 className="font-bold mb-3">Customer Information</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-base-content/60">Name</p>
                  <p className="font-semibold">{orderDetails.order.customer_name}</p>
                </div>
                <div>
                  <p className="text-base-content/60">Email</p>
                  <p className="font-semibold">{orderDetails.order.customer_email}</p>
                </div>
                <div>
                  <p className="text-base-content/60">Phone</p>
                  <p className="font-semibold">{orderDetails.order.customer_phone}</p>
                </div>
                <div>
                  <p className="text-base-content/60">Delivery Address</p>
                  <p className="font-semibold">{orderDetails.order.delivery_address}</p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div>
              <h3 className="font-bold mb-3">Order Items</h3>
              <div className="space-y-2">
                {orderDetails.items.map((item) => (
                  <div key={item.id} className="flex justify-between bg-base-200 p-3 rounded">
                    <div>
                      <p className="font-semibold">{item.item_name}</p>
                      <p className="text-sm text-base-content/60">{item.category_name}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">x{item.quantity}</p>
                      <p className="text-primary">৳{item.subtotal.toFixed(0)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-primary/10 p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span>Subtotal:</span>
                <span>৳{orderDetails.order.total_amount.toFixed(0)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Delivery:</span>
                <span>৳{orderDetails.order.delivery_charge}</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-3 pt-3 border-t">
                <span>Total:</span>
                <span className="text-primary">৳{orderDetails.order.final_amount.toFixed(0)}</span>
              </div>
            </div>

            {/* Status Update */}
            <div>
              <h3 className="font-bold mb-3">Update Order Status</h3>
              <select
                className="select select-bordered w-full mb-3"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="preparing">Preparing</option>
                <option value="ready">Ready</option>
                <option value="on_the_way">On the Way</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <button
                className="btn btn-primary w-full"
                onClick={handleStatusUpdate}
                disabled={updating || newStatus === order.status}
              >
                {updating ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Updating...
                  </>
                ) : (
                  "Update Status"
                )}
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
};

export default AdminDashboard;