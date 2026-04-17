import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import useAxios from "../../Hooks/useAxios";

const getToken = () => localStorage.getItem("staffToken");

const printCashMemo = (detail) => {
  const { order, items } = detail;
  const date = new Date(order.created_at).toLocaleDateString();
  const time = new Date(order.created_at).toLocaleTimeString();

  const receiptHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Cash Memo - ${order.order_id}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Courier New', monospace; font-size: 12px; line-height: 1.4; padding: 20px; }
        .receipt { max-width: 280px; margin: 0 auto; }
        .header { text-align: center; border-bottom: 1px dashed #000; padding-bottom: 10px; margin-bottom: 10px; }
        .restaurant-name { font-size: 18px; font-weight: bold; }
        .address { font-size: 10px; margin-top: 2px; }
        .info { display: flex; justify-content: space-between; margin-bottom: 10px; }
        .items { border-bottom: 1px dashed #000; padding-bottom: 10px; margin-bottom: 10px; }
        .item { display: flex; justify-content: space-between; margin-bottom: 4px; }
        .item-name { flex: 1; }
        .item-qty { margin-right: 10px; }
        .item-price { text-align: right; min-width: 50px; }
        .total { display: flex; justify-content: space-between; font-size: 14px; font-weight: bold; margin-top: 10px; }
        .footer { text-align: center; margin-top: 20px; font-size: 10px; }
        @media print { body { padding: 0; } }
      </style>
    </head>
    <body>
      <div class="receipt">
        <div class="header">
          <div class="restaurant-name">🔥 Crave</div>
          <div class="address">Restaurant</div>
          <div class="address">Table: ${order.table_number}</div>
        </div>
        <div class="info">
          <span>Order: ${order.order_id}</span>
          <span>${date}</span>
        </div>
        <div class="info">
          <span>${time}</span>
          <span>Status: ${order.status.toUpperCase()}</span>
        </div>
        <div class="items">
          ${items
            .map(
              (item) => `
            <div class="item">
              <span class="item-name">${item.item_name}</span>
              <span class="item-qty">×${item.quantity}</span>
              <span class="item-price">৳${Number(item.subtotal).toFixed(0)}</span>
            </div>
          `,
            )
            .join("")}
        </div>
        <div class="total">
          <span>TOTAL</span>
          <span>৳${Number(order.total_amount).toFixed(0)}</span>
        </div>
        <div class="footer">
          <p>Thank you for dining with us!</p>
          <p>Powered by Crave Restaurant</p>
        </div>
      </div>
      <script>window.print();</script>
    </body>
    </html>
  `;

  const printWindow = window.open("", "_blank");
  printWindow.document.write(receiptHTML);
  printWindow.document.close();
};

const STATUS_COLORS = {
  pending: {
    bg: "bg-yellow-100",
    text: "text-yellow-800",
    dot: "bg-yellow-400",
  },
  preparing: { bg: "bg-blue-100", text: "text-blue-800", dot: "bg-blue-400" },
  ready: { bg: "bg-purple-100", text: "text-purple-800", dot: "bg-purple-400" },
  served: { bg: "bg-green-100", text: "text-green-800", dot: "bg-green-400" },
  cancelled: { bg: "bg-red-100", text: "text-red-800", dot: "bg-red-400" },
};

const StatusBadge = ({ status }) => {
  const c = STATUS_COLORS[status] || STATUS_COLORS.pending;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${c.bg} ${c.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`}></span>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

// ─── Sidebar ─────────────────────────────────────────────────────────────────
const NAV = [
  { id: "overview", label: "Overview", icon: "📊" },
  { id: "orders", label: "Orders", icon: "🍽️" },
  { id: "menu", label: "Menu Management", icon: "📋" },
  { id: "staff", label: "Staff", icon: "👥" },
  { id: "reservations", label: "Reservations", icon: "📅" },
];

const Sidebar = ({ active, setActive, adminName, onLogout }) => (
  <aside className="w-64 min-h-screen bg-gray-900 text-white flex flex-col">
    <div className="p-6 border-b border-gray-700">
      <h1 className="text-2xl font-black tracking-tight">🔥 Crave</h1>
      <p className="text-gray-400 text-xs mt-1">Admin Dashboard</p>
    </div>
    <nav className="flex-1 p-4 space-y-1">
      {NAV.map((item) => (
        <button
          key={item.id}
          onClick={() => setActive(item.id)}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
            active === item.id
              ? "bg-orange-500 text-white"
              : "text-gray-400 hover:bg-gray-800 hover:text-white"
          }`}
        >
          <span className="text-lg">{item.icon}</span>
          {item.label}
        </button>
      ))}
    </nav>
    <div className="p-4 border-t border-gray-700">
      <p className="text-xs text-gray-400 mb-1">Logged in as</p>
      <p className="text-sm font-semibold text-white truncate">{adminName}</p>
      <button
        onClick={onLogout}
        className="mt-3 w-full text-xs text-gray-400 hover:text-red-400 text-left transition-colors"
      >
        → Sign out
      </button>
    </div>
  </aside>
);

// ─── Overview Panel ───────────────────────────────────────────────────────────
const Overview = ({ stats, recentOrders, onViewOrders }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-800">
      Good day! Here's your snapshot.
    </h2>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        {
          label: "Orders Today",
          value: stats.total_orders_today ?? "—",
          color: "text-orange-500",
        },
        {
          label: "Revenue Today",
          value: `৳${Number(stats.total_revenue_today || 0).toFixed(0)}`,
          color: "text-green-600",
        },
        {
          label: "Pending",
          value: stats.orders_by_status?.pending ?? 0,
          color: "text-yellow-500",
        },
        {
          label: "Preparing",
          value: stats.orders_by_status?.preparing ?? 0,
          color: "text-blue-500",
        },
      ].map((s) => (
        <div
          key={s.label}
          className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
        >
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
            {s.label}
          </p>
          <p className={`text-3xl font-black mt-2 ${s.color}`}>{s.value}</p>
        </div>
      ))}
    </div>

    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="flex items-center justify-between p-5 border-b border-gray-100">
        <h3 className="font-bold text-gray-800">Recent Orders</h3>
        <button
          onClick={onViewOrders}
          className="text-orange-500 text-sm font-medium hover:underline"
        >
          View all →
        </button>
      </div>
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            {["Order ID", "Table", "Amount", "Status", "Time"].map((h) => (
              <th
                key={h}
                className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(recentOrders || []).map((o) => (
            <tr
              key={o.id}
              className="border-t border-gray-50 hover:bg-gray-50 transition-colors"
            >
              <td className="px-5 py-3 font-mono text-xs text-gray-600">
                {o.order_id}
              </td>
              <td className="px-5 py-3 font-semibold">
                Table {o.table_number}
              </td>
              <td className="px-5 py-3 font-semibold text-gray-800">
                ৳{Number(o.total_amount).toFixed(0)}
              </td>
              <td className="px-5 py-3">
                <StatusBadge status={o.status} />
              </td>
              <td className="px-5 py-3 text-gray-400 text-xs">
                {new Date(o.created_at).toLocaleTimeString()}
              </td>
            </tr>
          ))}
          {!recentOrders?.length && (
            <tr>
              <td colSpan={5} className="px-5 py-10 text-center text-gray-400">
                No orders yet today
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

// ─── Orders Panel ─────────────────────────────────────────────────────────────
const STATUSES = [
  "all",
  "pending",
  "preparing",
  "ready",
  "served",
  "cancelled",
];

const Orders = () => {
  const axiosInstance = useAxios();
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [detail, setDetail] = useState(null);

  const authConfig = { headers: { Authorization: `Bearer ${getToken()}` } };

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = filter !== "all" ? { status: filter } : {};
      const response = await axiosInstance.get("/api/orders", {
        ...authConfig,
        params,
      });
      if (response.data.success) setOrders(response.data.data);
    } catch (err) {
      console.error("Failed to load orders:", err.message);
    }
    setLoading(false);
  }, [filter]);

  useEffect(() => {
    load();
  }, [load]);

  const loadDetail = async (id) => {
    setSelected(id);
    try {
      const response = await axiosInstance.get(`/api/orders/${id}`, authConfig);
      if (response.data.success) setDetail(response.data.data);
    } catch (err) {
      console.error("Failed to load order detail:", err.message);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axiosInstance.put(
        `/api/orders/${id}/status`,
        { status },
        authConfig,
      );
      await load();
      if (selected === id) loadDetail(id);
    } catch (err) {
      console.error("Failed to update status:", err.message);
    }
  };

  const nextStatus = {
    pending: "preparing",
    preparing: "ready",
    ready: "served",
  };

  return (
    <div className="flex gap-6 h-full">
      <div className="flex-1 space-y-4 min-w-0">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Orders</h2>
          <button
            onClick={load}
            className="text-sm text-gray-500 hover:text-orange-500 transition-colors"
          >
            ↻ Refresh
          </button>
        </div>

        <div className="flex gap-2 flex-wrap">
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === s
                  ? "bg-orange-500 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading orders…</div>
        ) : (
          <div className="space-y-3">
            {orders.map((o) => (
              <div
                key={o.id}
                onClick={() => loadDetail(o.id)}
                className={`bg-white rounded-xl p-4 border cursor-pointer transition-all hover:shadow-md ${
                  selected === o.id
                    ? "border-orange-400 shadow-md"
                    : "border-gray-100"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-bold text-gray-800">
                      Table {o.table_number}
                    </p>
                    <p className="text-xs text-gray-400 font-mono mt-0.5">
                      {o.order_id}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {o.item_count} items · ৳
                      {Number(o.total_amount).toFixed(0)}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <StatusBadge status={o.status} />
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(o.created_at).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                {nextStatus[o.status] && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      updateStatus(o.id, nextStatus[o.status]);
                    }}
                    className="mt-3 w-full py-2 bg-orange-50 hover:bg-orange-500 hover:text-white text-orange-600 text-sm font-semibold rounded-lg transition-all"
                  >
                    Mark as {nextStatus[o.status]} →
                  </button>
                )}
                {o.status === "pending" && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      updateStatus(o.id, "cancelled");
                    }}
                    className="mt-1 w-full py-1.5 text-red-400 hover:text-red-600 text-xs font-medium transition-colors"
                  >
                    Cancel order
                  </button>
                )}
              </div>
            ))}
            {orders.length === 0 && (
              <div className="text-center py-20 text-gray-400 bg-white rounded-xl border border-gray-100">
                No {filter !== "all" ? filter : ""} orders found
              </div>
            )}
          </div>
        )}
      </div>

      {detail && (
        <div className="w-80 shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4 self-start sticky top-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-800">Order Detail</h3>
            <button
              onClick={() => {
                setSelected(null);
                setDetail(null);
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          <button
            onClick={() => printCashMemo(detail)}
            className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
          >
            🖨️ Print Cash Memo
          </button>
          <div className="text-xs text-gray-500 space-y-1">
            <p>
              <span className="font-semibold text-gray-700">Table:</span>{" "}
              {detail.order.table_number}
            </p>
            <p>
              <span className="font-semibold text-gray-700">Order ID:</span>{" "}
              {detail.order.order_id}
            </p>
            <p>
              <span className="font-semibold text-gray-700">Status:</span>{" "}
              <StatusBadge status={detail.order.status} />
            </p>
            {detail.order.customer_note && (
              <p>
                <span className="font-semibold text-gray-700">Note:</span>{" "}
                {detail.order.customer_note}
              </p>
            )}
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Items
            </p>
            <div className="space-y-2">
              {detail.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-700">
                    {item.item_name}{" "}
                    <span className="text-gray-400">×{item.quantity}</span>
                  </span>
                  <span className="font-semibold text-gray-800">
                    ৳{Number(item.subtotal).toFixed(0)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 mt-3 pt-3 flex justify-between font-bold">
              <span>Total</span>
              <span>৳{Number(detail.order.total_amount).toFixed(0)}</span>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Timeline
            </p>
            <div className="space-y-2">
              {detail.tracking.map((t) => (
                <div key={t.id} className="flex gap-2 text-xs">
                  <span className="text-gray-400 shrink-0">
                    {new Date(t.timestamp).toLocaleTimeString()}
                  </span>
                  <span className="text-gray-600">{t.message}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Menu Management Panel ────────────────────────────────────────────────────
const MenuManagement = () => {
  const axiosInstance = useAxios();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editPrice, setEditPrice] = useState("");
  const [saving, setSaving] = useState(false);
  const [filterCat, setFilterCat] = useState("all");
  const [categories, setCategories] = useState([]);

  const authConfig = { headers: { Authorization: `Bearer ${getToken()}` } };

  const load = async () => {
    setLoading(true);
    try {
      const [menuRes, catRes] = await Promise.all([
        axiosInstance.get("/api/menu"),
        axiosInstance.get("/api/categories"),
      ]);
      if (menuRes.data.success) setItems(menuRes.data.data);
      if (catRes.data.success) setCategories(catRes.data.data);
    } catch (err) {
      console.error("Failed to load menu:", err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const toggleAvailable = async (item) => {
    try {
      await axiosInstance.put(
        `/api/admin/menu/${item.id}`,
        { is_available: !item.is_available },
        authConfig,
      );
      load();
    } catch (err) {
      console.error("Failed to toggle availability:", err.message);
    }
  };

  const savePrice = async (id) => {
    if (!editPrice || isNaN(editPrice)) return;
    setSaving(true);
    try {
      await axiosInstance.put(
        `/api/admin/menu/${id}`,
        { price_bdt: parseFloat(editPrice) },
        authConfig,
      );
      setEditId(null);
    } catch (err) {
      console.error("Failed to save price:", err.message);
    }
    setSaving(false);
    load();
  };

  const filtered =
    filterCat === "all"
      ? items
      : items.filter((i) => String(i.category_id) === String(filterCat));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Menu Management</h2>
        <span className="text-sm text-gray-500">{filtered.length} items</span>
      </div>

      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setFilterCat("all")}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
            filterCat === "all"
              ? "bg-orange-500 text-white"
              : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
          }`}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setFilterCat(String(c.id))}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              filterCat === String(c.id)
                ? "bg-orange-500 text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
            }`}
          >
            {c.category_name}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-400">Loading menu…</div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                {["Item", "Category", "Price (৳)", "Available", "Actions"].map(
                  (h) => (
                    <th
                      key={h}
                      className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-gray-50 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-5 py-3">
                    <p className="font-semibold text-gray-800">
                      {item.item_name}
                    </p>
                    {item.is_unique && (
                      <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                        Unique
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3 text-gray-500">
                    {item.category_name}
                  </td>
                  <td className="px-5 py-3">
                    {editId === item.id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={editPrice}
                          onChange={(e) => setEditPrice(e.target.value)}
                          className="w-24 border border-orange-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
                          autoFocus
                        />
                        <button
                          onClick={() => savePrice(item.id)}
                          disabled={saving}
                          className="text-xs bg-orange-500 text-white px-3 py-1 rounded-lg hover:bg-orange-600 transition-colors"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditId(null)}
                          className="text-xs text-gray-400 hover:text-gray-600"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <span className="font-bold text-gray-800">
                        ৳{Number(item.price_bdt).toFixed(0)}
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <button
                      onClick={() => toggleAvailable(item)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        item.is_available !== false
                          ? "bg-green-400"
                          : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                          item.is_available !== false
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                  </td>
                  <td className="px-5 py-3">
                    <button
                      onClick={() => {
                        setEditId(item.id);
                        setEditPrice(Number(item.price_bdt).toFixed(0));
                      }}
                      className="text-xs text-orange-500 hover:text-orange-700 font-medium"
                    >
                      Edit Price
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// ─── Staff Panel ──────────────────────────────────────────────────────────────
const Staff = () => {
  const axiosInstance = useAxios();
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "waiter",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const authConfig = { headers: { Authorization: `Bearer ${getToken()}` } };

  const load = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/api/admin/staff", authConfig);
      if (response.data.success) setStaff(response.data.data);
    } catch (err) {
      console.error("Failed to load staff:", err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const addStaff = async () => {
    if (!form.name || !form.email || !form.password) {
      setError("All fields required");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const response = await axiosInstance.post(
        "/api/admin/staff",
        form,
        authConfig,
      );
      if (response.data.success) {
        setShowForm(false);
        setForm({ name: "", email: "", password: "", role: "waiter" });
        load();
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add staff");
    }
    setSubmitting(false);
  };

  const toggleStaff = async (id) => {
    try {
      await axiosInstance.put(`/api/admin/staff/${id}/toggle`, {}, authConfig);
      load();
    } catch (err) {
      console.error("Failed to toggle staff:", err.message);
    }
  };

  const removeStaff = async (id) => {
    if (!confirm("Remove this staff member?")) return;
    try {
      await axiosInstance.delete(`/api/admin/staff/${id}`, authConfig);
      load();
    } catch (err) {
      console.error("Failed to remove staff:", err.message);
    }
  };

  const ROLE_COLORS = {
    admin: "bg-red-100 text-red-700",
    chef: "bg-blue-100 text-blue-700",
    waiter: "bg-green-100 text-green-700",
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Staff Management</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
        >
          + Add Staff
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl border border-orange-200 p-6 space-y-4">
          <h3 className="font-bold text-gray-800">Add New Staff Member</h3>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                label: "Full Name",
                key: "name",
                type: "text",
                placeholder: "John Doe",
              },
              {
                label: "Email",
                key: "email",
                type: "email",
                placeholder: "john@crave.com",
              },
              {
                label: "Password",
                key: "password",
                type: "password",
                placeholder: "••••••••",
              },
            ].map(({ label, key, type, placeholder }) => (
              <div key={key}>
                <label className="text-xs font-semibold text-gray-500 block mb-1">
                  {label}
                </label>
                <input
                  type={type}
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
                  placeholder={placeholder}
                />
              </div>
            ))}
            <div>
              <label className="text-xs font-semibold text-gray-500 block mb-1">
                Role
              </label>
              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
              >
                <option value="waiter">Waiter</option>
                <option value="chef">Chef</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={addStaff}
              disabled={submitting}
              className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-6 py-2 rounded-xl transition-colors disabled:opacity-50"
            >
              {submitting ? "Adding…" : "Add Staff Member"}
            </button>
            <button
              onClick={() => {
                setShowForm(false);
                setError("");
              }}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-20 text-gray-400">Loading staff…</div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                {["Name", "Email", "Role", "Status", "Actions"].map((h) => (
                  <th
                    key={h}
                    className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {staff.map((s) => (
                <tr
                  key={s.id}
                  className="border-t border-gray-50 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-5 py-3 font-semibold text-gray-800">
                    {s.name}
                  </td>
                  <td className="px-5 py-3 text-gray-500">{s.email}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${ROLE_COLORS[s.role]}`}
                    >
                      {s.role.charAt(0).toUpperCase() + s.role.slice(1)}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        s.is_active
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {s.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex gap-3">
                      <button
                        onClick={() => toggleStaff(s.id)}
                        className="text-xs text-blue-500 hover:text-blue-700 font-medium"
                      >
                        {s.is_active ? "Deactivate" : "Activate"}
                      </button>
                      <button
                        onClick={() => removeStaff(s.id)}
                        className="text-xs text-red-400 hover:text-red-600 font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {staff.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-10 text-center text-gray-400"
                  >
                    No staff members yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// ─── Reservations Panel ───────────────────────────────────────────────────────
const ReservationsPanel = () => {
  const axiosInstance = useAxios();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const authConfig = { headers: { Authorization: `Bearer ${getToken()}` } };

  const load = async () => {
    setLoading(true);
    try {
      const params = filter !== "all" ? { status: filter } : {};
      const response = await axiosInstance.get("/api/reservations", {
        ...authConfig,
        params,
      });
      if (response.data.success) setReservations(response.data.data);
    } catch (err) {
      console.error("Failed to load reservations:", err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [filter]);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Reservations</h2>
      <div className="flex gap-2">
        {["all", "pending", "confirmed", "cancelled"].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === s
                ? "bg-orange-500 text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
            }`}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>
      {loading ? (
        <div className="text-center py-20 text-gray-400">Loading…</div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                {["Name", "Phone", "Guests", "Date", "Time", "Status"].map(
                  (h) => (
                    <th
                      key={h}
                      className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {reservations.map((r) => (
                <tr
                  key={r.id}
                  className="border-t border-gray-50 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-5 py-3 font-semibold text-gray-800">
                    {r.customer_name}
                  </td>
                  <td className="px-5 py-3 text-gray-500">
                    {r.customer_phone}
                  </td>
                  <td className="px-5 py-3 text-center font-semibold">
                    {r.number_of_guests}
                  </td>
                  <td className="px-5 py-3 text-gray-600">
                    {new Date(r.reservation_date).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-3 text-gray-600">
                    {r.reservation_time}
                  </td>
                  <td className="px-5 py-3">
                    <StatusBadge status={r.status} />
                  </td>
                </tr>
              ))}
              {reservations.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-10 text-center text-gray-400"
                  >
                    No reservations found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// ─── Main Dashboard ───────────────────────────────────────────────────────────
const AdminDashboard = () => {
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const [active, setActive] = useState("overview");
  const [stats, setStats] = useState({});
  const [recentOrders, setRecentOrders] = useState([]);

  const authConfig = { headers: { Authorization: `Bearer ${getToken()}` } };

  const staffInfo = (() => {
    try {
      const token = getToken();
      if (!token) return null;
      return JSON.parse(atob(token.split(".")[1]));
    } catch {
      return null;
    }
  })();

  useEffect(() => {
    if (!getToken()) {
      navigate("/admin/login");
      return;
    }
    if (staffInfo?.role !== "admin") {
      navigate("/staff/orders");
      return;
    }

    axiosInstance
      .get("/api/admin/dashboard", authConfig)
      .then((response) => {
        if (response.data.success) {
          setStats(response.data.data);
          setRecentOrders(response.data.data.recent_orders || []);
        }
      })
      .catch((err) => console.error("Dashboard load error:", err.message));
  }, []);

  const logout = () => {
    localStorage.removeItem("staffToken");
    localStorage.removeItem("staffRole");
    localStorage.removeItem("staffName");
    navigate("/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        active={active}
        setActive={setActive}
        adminName={staffInfo?.name || "Admin"}
        onLogout={logout}
      />
      <main className="flex-1 p-8 overflow-auto">
        {active === "overview" && (
          <Overview
            stats={stats}
            recentOrders={recentOrders}
            onViewOrders={() => setActive("orders")}
          />
        )}
        {active === "orders" && <Orders />}
        {active === "menu" && <MenuManagement />}
        {active === "staff" && <Staff />}
        {active === "reservations" && <ReservationsPanel />}
      </main>
    </div>
  );
};

export default AdminDashboard;

// import { useState, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router";
// import useAxios from "../../hooks/useAxios";
// // import useAxios from "../../hooks/useAxios";
// // import useAxios from "../../Hooks/useAxios";

// const getToken = () => localStorage.getItem("staffToken");

// const STATUS_COLORS = {
//   pending:   { bg: "bg-yellow-100", text: "text-yellow-800", dot: "bg-yellow-400" },
//   preparing: { bg: "bg-blue-100",   text: "text-blue-800",   dot: "bg-blue-400" },
//   ready:     { bg: "bg-purple-100", text: "text-purple-800", dot: "bg-purple-400" },
//   served:    { bg: "bg-green-100",  text: "text-green-800",  dot: "bg-green-400" },
//   cancelled: { bg: "bg-red-100",    text: "text-red-800",    dot: "bg-red-400" },
// };

// const StatusBadge = ({ status }) => {
//   const c = STATUS_COLORS[status] || STATUS_COLORS.pending;
//   return (
//     <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${c.bg} ${c.text}`}>
//       <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`}></span>
//       {status.charAt(0).toUpperCase() + status.slice(1)}
//     </span>
//   );
// };

// // ─── Sidebar ─────────────────────────────────────────────────────────────────
// const NAV = [
//   { id: "overview",     label: "Overview",        icon: "📊" },
//   { id: "orders",       label: "Orders",          icon: "🍽️" },
//   { id: "menu",         label: "Menu Management", icon: "📋" },
//   { id: "staff",        label: "Staff",           icon: "👥" },
//   { id: "reservations", label: "Reservations",    icon: "📅" },
// ];

// const Sidebar = ({ active, setActive, adminName, onLogout }) => (
//   <aside className="w-64 min-h-screen bg-gray-900 text-white flex flex-col">
//     <div className="p-6 border-b border-gray-700">
//       <h1 className="text-2xl font-black tracking-tight">🔥 Crave</h1>
//       <p className="text-gray-400 text-xs mt-1">Admin Dashboard</p>
//     </div>
//     <nav className="flex-1 p-4 space-y-1">
//       {NAV.map((item) => (
//         <button
//           key={item.id}
//           onClick={() => setActive(item.id)}
//           className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
//             active === item.id
//               ? "bg-orange-500 text-white"
//               : "text-gray-400 hover:bg-gray-800 hover:text-white"
//           }`}
//         >
//           <span className="text-lg">{item.icon}</span>
//           {item.label}
//         </button>
//       ))}
//     </nav>
//     <div className="p-4 border-t border-gray-700">
//       <p className="text-xs text-gray-400 mb-1">Logged in as</p>
//       <p className="text-sm font-semibold text-white truncate">{adminName}</p>
//       <button
//         onClick={onLogout}
//         className="mt-3 w-full text-xs text-gray-400 hover:text-red-400 text-left transition-colors"
//       >
//         → Sign out
//       </button>
//     </div>
//   </aside>
// );

// // ─── Overview Panel ───────────────────────────────────────────────────────────
// const Overview = ({ stats, recentOrders, onViewOrders }) => (
//   <div className="space-y-6">
//     <h2 className="text-2xl font-bold text-gray-800">Good day! Here's your snapshot.</h2>
//     <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//       {[
//         { label: "Orders Today",  value: stats.total_orders_today ?? "—",                         color: "text-orange-500" },
//         { label: "Revenue Today", value: `৳${Number(stats.total_revenue_today || 0).toFixed(0)}`, color: "text-green-600"  },
//         { label: "Pending",       value: stats.orders_by_status?.pending   ?? 0,                  color: "text-yellow-500" },
//         { label: "Preparing",     value: stats.orders_by_status?.preparing ?? 0,                  color: "text-blue-500"   },
//       ].map((s) => (
//         <div key={s.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
//           <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{s.label}</p>
//           <p className={`text-3xl font-black mt-2 ${s.color}`}>{s.value}</p>
//         </div>
//       ))}
//     </div>

//     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
//       <div className="flex items-center justify-between p-5 border-b border-gray-100">
//         <h3 className="font-bold text-gray-800">Recent Orders</h3>
//         <button onClick={onViewOrders} className="text-orange-500 text-sm font-medium hover:underline">
//           View all →
//         </button>
//       </div>
//       <table className="w-full text-sm">
//         <thead className="bg-gray-50">
//           <tr>
//             {["Order ID", "Table", "Amount", "Status", "Time"].map((h) => (
//               <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {(recentOrders || []).map((o) => (
//             <tr key={o.id} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
//               <td className="px-5 py-3 font-mono text-xs text-gray-600">{o.order_id}</td>
//               <td className="px-5 py-3 font-semibold">Table {o.table_number}</td>
//               <td className="px-5 py-3 font-semibold text-gray-800">৳{Number(o.total_amount).toFixed(0)}</td>
//               <td className="px-5 py-3"><StatusBadge status={o.status} /></td>
//               <td className="px-5 py-3 text-gray-400 text-xs">{new Date(o.created_at).toLocaleTimeString()}</td>
//             </tr>
//           ))}
//           {!recentOrders?.length && (
//             <tr><td colSpan={5} className="px-5 py-10 text-center text-gray-400">No orders yet today</td></tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   </div>
// );

// // ─── Orders Panel ─────────────────────────────────────────────────────────────
// const STATUSES = ["all", "pending", "preparing", "ready", "served", "cancelled"];

// const Orders = () => {
//   const axios = useAxios();
//   const [orders,   setOrders]   = useState([]);
//   const [filter,   setFilter]   = useState("all");
//   const [loading,  setLoading]  = useState(true);
//   const [selected, setSelected] = useState(null);
//   const [detail,   setDetail]   = useState(null);

//   const auth = () => ({ headers: { Authorization: `Bearer ${getToken()}` } });

//   const load = useCallback(async () => {
//     setLoading(true);
//     try {
//       const params = filter !== "all" ? { status: filter } : {};
//       const { data } = await axios.get("/api/orders", { ...auth(), params });
//       if (data.success) setOrders(data.data);
//     } catch (err) {
//       console.error("Failed to load orders:", err.message);
//     }
//     setLoading(false);
//   }, [filter, axios]);

//   useEffect(() => { load(); }, [load]);

//   const loadDetail = async (id) => {
//     setSelected(id);
//     try {
//       const { data } = await axios.get(`/api/orders/${id}`, auth());
//       if (data.success) setDetail(data.data);
//     } catch (err) {
//       console.error("Failed to load order detail:", err.message);
//     }
//   };

//   const updateStatus = async (id, status) => {
//     try {
//       await axios.put(`/api/orders/${id}/status`, { status }, auth());
//       await load();
//       if (selected === id) loadDetail(id);
//     } catch (err) {
//       console.error("Failed to update status:", err.message);
//     }
//   };

//   const nextStatus = { pending: "preparing", preparing: "ready", ready: "served" };

//   return (
//     <div className="flex gap-6 h-full">
//       {/* Order list */}
//       <div className="flex-1 space-y-4 min-w-0">
//         <div className="flex items-center justify-between">
//           <h2 className="text-2xl font-bold text-gray-800">Orders</h2>
//           <button onClick={load} className="text-sm text-gray-500 hover:text-orange-500 transition-colors">↻ Refresh</button>
//         </div>

//         <div className="flex gap-2 flex-wrap">
//           {STATUSES.map((s) => (
//             <button
//               key={s}
//               onClick={() => setFilter(s)}
//               className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
//                 filter === s
//                   ? "bg-orange-500 text-white"
//                   : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
//               }`}
//             >
//               {s.charAt(0).toUpperCase() + s.slice(1)}
//             </button>
//           ))}
//         </div>

//         {loading ? (
//           <div className="text-center py-20 text-gray-400">Loading orders…</div>
//         ) : (
//           <div className="space-y-3">
//             {orders.map((o) => (
//               <div
//                 key={o.id}
//                 onClick={() => loadDetail(o.id)}
//                 className={`bg-white rounded-xl p-4 border cursor-pointer transition-all hover:shadow-md ${
//                   selected === o.id ? "border-orange-400 shadow-md" : "border-gray-100"
//                 }`}
//               >
//                 <div className="flex items-start justify-between gap-2">
//                   <div>
//                     <p className="font-bold text-gray-800">Table {o.table_number}</p>
//                     <p className="text-xs text-gray-400 font-mono mt-0.5">{o.order_id}</p>
//                     <p className="text-xs text-gray-500 mt-1">{o.item_count} items · ৳{Number(o.total_amount).toFixed(0)}</p>
//                   </div>
//                   <div className="text-right shrink-0">
//                     <StatusBadge status={o.status} />
//                     <p className="text-xs text-gray-400 mt-1">{new Date(o.created_at).toLocaleTimeString()}</p>
//                   </div>
//                 </div>
//                 {nextStatus[o.status] && (
//                   <button
//                     onClick={(e) => { e.stopPropagation(); updateStatus(o.id, nextStatus[o.status]); }}
//                     className="mt-3 w-full py-2 bg-orange-50 hover:bg-orange-500 hover:text-white text-orange-600 text-sm font-semibold rounded-lg transition-all"
//                   >
//                     Mark as {nextStatus[o.status]} →
//                   </button>
//                 )}
//                 {o.status === "pending" && (
//                   <button
//                     onClick={(e) => { e.stopPropagation(); updateStatus(o.id, "cancelled"); }}
//                     className="mt-1 w-full py-1.5 text-red-400 hover:text-red-600 text-xs font-medium transition-colors"
//                   >
//                     Cancel order
//                   </button>
//                 )}
//               </div>
//             ))}
//             {orders.length === 0 && (
//               <div className="text-center py-20 text-gray-400 bg-white rounded-xl border border-gray-100">
//                 No {filter !== "all" ? filter : ""} orders found
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Order detail panel */}
//       {detail && (
//         <div className="w-80 shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4 self-start sticky top-6">
//           <div className="flex items-center justify-between">
//             <h3 className="font-bold text-gray-800">Order Detail</h3>
//             <button onClick={() => { setSelected(null); setDetail(null); }} className="text-gray-400 hover:text-gray-600">✕</button>
//           </div>
//           <div className="text-xs text-gray-500 space-y-1">
//             <p><span className="font-semibold text-gray-700">Table:</span> {detail.order.table_number}</p>
//             <p><span className="font-semibold text-gray-700">Order ID:</span> {detail.order.order_id}</p>
//             <p><span className="font-semibold text-gray-700">Status:</span> <StatusBadge status={detail.order.status} /></p>
//             {detail.order.customer_note && (
//               <p><span className="font-semibold text-gray-700">Note:</span> {detail.order.customer_note}</p>
//             )}
//           </div>
//           <div>
//             <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Items</p>
//             <div className="space-y-2">
//               {detail.items.map((item) => (
//                 <div key={item.id} className="flex justify-between text-sm">
//                   <span className="text-gray-700">{item.item_name} <span className="text-gray-400">×{item.quantity}</span></span>
//                   <span className="font-semibold text-gray-800">৳{Number(item.subtotal).toFixed(0)}</span>
//                 </div>
//               ))}
//             </div>
//             <div className="border-t border-gray-100 mt-3 pt-3 flex justify-between font-bold">
//               <span>Total</span>
//               <span>৳{Number(detail.order.total_amount).toFixed(0)}</span>
//             </div>
//           </div>
//           <div>
//             <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Timeline</p>
//             <div className="space-y-2">
//               {detail.tracking.map((t) => (
//                 <div key={t.id} className="flex gap-2 text-xs">
//                   <span className="text-gray-400 shrink-0">{new Date(t.timestamp).toLocaleTimeString()}</span>
//                   <span className="text-gray-600">{t.message}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // ─── Menu Management Panel ────────────────────────────────────────────────────
// const MenuManagement = () => {
//   const axios = useAxios();
//   const [items,      setItems]      = useState([]);
//   const [loading,    setLoading]    = useState(true);
//   const [editId,     setEditId]     = useState(null);
//   const [editPrice,  setEditPrice]  = useState("");
//   const [saving,     setSaving]     = useState(false);
//   const [filterCat,  setFilterCat]  = useState("all");
//   const [categories, setCategories] = useState([]);

//   const auth = () => ({ headers: { Authorization: `Bearer ${getToken()}` } });

//   const load = async () => {
//     setLoading(true);
//     try {
//       const [menuRes, catRes] = await Promise.all([
//         axios.get("/api/menu"),
//         axios.get("/api/categories"),
//       ]);
//       if (menuRes.data.success) setItems(menuRes.data.data);
//       if (catRes.data.success)  setCategories(catRes.data.data);
//     } catch (err) {
//       console.error("Failed to load menu:", err.message);
//     }
//     setLoading(false);
//   };

//   useEffect(() => { load(); }, []);

//   const toggleAvailable = async (item) => {
//     try {
//       await axios.put(`/api/admin/menu/${item.id}`, { is_available: !item.is_available }, auth());
//       load();
//     } catch (err) {
//       console.error("Failed to toggle availability:", err.message);
//     }
//   };

//   const savePrice = async (id) => {
//     if (!editPrice || isNaN(editPrice)) return;
//     setSaving(true);
//     try {
//       await axios.put(`/api/admin/menu/${id}`, { price_bdt: parseFloat(editPrice) }, auth());
//       setEditId(null);
//     } catch (err) {
//       console.error("Failed to save price:", err.message);
//     }
//     setSaving(false);
//     load();
//   };

//   const filtered = filterCat === "all"
//     ? items
//     : items.filter((i) => String(i.category_id) === String(filterCat));

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between">
//         <h2 className="text-2xl font-bold text-gray-800">Menu Management</h2>
//         <span className="text-sm text-gray-500">{filtered.length} items</span>
//       </div>

//       <div className="flex gap-2 flex-wrap">
//         <button
//           onClick={() => setFilterCat("all")}
//           className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
//             filterCat === "all" ? "bg-orange-500 text-white" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
//           }`}
//         >
//           All
//         </button>
//         {categories.map((c) => (
//           <button
//             key={c.id}
//             onClick={() => setFilterCat(String(c.id))}
//             className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
//               filterCat === String(c.id) ? "bg-orange-500 text-white" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
//             }`}
//           >
//             {c.category_name}
//           </button>
//         ))}
//       </div>

//       {loading ? (
//         <div className="text-center py-20 text-gray-400">Loading menu…</div>
//       ) : (
//         <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
//           <table className="w-full text-sm">
//             <thead className="bg-gray-50">
//               <tr>
//                 {["Item", "Category", "Price (৳)", "Available", "Actions"].map((h) => (
//                   <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {filtered.map((item) => (
//                 <tr key={item.id} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
//                   <td className="px-5 py-3">
//                     <p className="font-semibold text-gray-800">{item.item_name}</p>
//                     {item.is_unique && (
//                       <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">Unique</span>
//                     )}
//                   </td>
//                   <td className="px-5 py-3 text-gray-500">{item.category_name}</td>
//                   <td className="px-5 py-3">
//                     {editId === item.id ? (
//                       <div className="flex items-center gap-2">
//                         <input
//                           type="number"
//                           value={editPrice}
//                           onChange={(e) => setEditPrice(e.target.value)}
//                           className="w-24 border border-orange-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
//                           autoFocus
//                         />
//                         <button
//                           onClick={() => savePrice(item.id)}
//                           disabled={saving}
//                           className="text-xs bg-orange-500 text-white px-3 py-1 rounded-lg hover:bg-orange-600 transition-colors"
//                         >
//                           Save
//                         </button>
//                         <button onClick={() => setEditId(null)} className="text-xs text-gray-400 hover:text-gray-600">✕</button>
//                       </div>
//                     ) : (
//                       <span className="font-bold text-gray-800">৳{Number(item.price_bdt).toFixed(0)}</span>
//                     )}
//                   </td>
//                   <td className="px-5 py-3">
//                     <button
//                       onClick={() => toggleAvailable(item)}
//                       className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
//                         item.is_available !== false ? "bg-green-400" : "bg-gray-200"
//                       }`}
//                     >
//                       <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
//                         item.is_available !== false ? "translate-x-6" : "translate-x-1"
//                       }`} />
//                     </button>
//                   </td>
//                   <td className="px-5 py-3">
//                     <button
//                       onClick={() => { setEditId(item.id); setEditPrice(Number(item.price_bdt).toFixed(0)); }}
//                       className="text-xs text-orange-500 hover:text-orange-700 font-medium"
//                     >
//                       Edit Price
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// // ─── Staff Panel ──────────────────────────────────────────────────────────────
// const Staff = () => {
//   const axios = useAxios();
//   const [staff,      setStaff]      = useState([]);
//   const [loading,    setLoading]    = useState(true);
//   const [showForm,   setShowForm]   = useState(false);
//   const [form,       setForm]       = useState({ name: "", email: "", password: "", role: "waiter" });
//   const [submitting, setSubmitting] = useState(false);
//   const [error,      setError]      = useState("");

//   const auth = () => ({ headers: { Authorization: `Bearer ${getToken()}` } });

//   const load = async () => {
//     setLoading(true);
//     try {
//       const { data } = await axios.get("/api/admin/staff", auth());
//       if (data.success) setStaff(data.data);
//     } catch (err) {
//       console.error("Failed to load staff:", err.message);
//     }
//     setLoading(false);
//   };

//   useEffect(() => { load(); }, []);

//   const addStaff = async () => {
//     if (!form.name || !form.email || !form.password) { setError("All fields required"); return; }
//     setSubmitting(true); setError("");
//     try {
//       const { data } = await axios.post("/api/admin/staff", form, auth());
//       if (data.success) {
//         setShowForm(false);
//         setForm({ name: "", email: "", password: "", role: "waiter" });
//         load();
//       } else {
//         setError(data.message);
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to add staff");
//     }
//     setSubmitting(false);
//   };

//   const toggle = async (id) => {
//     try {
//       await axios.put(`/api/admin/staff/${id}/toggle`, {}, auth());
//       load();
//     } catch (err) {
//       console.error("Failed to toggle staff:", err.message);
//     }
//   };

//   // ✅ axios.delete with auth — pass config as second argument
//   const remove = async (id) => {
//     if (!confirm("Remove this staff member?")) return;
//     try {
//       await axios.delete(`/api/admin/staff/${id}`, auth());
//       load();
//     } catch (err) {
//       console.error("Failed to remove staff:", err.message);
//     }
//   };

//   const ROLE_COLORS = {
//     admin:  "bg-red-100 text-red-700",
//     chef:   "bg-blue-100 text-blue-700",
//     waiter: "bg-green-100 text-green-700",
//   };

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between">
//         <h2 className="text-2xl font-bold text-gray-800">Staff Management</h2>
//         <button
//           onClick={() => setShowForm(!showForm)}
//           className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
//         >
//           + Add Staff
//         </button>
//       </div>

//       {showForm && (
//         <div className="bg-white rounded-2xl border border-orange-200 p-6 space-y-4">
//           <h3 className="font-bold text-gray-800">Add New Staff Member</h3>
//           {error && <p className="text-red-500 text-sm">{error}</p>}
//           <div className="grid grid-cols-2 gap-4">
//             {[
//               { label: "Full Name", key: "name",     type: "text",     placeholder: "John Doe"       },
//               { label: "Email",     key: "email",    type: "email",    placeholder: "john@crave.com"  },
//               { label: "Password",  key: "password", type: "password", placeholder: "••••••••"        },
//             ].map(({ label, key, type, placeholder }) => (
//               <div key={key}>
//                 <label className="text-xs font-semibold text-gray-500 block mb-1">{label}</label>
//                 <input
//                   type={type}
//                   value={form[key]}
//                   onChange={(e) => setForm({ ...form, [key]: e.target.value })}
//                   className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
//                   placeholder={placeholder}
//                 />
//               </div>
//             ))}
//             <div>
//               <label className="text-xs font-semibold text-gray-500 block mb-1">Role</label>
//               <select
//                 value={form.role}
//                 onChange={(e) => setForm({ ...form, role: e.target.value })}
//                 className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
//               >
//                 <option value="waiter">Waiter</option>
//                 <option value="chef">Chef</option>
//                 <option value="admin">Admin</option>
//               </select>
//             </div>
//           </div>
//           <div className="flex gap-3">
//             <button
//               onClick={addStaff}
//               disabled={submitting}
//               className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-6 py-2 rounded-xl transition-colors disabled:opacity-50"
//             >
//               {submitting ? "Adding…" : "Add Staff Member"}
//             </button>
//             <button onClick={() => { setShowForm(false); setError(""); }} className="text-sm text-gray-500 hover:text-gray-700">
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       {loading ? (
//         <div className="text-center py-20 text-gray-400">Loading staff…</div>
//       ) : (
//         <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
//           <table className="w-full text-sm">
//             <thead className="bg-gray-50">
//               <tr>
//                 {["Name", "Email", "Role", "Status", "Actions"].map((h) => (
//                   <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {staff.map((s) => (
//                 <tr key={s.id} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
//                   <td className="px-5 py-3 font-semibold text-gray-800">{s.name}</td>
//                   <td className="px-5 py-3 text-gray-500">{s.email}</td>
//                   <td className="px-5 py-3">
//                     <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${ROLE_COLORS[s.role]}`}>
//                       {s.role.charAt(0).toUpperCase() + s.role.slice(1)}
//                     </span>
//                   </td>
//                   <td className="px-5 py-3">
//                     <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
//                       s.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
//                     }`}>
//                       {s.is_active ? "Active" : "Inactive"}
//                     </span>
//                   </td>
//                   <td className="px-5 py-3">
//                     <div className="flex gap-3">
//                       <button onClick={() => toggle(s.id)} className="text-xs text-blue-500 hover:text-blue-700 font-medium">
//                         {s.is_active ? "Deactivate" : "Activate"}
//                       </button>
//                       <button onClick={() => remove(s.id)} className="text-xs text-red-400 hover:text-red-600 font-medium">
//                         Remove
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//               {staff.length === 0 && (
//                 <tr><td colSpan={5} className="px-5 py-10 text-center text-gray-400">No staff members yet</td></tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// // ─── Reservations Panel ───────────────────────────────────────────────────────
// const ReservationsPanel = () => {
//   const axios = useAxios();
//   const [reservations, setReservations] = useState([]);
//   const [loading,      setLoading]      = useState(true);
//   const [filter,       setFilter]       = useState("all");

//   const auth = () => ({ headers: { Authorization: `Bearer ${getToken()}` } });

//   const load = useCallback(async () => {
//     setLoading(true);
//     try {
//       const params = filter !== "all" ? { status: filter } : {};
//       const { data } = await axios.get("/api/reservations", { ...auth(), params });
//       if (data.success) setReservations(data.data);
//     } catch (err) {
//       console.error("Failed to load reservations:", err.message);
//     }
//     setLoading(false);
//   }, [filter, axios]);

//   useEffect(() => { load(); }, [load]);

//   return (
//     <div className="space-y-4">
//       <h2 className="text-2xl font-bold text-gray-800">Reservations</h2>
//       <div className="flex gap-2">
//         {["all", "pending", "confirmed", "cancelled"].map((s) => (
//           <button
//             key={s}
//             onClick={() => setFilter(s)}
//             className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
//               filter === s ? "bg-orange-500 text-white" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
//             }`}
//           >
//             {s.charAt(0).toUpperCase() + s.slice(1)}
//           </button>
//         ))}
//       </div>
//       {loading ? (
//         <div className="text-center py-20 text-gray-400">Loading…</div>
//       ) : (
//         <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
//           <table className="w-full text-sm">
//             <thead className="bg-gray-50">
//               <tr>
//                 {["Name", "Phone", "Guests", "Date", "Time", "Status"].map((h) => (
//                   <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {reservations.map((r) => (
//                 <tr key={r.id} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
//                   <td className="px-5 py-3 font-semibold text-gray-800">{r.customer_name}</td>
//                   <td className="px-5 py-3 text-gray-500">{r.customer_phone}</td>
//                   <td className="px-5 py-3 text-center font-semibold">{r.number_of_guests}</td>
//                   <td className="px-5 py-3 text-gray-600">{new Date(r.reservation_date).toLocaleDateString()}</td>
//                   <td className="px-5 py-3 text-gray-600">{r.reservation_time}</td>
//                   <td className="px-5 py-3"><StatusBadge status={r.status} /></td>
//                 </tr>
//               ))}
//               {reservations.length === 0 && (
//                 <tr><td colSpan={6} className="px-5 py-10 text-center text-gray-400">No reservations found</td></tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// // ─── Main Dashboard ───────────────────────────────────────────────────────────
// const AdminDashboard = () => {
//   const navigate = useNavigate();
//   const axios    = useAxios();
//   const [active,       setActive]       = useState("overview");
//   const [stats,        setStats]        = useState({});
//   const [recentOrders, setRecentOrders] = useState([]);

//   const auth = () => ({ headers: { Authorization: `Bearer ${getToken()}` } });

//   const staffInfo = (() => {
//     try {
//       const token = getToken();
//       if (!token) return null;
//       return JSON.parse(atob(token.split(".")[1]));
//     } catch { return null; }
//   })();

//   useEffect(() => {
//     if (!getToken()) { navigate("/admin/login"); return; }
//     if (staffInfo?.role !== "admin") { navigate("/staff/orders"); return; }

//     axios.get("/api/admin/dashboard", auth())
//       .then(({ data }) => {
//         if (data.success) {
//           setStats(data.data);
//           setRecentOrders(data.data.recent_orders || []);
//         }
//       })
//       .catch((err) => console.error("Dashboard load error:", err.message));
//   }, [navigate, axios, staffInfo]);

//   const logout = () => {
//     localStorage.removeItem("staffToken");
//     localStorage.removeItem("staffRole");
//     localStorage.removeItem("staffName");
//     navigate("/admin/login");
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <Sidebar
//         active={active}
//         setActive={setActive}
//         adminName={staffInfo?.name || "Admin"}
//         onLogout={logout}
//       />
//       <main className="flex-1 p-8 overflow-auto">
//         {active === "overview"     && <Overview stats={stats} recentOrders={recentOrders} onViewOrders={() => setActive("orders")} />}
//         {active === "orders"       && <Orders />}
//         {active === "menu"         && <MenuManagement />}
//         {active === "staff"        && <Staff />}
//         {active === "reservations" && <ReservationsPanel />}
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;
