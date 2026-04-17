import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";
import useAuth from "../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import useAxios from "../../Hooks/useAxios";
230
const Login = () => {
  const { loginUser, signInWithGoogle } = useAuth(); // Added signInWithGoogle
  const navigate = useNavigate();
    const axiosInstance = useAxios();

  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (data) => {
  setIsLoading(true);
  setErrorMessage("");

  // First try staff/MySQL login
  try {
    const response = await axiosInstance.post("/api/staff/login", {
      email: data.email,
      password: data.password,
    });
    if (response.data.success) {
      localStorage.setItem("staffToken", response.data.token);
      localStorage.setItem("staffRole", response.data.staff.role);
      localStorage.setItem("staffName", response.data.staff.name);
      // Redirect based on role
      if (response.data.staff.role === "chef") navigate("/staff/orders");
      else if (response.data.staff.role === "waiter") navigate("/staff/orders");
      return;
    }
  } catch {
    // Not a staff member, try Firebase
  }

  // Then try Firebase login (for regular customers)
  loginUser(data.email, data.password)
    .then((result) => {
      navigate("/");
    })
    .catch((error) => {
      setErrorMessage("Invalid email or password.");
      setIsLoading(false);
    });
};

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    setErrorMessage("");
    
    signInWithGoogle()
      .then((result) => {
        navigate("/");
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error.message);
        setErrorMessage(error.message);
        setIsLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 via-base-100 to-base-200 px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl flex flex-col lg:flex-row gap-8 items-center">
        {/* Left Side - Brand Section */}
        <div className="flex-1 text-center lg:text-left mb-8 lg:mb-0">
          <div className="inline-flex items-center gap-3 bg-primary/10 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20 mb-6">
            <span className="text-primary font-semibold">Crave Restaurant</span>
          </div>

          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-4">
            Welcome Back to
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent block">
              Crave
            </span>
          </h1>

          <p className="text-base-content/70 text-lg mb-8 max-w-md mx-auto lg:mx-0">
            Experience exceptional dining with carefully crafted dishes made
            from the finest ingredients.
          </p>
        </div>

        {/* Right Side - Login Card */}
        <div className="flex-1 w-full max-w-md">
          <div className="card bg-base-100/80 backdrop-blur-sm shadow-2xl border border-base-300/50 hover:shadow-primary/5 transition-all duration-300">
            <div className="card-body p-6 md:p-8">
              {/* Header */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold">Sign In</h2>
                <p className="text-base-content/60 text-sm mt-2">
                  Enter your credentials to access your account
                </p>
              </div>

              {/* Error Message Display */}
              {errorMessage && (
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
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
                {/* Email Field */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">
                      Email Address
                    </span>
                  </label>
                  <div className="relative group">
                    <input
                      type="email"
                      className={`input input-bordered w-full pl-10 focus:input-primary transition-all duration-200 ${
                        errors.email ? "input-error" : ""
                      }`}
                      placeholder="you@example.com"
                      {...register("email", { 
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address"
                        }
                      })}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-error text-xs mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* Password Field */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Password</span>
                  </label>
                  <div className="relative group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className={`input input-bordered w-full pl-10 pr-10 focus:input-primary transition-all duration-200 ${
                        errors.password ? "input-error" : ""
                      }`}
                      placeholder="Enter your password"
                      {...register("password", { 
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters"
                        }
                      })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <FiEyeOff className="text-base-content/40 hover:text-primary transition-colors text-lg" />
                      ) : (
                        <FiEye className="text-base-content/40 hover:text-primary transition-colors text-lg" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-error text-xs mt-1">{errors.password.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-primary w-full font-semibold gap-2 group mt-6"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Signing In...
                    </>
                  ) : (
                    <>
                      Sign In
                      <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="divider text-xs text-base-content/40 my-6">
                OR CONTINUE WITH
              </div>

              {/* Social Login Buttons - Google */}
              <button 
                onClick={handleGoogleSignIn}
                className="btn bg-white text-black border-[#e5e5e5] hover:bg-gray-50 w-full gap-2"
                disabled={isLoading}
              >
                <svg
                  aria-label="Google logo"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <g>
                    <path d="m0 0H512V512H0" fill="#fff"></path>
                    <path
                      fill="#34a853"
                      d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                    ></path>
                    <path
                      fill="#4285f4"
                      d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                    ></path>
                    <path
                      fill="#fbbc02"
                      d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                    ></path>
                    <path
                      fill="#ea4335"
                      d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                    ></path>
                  </g>
                </svg>
                Continue with Google
              </button>

              {/* Sign Up Link */}
              <div className="text-center mt-6">
                <p className="text-sm text-base-content/60">
                  New to Crave?{" "}
                  <Link
                    to="/register"
                    className="link link-primary font-semibold"
                  >
                    Create an account
                  </Link>
                </p>
              </div>

              {/* Admin Login Link */}
              <div className="text-center mt-4 pt-4 border-t border-base-300">
                <p className="text-xs text-base-content/50">
                  Are you an admin?{" "}
                  <Link
                    to="/admin/login"
                    className="link link-secondary font-semibold"
                  >
                    Admin Login →
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;