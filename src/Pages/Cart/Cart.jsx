




// src/Pages/Cart/Cart.jsx
import { useState } from "react";
import { useNavigate } from "react-router";
import { FiTrash2, FiPlus, FiMinus, FiArrowLeft } from "react-icons/fi";
import { MdTableRestaurant } from "react-icons/md";
import useCart from "../../Hooks/useCart";
import useStaffAuth from "../../Hooks/useStaffAuth";

const Cart = () => {
  const { cartItems, tableNumber, setTableNumber, updateQuantity, removeFromCart, cartTotal } = useCart();
  const { isStaffLoggedIn, getStaffRole } = useStaffAuth();
  const navigate = useNavigate();

  const [manualTable, setManualTable] = useState("");
  const [tableError, setTableError] = useState("");

  // Determine if table came from QR scan (URL param) vs manually set
  // QR-scanned = tableNumber exists AND user is not staff
  const isFromQR = !!tableNumber && !isStaffLoggedIn();
  const isStaff = isStaffLoggedIn();
  const staffRole = getStaffRole();

  // Staff (chef/waiter) OR admin can manually set a table
  const canManuallySetTable = isStaff;

  const tableParam = tableNumber ? `?table=${tableNumber}` : "";

  const handleSetManualTable = () => {
    const trimmed = manualTable.trim().toUpperCase();
    if (!trimmed) {
      setTableError("Please enter a table number.");
      return;
    }
    // Basic validation: accept formats like A-01, B-02, T1, etc.
    if (!/^[A-Z]-?\d{1,3}$/.test(trimmed) && !/^[A-Z]{1,2}\d{1,3}$/.test(trimmed)) {
      setTableError("Invalid format. Use formats like A-01 or B-02.");
      return;
    }
    setTableError("");
    setTableNumber(trimmed); // This updates the cart context
    setManualTable("");
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-base-100">
        <div className="text-6xl">🛒</div>
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
        <p className="text-base-content/50">Add some dishes from the menu first</p>
        <button
          className="btn btn-primary mt-2"
          onClick={() => navigate(`/menu${tableParam}`)}
        >
          Browse Menu
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100">
      <div className="container mx-auto px-4 py-10 max-w-2xl">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            className="btn btn-ghost btn-sm btn-circle"
            onClick={() => navigate(`/menu${tableParam}`)}
          >
            <FiArrowLeft className="text-lg" />
          </button>
          <h1 className="text-3xl font-bold text-primary">Your Cart</h1>
          {isStaff && (
            <span className="badge badge-warning gap-1 ml-auto">
              {staffRole === "chef" ? "👨‍🍳" : "🤵"} Staff Order
            </span>
          )}
        </div>

        {/* Table section */}
        {tableNumber ? (
          /* Table is set — show it */
          <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-xl px-4 py-3 mb-6">
            <MdTableRestaurant className="text-primary text-xl" />
            <span className="font-semibold">Table {tableNumber}</span>
            <span className="text-base-content/50 text-sm ml-1">— order will be sent here</span>
            {isFromQR && (
              <span className="ml-auto text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                QR Detected
              </span>
            )}
            {/* Staff can change the table even if already set */}
            {canManuallySetTable && (
              <button
                className="ml-auto btn btn-ghost btn-xs text-warning"
                onClick={() => setTableNumber(null)}
              >
                Change
              </button>
            )}
          </div>
        ) : canManuallySetTable ? (
          /* Staff — show manual table entry */
          <div className="bg-warning/10 border border-warning/30 rounded-xl px-4 py-4 mb-6">
            <p className="text-warning font-semibold text-sm mb-3 flex items-center gap-2">
              <MdTableRestaurant className="text-lg" />
              Enter table number for this order
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={manualTable}
                onChange={(e) => setManualTable(e.target.value.toUpperCase())}
                onKeyDown={(e) => e.key === "Enter" && handleSetManualTable()}
                placeholder="e.g. A-01, B-02"
                className="input input-bordered input-sm flex-1 uppercase"
                maxLength={6}
              />
              <button
                className="btn btn-warning btn-sm"
                onClick={handleSetManualTable}
              >
                Set Table
              </button>
            </div>
            {tableError && (
              <p className="text-error text-xs mt-2">{tableError}</p>
            )}
            <p className="text-base-content/40 text-xs mt-2">
              Available: A-01, A-02, A-03, A-04, A-05, A-06, B-01, B-02
            </p>
          </div>
        ) : (
          /* Regular customer with no QR — show warning, no input */
          <div className="bg-warning/10 border border-warning/30 rounded-xl px-4 py-3 mb-6">
            <p className="text-warning text-sm font-medium">
              ⚠️ No table detected. Please scan your table's QR code before ordering.
            </p>
          </div>
        )}

        {/* Items list */}
        <div className="flex flex-col gap-3 mb-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4 bg-base-200 rounded-xl p-4">
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{item.item_name}</p>
                <p className="text-primary font-bold text-sm mt-0.5">
                  ৳{Number(item.price_bdt).toFixed(0)} each
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  className="btn btn-outline btn-primary btn-xs btn-circle"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  <FiMinus />
                </button>
                <span className="font-bold w-5 text-center">{item.quantity}</span>
                <button
                  className="btn btn-primary btn-xs btn-circle"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <FiPlus />
                </button>
              </div>

              <p className="font-bold text-primary w-16 text-right">
                ৳{(Number(item.price_bdt) * item.quantity).toFixed(0)}
              </p>

              <button
                className="btn btn-ghost btn-xs btn-circle text-error"
                onClick={() => removeFromCart(item.id)}
              >
                <FiTrash2 />
              </button>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="flex justify-between items-center bg-base-200 rounded-xl px-5 py-4 mb-6">
          <span className="font-bold text-lg">Total</span>
          <span className="font-bold text-2xl text-primary">৳{cartTotal.toFixed(0)}</span>
        </div>

        {/* Place Order button */}
        <button
          className="btn btn-primary w-full text-lg h-14"
          disabled={!tableNumber}
          onClick={() => navigate(`/order${tableParam}`)}
        >
          {tableNumber ? "Proceed to Order →" : "Set table number to continue"}
        </button>

        {!tableNumber && !canManuallySetTable && (
          <p className="text-center text-sm text-base-content/40 mt-2">
            You need a table number from the QR code to place an order.
          </p>
        )}
      </div>
    </div>
  );
};

