import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAxios from "../../hooks/useAxios";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
 
const Reservations = () => {
  const axiosInstance = useAxios();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
 
  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
 
    try {
      const response = await axiosInstance.post("/api/reservations", {
        customer_name: data.name,
        customer_email: data.email,
        customer_phone: data.phone,
        number_of_guests: parseInt(data.guests),
        reservation_date: data.date,
        reservation_time: data.time,
        special_requests: data.special_requests || ""
      });
 
      if (response.data.success) {
        setSuccessMessage(response.data.message);
        setSubmitted(true);
        reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Failed to submit reservation");
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="min-h-screen bg-base-100 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">
            Book A
            <span className="text-primary"> Table</span>
          </h1>
          <p className="text-base-content/60 text-lg">
            Reserve your table at Crave Restaurant
          </p>
        </div>
 
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left - Operating Hours */}
          <div className="bg-base-200 p-8 rounded-2xl h-fit">
            <h2 className="text-2xl font-bold mb-6">Operating Hours</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">Monday - Friday</h3>
                <p className="text-base-content/70">
                  <span className="text-primary font-semibold">08:00 AM - 12:00 PM</span>
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">Saturday - Sunday</h3>
                <p className="text-base-content/70">
                  <span className="text-primary font-semibold">10:00 AM - 11:00 PM</span>
                </p>
              </div>
 
              <div className="border-t border-base-300 pt-6">
                <h3 className="font-semibold text-lg mb-3">Important Notes</h3>
                <ul className="space-y-2 text-sm text-base-content/70">
                  <li>• Reservation valid for 2 hours</li>
                  <li>• Please arrive 10 minutes early</li>
                  <li>• Minimum 2 guests required</li>
                  <li>• Maximum 8 guests per table</li>
                  <li>• Admin approval required for confirmation</li>
                </ul>
              </div>
            </div>
          </div>
 
          {/* Right - Reservation Form */}
          <div className="bg-white border border-base-300 rounded-2xl p-8 shadow-lg">
            {/* Success Message */}
            {submitted && (
              <div className="alert alert-success shadow-lg mb-6 flex items-center gap-3">
                <FiCheckCircle className="text-2xl" />
                <div>
                  <h3 className="font-bold">Success!</h3>
                  <p className="text-sm">{successMessage}</p>
                </div>
              </div>
            )}
 
            {/* Error Message */}
            {errorMessage && (
              <div className="alert alert-error shadow-lg mb-6">
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
 
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Row 1: Name and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Full Name *</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className={`input input-bordered w-full focus:input-primary ${errors.name ? "input-error" : ""}`}
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && <p className="text-error text-xs mt-1">{errors.name.message}</p>}
                </div>
 
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Email Address *</span>
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className={`input input-bordered w-full focus:input-primary ${errors.email ? "input-error" : ""}`}
                    {...register("email", { 
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email"
                      }
                    })}
                  />
                  {errors.email && <p className="text-error text-xs mt-1">{errors.email.message}</p>}
                </div>
              </div>
 
              {/* Row 2: Phone and Guests */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Phone Number *</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="01700000000"
                    className={`input input-bordered w-full focus:input-primary ${errors.phone ? "input-error" : ""}`}
                    {...register("phone", { 
                      required: "Phone is required",
                      pattern: {
                        value: /^[0-9]{11}$/,
                        message: "Invalid phone number"
                      }
                    })}
                  />
                  {errors.phone && <p className="text-error text-xs mt-1">{errors.phone.message}</p>}
                </div>
 
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Number of Guests *</span>
                  </label>
                  <select
                    className={`select select-bordered w-full focus:select-primary ${errors.guests ? "select-error" : ""}`}
                    {...register("guests", { required: "Number of guests is required" })}
                  >
                    <option value="">Select guests</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="5">5 Guests</option>
                    <option value="6">6 Guests</option>
                    <option value="7">7 Guests</option>
                    <option value="8">8 Guests</option>
                  </select>
                  {errors.guests && <p className="text-error text-xs mt-1">{errors.guests.message}</p>}
                </div>
              </div>
 
              {/* Row 3: Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Reservation Date *</span>
                  </label>
                  <input
                    type="date"
                    className={`input input-bordered w-full focus:input-primary ${errors.date ? "input-error" : ""}`}
                    {...register("date", { required: "Date is required" })}
                  />
                  {errors.date && <p className="text-error text-xs mt-1">{errors.date.message}</p>}
                </div>
 
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Reservation Time *</span>
                  </label>
                  <select
                    className={`select select-bordered w-full focus:select-primary ${errors.time ? "select-error" : ""}`}
                    {...register("time", { required: "Time is required" })}
                  >
                    <option value="">Select time</option>
                    <option value="08:00">08:00 AM</option>
                    <option value="09:00">09:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="13:00">01:00 PM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="15:00">03:00 PM</option>
                    <option value="16:00">04:00 PM</option>
                    <option value="17:00">05:00 PM</option>
                    <option value="18:00">06:00 PM</option>
                    <option value="19:00">07:00 PM</option>
                    <option value="20:00">08:00 PM</option>
                    <option value="21:00">09:00 PM</option>
                    <option value="22:00">10:00 PM</option>
                  </select>
                  {errors.time && <p className="text-error text-xs mt-1">{errors.time.message}</p>}
                </div>
              </div>
 
              {/* Special Requests */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Special Requests (Optional)</span>
                </label>
                <textarea
                  placeholder="Any special requests? (High chair, quiet table, etc.)"
                  className="textarea textarea-bordered w-full h-20 focus:textarea-primary resize-none"
                  {...register("special_requests")}
                ></textarea>
              </div>
 
              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full font-semibold text-lg gap-2 mt-6 group"
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Submitting...
                  </>
                ) : (
                  <>
                    Request Reservation
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
 
              <p className="text-xs text-base-content/50 text-center mt-4">
                Admin will confirm your reservation via email within 2 hours
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default Reservations;