import { useState } from "react";
import { useNavigate } from "react-router";
import { MdTableRestaurant } from "react-icons/md";
import { FiArrowLeft } from "react-icons/fi";
import useCart from "../../Hooks/useCart";
import useAxios from "../../Hooks/useAxios";

const Order = () => {
  const { cartItems, tableNumber, cartTotal, clearCart } = useCart();
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const tableParam = tableNumber ? `?table=${tableNumber}` : "";

  // Guard: if no table or empty cart, redirect away
  if (!tableNumber) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-warning font-semibold">No table detected.</p>
        <p className="text-base-content/50 text-sm">Please scan your table's QR code.</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    navigate(`/menu${tableParam}`);
    return null;
  }

  const handleConfirmOrder = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post("/api/orders", {
        table_number: tableNumber,
        items: cartItems,
        total_price: cartTotal,
      });

      if (response.data.success) {
        clearCart();
        // Navigate to success page with order ID
        navigate(`/order-success?orderId=${response.data.orderId}&table=${tableNumber}`);
      }
    } catch (err) {
      console.error("Order failed:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-100">
      <div className="container mx-auto px-4 py-10 max-w-lg">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            className="btn btn-ghost btn-sm btn-circle"
            onClick={() => navigate(`/cart${tableParam}`)}
          >
            <FiArrowLeft className="text-lg" />
          </button>
          <h1 className="text-3xl font-bold text-primary">Confirm Order</h1>
        </div>

        {/* Table number — auto-detected, readonly */}
        <div className="flex items-center gap-3 bg-primary/10 border border-primary/20
          rounded-xl px-5 py-4 mb-6">
          <MdTableRestaurant className="text-primary text-2xl" />
          <div>
            <p className="text-xs text-base-content/50 uppercase tracking-wide">Your Table</p>
            <p className="text-xl font-bold text-primary">Table {tableNumber}</p>
          </div>
          <span className="ml-auto text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
            Auto-detected
          </span>
        </div>

        {/* Order summary */}
        <div className="bg-base-200 rounded-xl p-4 mb-6">
          <h2 className="font-bold mb-3 text-base-content/70 uppercase text-xs tracking-wider">
            Order Summary
          </h2>
          <div className="flex flex-col gap-2">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="badge badge-primary badge-sm">{item.quantity}x</span>
                  <span className="text-sm font-medium">{item.item_name}</span>
                </div>
                <span className="text-sm font-semibold text-primary">
                  ৳{(Number(item.price_bdt) * item.quantity).toFixed(0)}
                </span>
              </div>
            ))}
          </div>

          <div className="divider my-3"></div>

          <div className="flex justify-between items-center font-bold text-lg">
            <span>Total</span>
            <span className="text-primary">৳{cartTotal.toFixed(0)}</span>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="alert alert-error mb-4 text-sm">
            <span>{error}</span>
          </div>
        )}

        {/* Confirm button */}
        <button
          className={`btn btn-primary w-full h-14 text-lg ${loading ? "loading" : ""}`}
          onClick={handleConfirmOrder}
          disabled={loading}
        >
          {loading ? "Placing Order..." : "✓ Place Order Now"}
        </button>

        <p className="text-center text-xs text-base-content/40 mt-3">
          Your order will be prepared and brought to Table {tableNumber}
        </p>

      </div>
    </div>
  );
};

export default Order;