export default Cart;








// import { useNavigate } from "react-router";
// import { FiTrash2, FiPlus, FiMinus, FiArrowLeft } from "react-icons/fi";
// import { MdTableRestaurant } from "react-icons/md";
// import useCart from "../../Hooks/useCart";

// const Cart = () => {
//   const { cartItems, tableNumber, updateQuantity, removeFromCart, cartTotal } = useCart();
//   const navigate = useNavigate();

//   const tableParam = tableNumber ? `?table=${tableNumber}` : "";

//   if (cartItems.length === 0) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-base-100">
//         <div className="text-6xl">🛒</div>
//         <h2 className="text-2xl font-bold">Your cart is empty</h2>
//         <p className="text-base-content/50">Add some dishes from the menu first</p>
//         <button
//           className="btn btn-primary mt-2"
//           onClick={() => navigate(`/menu${tableParam}`)}
//         >
//           Browse Menu
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-base-100">
//       <div className="container mx-auto px-4 py-10 max-w-2xl">

//         {/* Header */}
//         <div className="flex items-center gap-3 mb-6">
//           <button
//             className="btn btn-ghost btn-sm btn-circle"
//             onClick={() => navigate(`/menu${tableParam}`)}
//           >
//             <FiArrowLeft className="text-lg" />
//           </button>
//           <h1 className="text-3xl font-bold text-primary">Your Cart</h1>
//         </div>

//         {/* Table badge */}
//         {tableNumber ? (
//           <div className="flex items-center gap-2 bg-primary/10 border border-primary/20
//             rounded-xl px-4 py-3 mb-6">
//             <MdTableRestaurant className="text-primary text-xl" />
//             <span className="font-semibold">Table {tableNumber}</span>
//             <span className="text-base-content/50 text-sm ml-1">— your order will be sent here</span>
//           </div>
//         ) : (
//           <div className="bg-warning/10 border border-warning/30 rounded-xl px-4 py-3 mb-6">
//             <p className="text-warning text-sm font-medium">
//               ⚠️ No table detected. Please scan your table's QR code before ordering.
//             </p>
//           </div>
//         )}

//         {/* Items list */}
//         <div className="flex flex-col gap-3 mb-6">
//           {cartItems.map((item) => (
//             <div key={item.id}
//               className="flex items-center gap-4 bg-base-200 rounded-xl p-4">

//               {/* Item info */}
//               <div className="flex-1 min-w-0">
//                 <p className="font-semibold truncate">{item.item_name}</p>
//                 <p className="text-primary font-bold text-sm mt-0.5">
//                   ৳{Number(item.price_bdt).toFixed(0)} each
//                 </p>
//               </div>

//               {/* Quantity controls */}
//               <div className="flex items-center gap-2">
//                 <button
//                   className="btn btn-outline btn-primary btn-xs btn-circle"
//                   onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                 >
//                   <FiMinus />
//                 </button>
//                 <span className="font-bold w-5 text-center">{item.quantity}</span>
//                 <button
//                   className="btn btn-primary btn-xs btn-circle"
//                   onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                 >
//                   <FiPlus />
//                 </button>
//               </div>

//               {/* Line total */}
//               <p className="font-bold text-primary w-16 text-right">
//                 ৳{(Number(item.price_bdt) * item.quantity).toFixed(0)}
//               </p>

//               {/* Remove */}
//               <button
//                 className="btn btn-ghost btn-xs btn-circle text-error"
//                 onClick={() => removeFromCart(item.id)}
//               >
//                 <FiTrash2 />
//               </button>
//             </div>
//           ))}
//         </div>

//         {/* Total */}
//         <div className="flex justify-between items-center bg-base-200 rounded-xl px-5 py-4 mb-6">
//           <span className="font-bold text-lg">Total</span>
//           <span className="font-bold text-2xl text-primary">৳{cartTotal.toFixed(0)}</span>
//         </div>

//         {/* Place Order button */}
//         <button
//           className="btn btn-primary w-full text-lg h-14"
//           disabled={!tableNumber}
//           onClick={() => navigate(`/order${tableParam}`)}
//         >
//           {tableNumber ? "Proceed to Order →" : "Scan QR code to order"}
//         </button>

//         {!tableNumber && (
//           <p className="text-center text-sm text-base-content/40 mt-2">
//             You need a table number from the QR code to place an order.
//           </p>
//         )}

//       </div>
//     </div>
//   );
// };

// export default Cart;