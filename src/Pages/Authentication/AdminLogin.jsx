import { useState } from "react";
import { useNavigate } from "react-router";
import useAxios from "../../Hooks/useAxios";

const AdminLogin = () => {
  const navigate = useNavigate();
  const axios = useAxios();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
     const { data } = await axios.post("/api/staff/login", { email, password });

      if (data.success) {
        localStorage.setItem("staffToken", data.token);
        localStorage.setItem("staffRole",  data.staff.role);
        localStorage.setItem("staffName",  data.staff.name);
        if (data.staff.role === "admin") navigate("/admin/dashboard");
        else if (data.staff.role === "chef") navigate("/staff/chef");
        else if (data.staff.role === "waiter") navigate("/staff/waiter");
        else navigate("/");
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Cannot connect to server. Make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-white">🔥 Crave</h1>
          <p className="text-gray-400 mt-2">Staff Portal — Sign in to continue</p>
        </div>
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Sign In</h2>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-5">
              {error}
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition"
                placeholder="you@crave.com"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-50 mt-2"
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>
          <p className="text-center text-xs text-gray-400 mt-6">
            Admin  access only
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;





