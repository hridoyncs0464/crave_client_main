// ─────────────────────────────────────────────────────────────────────────────
// ReservationBell.jsx  — drop this component into your Navbar
//
// Usage in Navbar:
//   import ReservationBell from "../components/ReservationBell";
//   <ReservationBell />   ← place it in the nav, visible only when logged in
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import useAxios from "../Hooks/useAxios";

const ReservationBell = () => {
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [hasUpdates, setHasUpdates] = useState(false);
  const [count, setCount] = useState(0);
  const lastStatusesRef = useRef({});
  const initializedRef = useRef(false);

  useEffect(() => {
    const auth = getAuth();
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!user?.email) return;
    checkForUpdates();
    const interval = setInterval(checkForUpdates, 30000);
    return () => clearInterval(interval);
  }, [user]);

  const checkForUpdates = async () => {
    if (!user?.email) return;
    try {
      const response = await axiosInstance.get("/api/my-reservations", {
        params: { email: user.email },
      });
      if (!response.data.success) return;

      const incoming = response.data.data;

      // On first load, seed from sessionStorage so we don't false-positive
      if (!initializedRef.current) {
        initializedRef.current = true;
        try {
          const stored = JSON.parse(sessionStorage.getItem("crave_res_statuses") || "{}");
          if (Object.keys(stored).length > 0) {
            lastStatusesRef.current = stored;
          } else {
            // First ever load — just seed, no notifications
            incoming.forEach((r) => { lastStatusesRef.current[r.id] = r.status; });
            return;
          }
        } catch (_) {
          incoming.forEach((r) => { lastStatusesRef.current[r.id] = r.status; });
          return;
        }
      }

      let changed = 0;
      incoming.forEach((r) => {
        const prev = lastStatusesRef.current[r.id];
        if (prev && prev !== r.status) changed++;
      });

      if (changed > 0) {
        setHasUpdates(true);
        setCount(changed);
      }
    } catch (_) {}
  };

  const handleClick = () => {
    setHasUpdates(false);
    setCount(0);
    navigate("/my-reservations");
  };

  if (!user) return null;

  return (
    <button
      onClick={handleClick}
      className="relative p-2 text-gray-600 hover:text-orange-500 transition-colors"
      title="My Reservations"
    >
      {/* Bell icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
        />
      </svg>

      {/* Notification dot */}
      {hasUpdates && (
        <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500 text-white text-[8px] font-bold items-center justify-center">
            {count > 9 ? "9+" : count}
          </span>
        </span>
      )}
    </button>
  );
};

export default ReservationBell;