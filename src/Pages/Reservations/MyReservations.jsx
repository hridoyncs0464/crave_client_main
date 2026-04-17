import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import useAxios from "../../Hooks/useAxios";

const STATUS_CONFIG = {
  pending: {
    label: "Pending Review",
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-700",
    dot: "bg-amber-400",
    icon: "⏳",
    desc: "Your reservation is awaiting admin approval.",
  },
  confirmed: {
    label: "Confirmed",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-700",
    dot: "bg-emerald-400",
    icon: "✅",
    desc: "Your table is reserved! Please arrive 10 minutes early.",
  },
  cancelled: {
    label: "Cancelled",
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-600",
    dot: "bg-red-400",
    icon: "❌",
    desc: "This reservation was cancelled. You may book again.",
  },
};

const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatTime = (timeStr) => {
  if (!timeStr) return "";
  const [h, m] = timeStr.split(":");
  const hour = parseInt(h);
  const ampm = hour >= 12 ? "PM" : "AM";
  const display = hour % 12 || 12;
  return `${display}:${m} ${ampm}`;
};

const ReservationCard = ({ reservation, isNew }) => {
  const cfg = STATUS_CONFIG[reservation.status] || STATUS_CONFIG.pending;

  return (
    <div
      className={`relative rounded-2xl border-2 p-6 transition-all duration-500 ${cfg.bg} ${cfg.border} ${
        isNew ? "ring-2 ring-orange-400 ring-offset-2 animate-pulse-once" : ""
      }`}
    >
      {isNew && (
        <span className="absolute -top-3 -right-2 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
          NEW UPDATE
        </span>
      )}

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        {/* Left info */}
        <div className="space-y-3 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{cfg.icon}</span>
            <div>
              <p className="font-bold text-gray-800 text-lg leading-tight">
                {formatDate(reservation.reservation_date)}
              </p>
              <p className="text-gray-500 text-sm">{formatTime(reservation.reservation_time)}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1.5">
              <span className="text-base">👥</span>
              <span className="font-medium">{reservation.number_of_guests} guests</span>
            </span>
            {reservation.assigned_table_number && (
              <span className="flex items-center gap-1.5">
                <span className="text-base">🪑</span>
                <span className="font-medium">Table {reservation.assigned_table_number}</span>
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <span className="text-base">📋</span>
              <span className="font-mono text-xs text-gray-400">#{reservation.id}</span>
            </span>
          </div>

          {reservation.special_requests && (
            <p className="text-xs text-gray-500 bg-white/70 px-3 py-2 rounded-lg border border-gray-100">
              <span className="font-semibold text-gray-600">Note: </span>
              {reservation.special_requests}
            </p>
          )}
        </div>

        {/* Right status */}
        <div className="flex flex-col items-end gap-2 shrink-0">
          <span
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border ${cfg.bg} ${cfg.text} ${cfg.border}`}
          >
            <span className={`w-2 h-2 rounded-full ${cfg.dot}`}></span>
            {cfg.label}
          </span>
          <p className={`text-xs ${cfg.text} text-right max-w-[180px] leading-snug`}>{cfg.desc}</p>
        </div>
      </div>
    </div>
  );
};

const EmptyState = ({ navigate }) => (
  <div className="text-center py-20 space-y-4">
    <div className="text-6xl">🍽️</div>
    <h3 className="text-xl font-bold text-gray-700">No reservations yet</h3>
    <p className="text-gray-400 text-sm max-w-xs mx-auto">
      Book a table at Crave and your reservation will appear here.
    </p>
    <button
      onClick={() => navigate("/reservations")}
      className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors"
    >
      Book a Table →
    </button>
  </div>
);

const MyReservations = () => {
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newIds, setNewIds] = useState(new Set());
  const [lastSeenStatuses, setLastSeenStatuses] = useState({});

  // Watch Firebase auth state
  useEffect(() => {
    const auth = getAuth();
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        navigate("/login");
      }
    });
    return () => unsub();
  }, [navigate]);

  // Load reservations once user is known
  useEffect(() => {
    if (!user?.email) return;
    fetchReservations();
  }, [user]);

  // Poll every 30 seconds for status updates
  useEffect(() => {
    if (!user?.email) return;
    const interval = setInterval(fetchReservations, 30000);
    return () => clearInterval(interval);
  }, [user, lastSeenStatuses]);

  const fetchReservations = async () => {
    try {
      const response = await axiosInstance.get("/api/my-reservations", {
        params: { email: user.email },
      });

      if (response.data.success) {
        const incoming = response.data.data;

        // Detect status changes since last fetch
        const changed = new Set();
        incoming.forEach((r) => {
          const prev = lastSeenStatuses[r.id];
          if (prev && prev !== r.status) {
            changed.add(r.id);
          }
        });

        // Build new seen map
        const newSeen = {};
        incoming.forEach((r) => { newSeen[r.id] = r.status; });

        // First load: read stored seen statuses from sessionStorage
        if (Object.keys(lastSeenStatuses).length === 0) {
          try {
            const stored = JSON.parse(sessionStorage.getItem("crave_res_statuses") || "{}");
            incoming.forEach((r) => {
              if (stored[r.id] && stored[r.id] !== r.status) {
                changed.add(r.id);
              }
            });
          } catch (_) {}
        }

        setNewIds(changed);
        setLastSeenStatuses(newSeen);
        sessionStorage.setItem("crave_res_statuses", JSON.stringify(newSeen));
        setReservations(incoming);
      }
    } catch (err) {
      console.error("Failed to fetch reservations:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const dismissNotification = (id) => {
    setNewIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const pending = reservations.filter((r) => r.status === "pending");
  const confirmed = reservations.filter((r) => r.status === "confirmed");
  const cancelled = reservations.filter((r) => r.status === "cancelled");

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900">
              My <span className="text-orange-500">Reservations</span>
            </h1>
            <p className="text-gray-400 text-sm mt-1">{user.email}</p>
          </div>
          <button
            onClick={() => navigate("/reservations")}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-4 py-2 rounded-xl transition-colors"
          >
            + New Reservation
          </button>
        </div>

        {/* Notification banner */}
        {newIds.size > 0 && (
          <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-4 flex items-start gap-3">
            <span className="text-2xl shrink-0">🔔</span>
            <div className="flex-1">
              <p className="font-bold text-orange-800 text-sm">
                {newIds.size} reservation{newIds.size > 1 ? "s" : ""} updated!
              </p>
              <p className="text-orange-600 text-xs mt-0.5">
                The restaurant has responded to your booking request.
              </p>
            </div>
            <button
              onClick={() => setNewIds(new Set())}
              className="text-orange-400 hover:text-orange-600 text-xs font-medium"
            >
              Dismiss
            </button>
          </div>
        )}

        {loading ? (
          <div className="text-center py-24">
            <div className="inline-block w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-400 text-sm mt-3">Loading your reservations…</p>
          </div>
        ) : reservations.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <EmptyState navigate={navigate} />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Confirmed section */}
            {confirmed.length > 0 && (
              <section>
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 px-1">
                  Confirmed ({confirmed.length})
                </h2>
                <div className="space-y-3">
                  {confirmed.map((r) => (
                    <div key={r.id} onClick={() => dismissNotification(r.id)}>
                      <ReservationCard reservation={r} isNew={newIds.has(r.id)} />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Pending section */}
            {pending.length > 0 && (
              <section>
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 px-1">
                  Awaiting Approval ({pending.length})
                </h2>
                <div className="space-y-3">
                  {pending.map((r) => (
                    <div key={r.id} onClick={() => dismissNotification(r.id)}>
                      <ReservationCard reservation={r} isNew={newIds.has(r.id)} />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Cancelled section */}
            {cancelled.length > 0 && (
              <section>
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 px-1">
                  Cancelled ({cancelled.length})
                </h2>
                <div className="space-y-3">
                  {cancelled.map((r) => (
                    <div key={r.id} onClick={() => dismissNotification(r.id)}>
                      <ReservationCard reservation={r} isNew={newIds.has(r.id)} />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        {/* Footer info */}
        {reservations.length > 0 && (
          <p className="text-center text-xs text-gray-300 pb-4">
            Page refreshes every 30 seconds · {reservations.length} total reservation{reservations.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>
    </div>
  );
};

export default MyReservations;