// src/Pages/Staff/WaiterDashboard.jsx
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import { FaConciergeBell, FaSignOutAlt, FaCheckCircle, FaClock } from "react-icons/fa";
import { MdTableRestaurant, MdRefresh, MdDeliveryDining } from "react-icons/md";
import useStaffAuth from "../../Hooks/useStaffAuth";
import useAxios from "../../Hooks/useAxios";

const WaiterDashboard = () => {
  const navigate = useNavigate();
  const { isStaffLoggedIn, getStaffInfo, logoutStaff } = useStaffAuth();
  const axiosInstance = useAxios();

  const [readyOrders, setReadyOrders] = useState([]);
  const [servedOrders, setServedOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);
  const [error, setError] = useState("");
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [activeTab, setActiveTab] = useState("ready"); // "ready" | "served"

  const staffInfo = getStaffInfo();

  // Redirect if not waiter
  useEffect(() => {
    if (!isStaffLoggedIn()) { navigate("/login"); return; }
    if (staffInfo?.role !== "waiter") { navigate("/login"); return; }
  }, []);

  const fetchOrders = useCallback(async () => {
    try {
      const [readyRes, servedRes] = await Promise.all([
        axiosInstance.get("/api/orders?status=ready", {
          headers: { Authorization: `Bearer ${staffInfo?.token}` },
        }),
        axiosInstance.get("/api/orders?status=served", {
          headers: { Authorization: `Bearer ${staffInfo?.token}` },
        }),
      ]);
      // Sort ready: oldest first (been waiting longest)
      const ready = (readyRes.data.data || []).sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
      // Sort served: newest first
      const served = (servedRes.data.data || []).sort(
        (a, b) => new Date(b.updated_at || b.created_at) - new Date(a.updated_at || a.created_at)
      );
      setReadyOrders(ready);
      setServedOrders(served.slice(0, 20)); // last 20 served
      setLastRefresh(new Date());
      setError("");
    } catch {
      setError("Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  }, [axiosInstance, staffInfo?.token]);

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 10000); // refresh every 10s
    return () => clearInterval(interval);
  }, [fetchOrders]);

  const markServed = async (orderId) => {
    setUpdating(orderId);
    try {
      await axiosInstance.put(
        `/api/orders/${orderId}/status`,
        { status: "served" },
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

  const formatTime = (dateStr) => {
    return new Date(dateStr).toLocaleTimeString("en-BD", { hour: "2-digit", minute: "2-digit" });
  };

  const getWaitingTime = (dateStr) => {
    const mins = Math.floor((Date.now() - new Date(dateStr)) / 60000);
    if (mins < 1) return "just now";
    if (mins < 5) return `${mins}m ✓`;
    if (mins < 10) return `${mins}m ⚠️`;
    return `${mins}m 🔴`;
  };

  return (
    <div className="min-h-screen bg-base-200">

      {/* Header */}
      <div className="bg-base-100 border-b border-base-300 px-4 sm:px-8 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-info/20 flex items-center justify-center">
              <FaConciergeBell className="text-info text-lg" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">Waiter Dashboard</h1>
              <p className="text-xs text-base-content/50">Service · {staffInfo?.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Ready alert badge */}
            {readyOrders.length > 0 && (
              <div className="badge badge-success gap-1 animate-pulse">
                <FaConciergeBell className="text-xs" />
                {readyOrders.length} ready
              </div>
            )}
            <button onClick={fetchOrders} className="btn btn-ghost btn-sm">
              <MdRefresh className={`text-lg ${loading ? "animate-spin" : ""}`} />
            </button>
            <button onClick={handleLogout} className="btn btn-ghost btn-sm text-error gap-2">
              <FaSignOutAlt />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-6">

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-base-100 rounded-xl p-4 border-2 border-success/30 text-center">
            <p className="text-4xl font-black text-success">{readyOrders.length}</p>
            <p className="text-xs text-base-content/50 mt-1 flex items-center justify-center gap-1">
              <MdDeliveryDining className="text-success text-base" /> Ready to Deliver
            </p>
          </div>
          <div className="bg-base-100 rounded-xl p-4 border border-base-300 text-center">
            <p className="text-4xl font-black text-base-content/40">{servedOrders.length}</p>
            <p className="text-xs text-base-content/50 mt-1 flex items-center justify-center gap-1">
              <FaCheckCircle className="text-base-content/30" /> Served Today
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

        {/* Tabs */}
        <div className="tabs tabs-boxed mb-4 bg-base-100">
          <button
            className={`tab flex-1 gap-2 ${activeTab === "ready" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("ready")}
          >
            🔔 Ready to Serve
            {readyOrders.length > 0 && (
              <span className="badge badge-success badge-sm">{readyOrders.length}</span>
            )}
          </button>
          <button
            className={`tab flex-1 gap-2 ${activeTab === "served" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("served")}
          >
            ✅ Served
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <span className="loading loading-spinner loading-lg text-info"></span>
            <p className="text-base-content/50">Loading orders...</p>
          </div>
        ) : activeTab === "ready" ? (
          readyOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3 bg-base-100 rounded-2xl border border-base-300">
              <div className="text-6xl">🍽️</div>
              <h3 className="font-bold text-lg">No orders ready yet</h3>
              <p className="text-base-content/50 text-sm">Kitchen will notify you when food is ready.</p>
              <p className="text-base-content/30 text-xs">Auto-refreshes every 10 seconds</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-success animate-ping"></span>
                <h2 className="font-bold text-sm text-base-content/70 uppercase tracking-wider">
                  Collect from Kitchen & Deliver
                </h2>
              </div>

              {readyOrders.map((order) => (
                <div key={order.id} className="bg-base-100 rounded-2xl border-2 border-success/40 p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center text-2xl">
                        🍱
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-black text-lg">#{order.order_id}</span>
                          <span className="badge badge-success badge-sm">Ready</span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <MdTableRestaurant className="text-primary text-sm" />
                          <span className="font-bold text-primary">Table {order.table_number}</span>
                          <span className="text-base-content/40 text-xs">·</span>
                          <span className="text-base-content/40 text-xs">{formatTime(order.created_at)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-semibold text-base-content/50">Waiting</p>
                      <p className="text-sm font-bold">{getWaitingTime(order.created_at)}</p>
                    </div>
                  </div>

                  {/* Items summary */}
                  <WaiterOrderItems orderId={order.id} token={staffInfo?.token} axiosInstance={axiosInstance} />

                  {/* Total */}
                  <div className="flex justify-between items-center mt-3 px-1">
                    <span className="text-sm text-base-content/50">Total</span>
                    <span className="font-bold text-primary">৳{Number(order.total_amount).toFixed(0)}</span>
                  </div>

                  {/* Mark served button */}
                  <button
                    className="btn btn-success w-full mt-4 gap-2 text-base"
                    disabled={updating === order.id}
                    onClick={() => markServed(order.id)}
                  >
                    {updating === order.id ? (
                      <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                      <FaCheckCircle />
                    )}
                    Delivered to Table {order.table_number} ✓
                  </button>
                </div>
              ))}
            </div>
          )
        ) : (
          /* Served tab */
          servedOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3 bg-base-100 rounded-2xl border border-base-300">
              <div className="text-5xl">📋</div>
              <p className="text-base-content/50">No orders served yet today.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {servedOrders.map((order) => (
                <div key={order.id} className="bg-base-100 rounded-xl border border-base-300 p-4 flex items-center gap-4 opacity-70">
                  <FaCheckCircle className="text-success text-xl flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold">#{order.order_id}</span>
                      <span className="badge badge-ghost badge-xs">Served</span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <MdTableRestaurant className="text-primary text-xs" />
                      <span className="text-sm text-primary font-semibold">Table {order.table_number}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">৳{Number(order.total_amount).toFixed(0)}</p>
                    <p className="text-xs text-base-content/40">{formatTime(order.updated_at || order.created_at)}</p>
                  </div>
                </div>
              ))}
            </div>
          )
        )}

        <p className="text-center text-xs text-base-content/30 mt-6">
          Last refreshed: {lastRefresh.toLocaleTimeString("en-BD")} · Auto-refreshes every 10s
        </p>
      </div>
    </div>
  );
};

// Sub-component
const WaiterOrderItems = ({ orderId, token, axiosInstance }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(`/api/orders/${orderId}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setItems(res.data.data?.items || []))
      .catch(() => {});
  }, [orderId, token, axiosInstance]);

  return (
    <div className="bg-base-200 rounded-xl p-3">
      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-2 py-1">
          <span className="badge badge-primary badge-sm font-bold">{item.quantity}×</span>
          <span className="text-sm">{item.item_name}</span>
        </div>
      ))}
    </div>
  );
};

export default WaiterDashboard;