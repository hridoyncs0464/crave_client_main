// src/Hooks/useStaffAuth.js
// Manages JWT-based staff sessions (chef, waiter) stored in localStorage

const useStaffAuth = () => {
  const getStaffToken = () => localStorage.getItem("staffToken");
  const getStaffRole = () => localStorage.getItem("staffRole");
  const getStaffName = () => localStorage.getItem("staffName");
  const getStaffEmail = () => localStorage.getItem("staffEmail");

  const isStaffLoggedIn = () => {
    const token = getStaffToken();
    if (!token) return false;
    try {
      // Decode JWT payload (no verify — just check expiry client-side)
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.exp * 1000 < Date.now()) {
        logoutStaff();
        return false;
      }
      return true;
    } catch {
      logoutStaff();
      return false;
    }
  };

  const getStaffInfo = () => {
    if (!isStaffLoggedIn()) return null;
    return {
      token: getStaffToken(),
      role: getStaffRole(),
      name: getStaffName(),
      email: getStaffEmail(),
    };
  };

  const logoutStaff = () => {
    localStorage.removeItem("staffToken");
    localStorage.removeItem("staffRole");
    localStorage.removeItem("staffName");
    localStorage.removeItem("staffEmail");
  };

  return {
    isStaffLoggedIn,
    getStaffInfo,
    getStaffToken,
    getStaffRole,
    getStaffName,
    logoutStaff,
  };
};

export default useStaffAuth;