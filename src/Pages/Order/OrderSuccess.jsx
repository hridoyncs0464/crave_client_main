import { useSearchParams, useNavigate } from "react-router";

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const orderId = searchParams.get("orderId");
  const tableNumber = searchParams.get("table");
  const tableParam = tableNumber ? `?table=${tableNumber}` : "";

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center px-4">
      <div className="text-center max-w-sm w-full">

        {/* Success animation */}
        <div className="w-24 h-24 rounded-full bg-success/20 flex items-center justify-center
          mx-auto mb-6 text-5xl animate-bounce">
          🎉
        </div>

        <h1 className="text-3xl font-bold text-success mb-2">Order Placed!</h1>
        <p className="text-base-content/60 mb-6">
          Your food is being prepared. Sit back and relax!
        </p>

        {/* Details card */}
        <div className="bg-base-200 rounded-2xl p-5 mb-8 text-left space-y-3">
          <div className="flex justify-between">
            <span className="text-base-content/50 text-sm">Order #</span>
            <span className="font-bold">#{orderId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-base-content/50 text-sm">Table</span>
            <span className="font-bold text-primary">Table {tableNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-base-content/50 text-sm">Status</span>
            <span className="badge badge-warning badge-sm">Preparing</span>
          </div>
        </div>

        {/* Order more button */}
        <button
          className="btn btn-primary w-full"
          onClick={() => navigate(`/menu${tableParam}`)}
        >
          Order More Items
        </button>

        <p className="text-xs text-base-content/30 mt-4">
          Show this to a staff member if needed · Order #{orderId}
        </p>

      </div>
    </div>
  );
};

export default OrderSuccess;