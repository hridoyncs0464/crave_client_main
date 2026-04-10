import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import { FiEye, FiEyeOff } from "react-icons/fi";
import useAxios from "../../hooks/useAxios";

const AdminLogin = () => {
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // TEMPORARY: Mock admin login for testing (remove when backend is ready)
    if (email === "admin@crave.com" && password === "admin123") {
      // Mock successful login
      localStorage.setItem("adminToken", "mock-token-12345");
      localStorage.setItem("adminName", "Admin User");
      localStorage.setItem("adminEmail", "admin@crave.com");
      
      console.log("✅ Admin logged in successfully (MOCK MODE)");
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 500);
      return;
    }

    try {
      const response = await axiosInstance.post("/api/admin/login", {
        email,
        password
      });

      if (response.data.success) {
        // Store token in localStorage
        localStorage.setItem("adminToken", response.data.token);
        localStorage.setItem("adminName", response.data.admin.name);
        localStorage.setItem("adminEmail", response.data.admin.email);

        console.log("✅ Admin logged in successfully");
        navigate("/admin/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 via-base-100 to-base-200 px-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="card bg-base-100/80 backdrop-blur-sm shadow-2xl border border-base-300/50">
          <div className="card-body p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">👨‍💼</div>
              <h1 className="text-3xl font-bold text-primary">Admin Login</h1>
              <p className="text-base-content/60 mt-2">
                Manage orders and restaurant operations
              </p>
              
              {/* Mock Mode Warning */}
              <div className="alert alert-warning shadow-lg mt-4 text-xs">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>Mock mode active - Backend not connected</span>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="alert alert-error shadow-lg mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current flex-shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Email Address</span>
                </label>
                <input
                  type="email"
                  className="input input-bordered w-full focus:input-primary"
                  placeholder="admin@crave.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>

              {/* Password Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="input input-bordered w-full pr-10 focus:input-primary"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <FiEyeOff className="text-base-content/40 hover:text-primary transition-colors" />
                    ) : (
                      <FiEye className="text-base-content/40 hover:text-primary transition-colors" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary w-full font-semibold mt-6"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Logging in...
                  </>
                ) : (
                  "Login to Dashboard"
                )}
              </button>
            </form>

            {/* Footer Note */}
            <div className="text-center mt-6 pt-6 border-t border-base-300">
              <p className="text-sm text-base-content/60 mb-3">
                Contact your manager for admin credentials
              </p>
              <Link
                to="/login"
                className="text-xs text-base-content/50 hover:text-primary transition-colors"
              >
                ← Back to User Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;