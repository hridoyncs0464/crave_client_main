// src/Pages/Staff/ChefDashboard.jsx
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import { FaUtensils, FaSignOutAlt, FaFire, FaCheckCircle, FaClock } from "react-icons/fa";
import { MdTableRestaurant, MdRefresh } from "react-icons/md";
import useStaffAuth from "../../Hooks/useStaffAuth";
import useAxios from "../../Hooks/useAxios";

const STATUS_CONFIG = {
  pending:    { label: "New Order",  color: "badge-error",   bg: "bg-error/10 border-error/30",    icon: "🆕" },
  preparing:  { label: "Cooking",    color: "badge-warning", bg: "bg-warning/10 border-warning/30", icon: "👨‍🍳" },
  ready:      { label: "Ready",      color: "badge-success", bg: "bg-success/10 border-success/30", icon: "✅" },
};

const ChefDashboard = () => {
  const navigate = useNavigate();
  const { isStaffLoggedIn, getStaffInfo, logoutStaff } = useStaffAuth();
  const axiosInstance = useAxios();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null); // order id being updated
  const [error, setError] = useState("");
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const staffInfo = getStaffInfo();

  // Redirect if not chef
  useEffect(() => {
    if (!isStaffLoggedIn()) { navigate("/login"); return; }
    if (staffInfo?.role !== "chef") { navigate("/login"); return; }
  }, []);

  const fetchOrders = useCallback(async () => {
    try {
      const res = await axiosInstance.get("/api/orders?status=pending", {
        headers: { Authorization: `Bearer ${staffInfo?.token}` },
      });
      // Also fetch preparing orders
      const res2 = await axiosInstance.get("/api/orders?status=preparing", {
        headers: { Authorization: `Bearer ${staffInfo?.token}` },
      });
      const combined = [...(res.data.data || []), ...(res2.data.data || [])];
      // Sort: pending first, then preparing; within each group newest first
      combined.sort((a, b) => {
        if (a.status === b.status) return new Date(a.created_at) - new Date(b.created_at);
        return a.status === "pending" ? -1 : 1;
      });
      setOrders(combined);
      setLastRefresh(new Date());
      setError("");
    } catch {
      setError("Failed to fetch orders. Check your connection.");
    } finally {
      setLoading(false);
    }
  }, [axiosInstance, staffInfo?.token]);

  useEffect(() => {
    fetchOrders();
    // Auto-refresh every 15 seconds
    const interval = setInterval(fetchOrders, 15000);
    return () => clearInterval(interval);
  }, [fetchOrders]);

  const updateOrderStatus = async (orderId, newStatus) => {
    setUpdating(orderId);
    try {
      await axiosInstance.put(
        `/api/orders/${orderId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${staffInfo?.token}` } }
      );
      await fetchOrders();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update order.");
    } finally {
      setUpdating(null);
    }
  };

  const handleLogout = () => {
    logoutStaff();
    navigate("/login");
  };

  const pendingCount = orders.filter(o => o.status === "pending").length;
  const preparingCount = orders.filter(o => o.status === "preparing").length;

  const formatTime = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleTimeString("en-BD", { hour: "2-digit", minute: "2-digit" });
  };

  const getMinutesAgo = (dateStr) => {
    const mins = Math.floor((Date.now() - new Date(dateStr)) / 60000);
    if (mins < 1) return "just now";
    if (mins === 1) return "1 min ago";
    return `${mins} mins ago`;
  };

  return (
    <div className="min-h-screen bg-base-200">

      {/* Header */}
      <div className="bg-base-100 border-b border-base-300 px-4 sm:px-8 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-warning/20 flex items-center justify-center">
              <FaUtensils className="text-warning text-lg" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">Kitchen Dashboard</h1>
              <p className="text-xs text-base-content/50">Chef · {staffInfo?.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchOrders}
              className="btn btn-ghost btn-sm gap-2"
              title="Refresh orders"
            >
              <MdRefresh className={`text-lg ${loading ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline text-xs text-base-content/50">
                {lastRefresh.toLocaleTimeString("en-BD", { hour: "2-digit", minute: "2-digit" })}
              </span>
            </button>
            <button onClick={handleLogout} className="btn btn-ghost btn-sm text-error gap-2">
              <FaSignOutAlt />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-6">

        {/* Stats bar */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-base-100 rounded-xl p-4 border border-base-300 text-center">
            <p className="text-3xl font-black text-error">{pendingCount}</p>
            <p className="text-xs text-base-content/50 mt-1 flex items-center justify-center gap-1">
              <FaClock className="text-error" /> New Orders
            </p>
          </div>
          <div className="bg-base-100 rounded-xl p-4 border border-base-300 text-center">
            <p className="text-3xl font-black text-warning">{preparingCount}</p>
            <p className="text-xs text-base-content/50 mt-1 flex items-center justify-center gap-1">
              <FaFire className="text-warning" /> Cooking
            </p>
          </div>
          <div className="bg-base-100 rounded-xl p-4 border border-base-300 text-center">
            <p className="text-3xl font-black text-success">{orders.length}</p>
            <p className="text-xs text-base-content/50 mt-1 flex items-center justify-center gap-1">
              <FaCheckCircle className="text-success" /> Total Active
            </p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="alert alert-error mb-4 text-sm">
            <span>{error}</span>
            <button className="btn btn-ghost btn-xs" onClick={() => setError("")}>✕</button>
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <span className="loading loading-spinner loading-lg text-warning"></span>
            <p className="text-base-content/50">Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 bg-base-100 rounded-2xl border border-base-300">
            <div className="text-6xl">🍽️</div>
            <h3 className="font-bold text-lg">All caught up!</h3>
            <p className="text-base-content/50 text-sm">No pending or active orders right now.</p>
            <p className="text-base-content/30 text-xs">Auto-refreshes every 15 seconds</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {/* Section headers */}
            {pendingCount > 0 && (
              <div className="flex items-center gap-2 mt-2">
                <span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>
                <h2 className="font-bold text-sm text-base-content/70 uppercase tracking-wider">
                  New Orders ({pendingCount})
                </h2>
              </div>
            )}

            {orders.map((order) => (
              <div
                key={order.id}
                className={`bg-base-100 rounded-2xl border-2 p-5 transition-all ${STATUS_CONFIG[order.status]?.bg || "border-base-300"}`}
              >
                {/* Order header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-base-200 flex items-center justify-center text-xl">
                      {STATUS_CONFIG[order.status]?.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-lg">#{order.order_id}</span>
                        <span className={`badge badge-sm ${STATUS_CONFIG[order.status]?.color}`}>
                          {STATUS_CONFIG[order.status]?.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <MdTableRestaurant className="text-primary text-sm" />
                        <span className="font-semibold text-primary text-sm">Table {order.table_number}</span>
                        <span className="text-base-content/40 text-xs">·</span>
                        <span className="text-base-content/40 text-xs">{getMinutesAgo(order.created_at)}</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-base-content/40">{formatTime(order.created_at)}</span>
                </div>

                {/* Items — fetched inline */}
                <OrderItems orderId={order.id} token={staffInfo?.token} axiosInstance={axiosInstance} />

                {/* Customer note */}
                {order.customer_note && (
                  <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2">
                    <p className="text-xs text-yellow-800">
                      <span className="font-bold">📝 Note: </span>{order.customer_note}
                    </p>
                  </div>
                )}

                {/* Action buttons */}
                <div className="mt-4 flex gap-2">
                  {order.status === "pending" && (
                    <button
                      className="btn btn-warning flex-1 gap-2"
                      disabled={updating === order.id}
                      onClick={() => updateOrderStatus(order.id, "preparing")}
                    >
                      {updating === order.id ? (
                        <span className="loading loading-spinner loading-sm"></span>
                      ) : (
                        <FaFire />
                      )}
                      Start Cooking
                    </button>
                  )}
                  {order.status === "preparing" && (
                    <button
                      className="btn btn-success flex-1 gap-2"
                      disabled={updating === order.id}
                      onClick={() => updateOrderStatus(order.id, "ready")}
                    >
                      {updating === order.id ? (
                        <span className="loading loading-spinner loading-sm"></span>
                      ) : (
                        <FaCheckCircle />
                      )}
                      Mark as Ready 🔔
                    </button>
                  )}
                </div>
              </div>
            ))}

            {preparingCount > 0 && pendingCount > 0 && (
              <div className="flex items-center gap-2 mt-2">
                <span className="w-2 h-2 rounded-full bg-warning animate-pulse"></span>
                <h2 className="font-bold text-sm text-base-content/70 uppercase tracking-wider">
                  Currently Cooking ({preparingCount})
                </h2>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Sub-component to load items per order
const OrderItems = ({ orderId, token, axiosInstance }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(`/api/orders/${orderId}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setItems(res.data.data?.items || []))
      .catch(() => {});
  }, [orderId, token, axiosInstance]);

  return (
    <div className="bg-base-200 rounded-xl p-3">
      <p className="text-xs font-bold text-base-content/50 uppercase tracking-wider mb-2">Items</p>
      <div className="flex flex-col gap-1">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="badge badge-primary badge-sm font-bold">{item.quantity}×</span>
              <span className="text-sm font-medium">{item.item_name}</span>
            </div>
            {item.special_notes && (
              <span className="text-xs text-warning bg-warning/10 px-2 py-0.5 rounded-full">
                ⚠️ {item.special_notes}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChefDashboard;