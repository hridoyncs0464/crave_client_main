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
            Admin · Chef · Waiter access only
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;







// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router";
// import { FiEye, FiEyeOff } from "react-icons/fi";
// import useAxios from "../../hooks/useAxios";

// const AdminLogin = () => {
//   const navigate = useNavigate();
//   const axiosInstance = useAxios();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

    

//     try {
//       const response = await axiosInstance.post("/api/admin/login", {
//         email,
//         password
//       });

//       if (response.data.success) {
//         // Store token in localStorage
//         localStorage.setItem("adminToken", response.data.token);
//         localStorage.setItem("adminName", response.data.admin.name);
//         localStorage.setItem("adminEmail", response.data.admin.email);

//         console.log("✅ Admin logged in successfully");
//         navigate("/admin/dashboard");
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed. Please try again.");
//       console.error("Login error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 via-base-100 to-base-200 px-4">
//       {/* Background decorative elements */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
//       </div>

//       <div className="relative z-10 w-full max-w-md">
//         <div className="card bg-base-100/80 backdrop-blur-sm shadow-2xl border border-base-300/50">
//           <div className="card-body p-8">
//             {/* Header */}
//             <div className="text-center mb-8">
//               <div className="text-5xl mb-4">👨‍💼</div>
//               <h1 className="text-3xl font-bold text-primary">Admin Login</h1>
//               <p className="text-base-content/60 mt-2">
//                 Manage orders and restaurant operations
//               </p>
              
            
//             </div>

//             {/* Error Message */}
//             {error && (
//               <div className="alert alert-error shadow-lg mb-4">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="stroke-current flex-shrink-0 h-6 w-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
//                   />
//                 </svg>
//                 <span>{error}</span>
//               </div>
//             )}

//             {/* Form */}
//             <form onSubmit={handleLogin} className="space-y-4">
//               {/* Email Field */}
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text font-medium">Email Address</span>
//                 </label>
//                 <input
//                   type="email"
//                   className="input input-bordered w-full focus:input-primary"
//                   placeholder="admin@crave.com"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   disabled={loading}
//                   required
//                 />
//               </div>

//               {/* Password Field */}
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text font-medium">Password</span>
//                 </label>
//                 <div className="relative">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     className="input input-bordered w-full pr-10 focus:input-primary"
//                     placeholder="Enter your password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     disabled={loading}
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                   >
//                     {showPassword ? (
//                       <FiEyeOff className="text-base-content/40 hover:text-primary transition-colors" />
//                     ) : (
//                       <FiEye className="text-base-content/40 hover:text-primary transition-colors" />
//                     )}
//                   </button>
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 className="btn btn-primary w-full font-semibold mt-6"
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <>
//                     <span className="loading loading-spinner loading-sm"></span>
//                     Logging in...
//                   </>
//                 ) : (
//                   "Login to Dashboard"
//                 )}
//               </button>
//             </form>

//             {/* Footer Note */}
//             <div className="text-center mt-6 pt-6 border-t border-base-300">
//               <p className="text-sm text-base-content/60 mb-3">
//                 Contact your manager for admin credentials
//               </p>
//               <Link
//                 to="/login"
//                 className="text-xs text-base-content/50 hover:text-primary transition-colors"
//               >
//                 ← Back to User Login
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;