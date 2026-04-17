// src/Components/Shared/Navbar.jsx
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import {
  FaUser,
  FaSignOutAlt,
  FaUtensils,
  FaConciergeBell,
  FaBars,
  FaTimes,
  FaHome,
  FaBookOpen,
  FaCalendarAlt,
  FaInfoCircle,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import useAuth from "../../Hooks/useAuth";
import useStaffAuth from "../../Hooks/useStaffAuth.js";
import ReservationBell from "../ReservationBell.jsx";

const Navbar = () => {
  const { user, signOutUser } = useAuth();
  const { isStaffLoggedIn, getStaffInfo, logoutStaff } = useStaffAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const staffLoggedIn = isStaffLoggedIn();
  const staffInfo = staffLoggedIn ? getStaffInfo() : null;

  const handleCustomerLogout = () => {
    signOutUser().catch((error) => console.log(error.message));
  };

  const handleStaffLogout = () => {
    logoutStaff();
    navigate("/login");
  };

  const getStaffDashboardPath = () => {
    if (staffInfo?.role === "admin") return "/admin/dashboard";
    if (staffInfo?.role === "chef") return "/staff/chef";
    if (staffInfo?.role === "waiter") return "/staff/waiter";
    return "/";
  };

  const getRoleIcon = () => {
    if (staffInfo?.role === "chef") return <FaUtensils className="text-sm" />;
    if (staffInfo?.role === "waiter")
      return <FaConciergeBell className="text-sm" />;
    return null;
  };

  const getRoleBadgeColor = () => {
    if (staffInfo?.role === "chef") return "badge-warning";
    if (staffInfo?.role === "waiter") return "badge-info";
    return "badge-ghost";
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
      isActive
        ? "text-primary font-semibold bg-primary/10"
        : "hover:bg-base-200"
    }`;

  const mobileLinks = [
    { to: "/", icon: <FaHome />, label: "Home" },
    { to: "/menu", icon: <FaBookOpen />, label: "Menu" },
    { to: "/reservations", icon: <FaCalendarAlt />, label: "Reservations" },
    { to: "/about", icon: <FaInfoCircle />, label: "About" },
  ];

  const desktopLinks = [
    { to: "/", label: "Home" },
    { to: "/menu", label: "Menu" },
    { to: "/reservations", label: "Reservations" },
    { to: "/about", label: "About" },
  ];

  return (
    <nav className="navbar bg-base-100 border-b border-base-300 px-3 sm:px-6 lg:px-12 sticky top-0 z-50">
      {/* Brand */}
      <div className="navbar-start">
        {/* Mobile menu button */}
        <button
          className="btn btn-ghost lg:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <FaTimes className="w-6 h-6" />
          ) : (
            <FaBars className="w-5 h-5" />
          )}
        </button>

        <NavLink
          to="/"
          className="btn btn-ghost text-xl sm:text-2xl font-black tracking-widest uppercase text-primary hover:bg-transparent px-1"
        >
          🔥 Crave
        </NavLink>
      </div>

      {/* Desktop links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-1">
          {desktopLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg font-medium transition-colors ${
                    isActive
                      ? "text-primary bg-primary/10"
                      : "hover:bg-base-200"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile slide-out menu */}
      <div
        className={`lg:hidden fixed inset-0 top-16 z-40 bg-base-100 transition-transform duration-300 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <ul className="menu p-4 w-full">
          {mobileLinks.map((link) => (
            <li key={link.to} onClick={() => setMobileMenuOpen(false)}>
              <NavLink
                to={link.to}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-base"
              >
                {link.icon} {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA Buttons */}
      <div className="navbar-end gap-1 sm:gap-2">
        {/* ── STAFF is logged in ── */}
        {staffLoggedIn ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-8 h-8 rounded-full bg-warning/20 flex items-center justify-center">
                <span className="text-warning font-bold text-sm">
                  {staffInfo?.name?.[0]?.toUpperCase() || "S"}
                </span>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-56 p-2 shadow-lg border border-base-300"
            >
              {/* Staff name + role badge */}
              <li className="menu-title">
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-sm text-base-content">
                    {staffInfo?.name}
                  </span>
                  <span
                    className={`badge badge-sm ${getRoleBadgeColor()} gap-1 w-fit`}
                  >
                    {getRoleIcon()}
                    {staffInfo?.role?.charAt(0).toUpperCase() +
                      staffInfo?.role?.slice(1)}
                  </span>
                </div>
              </li>
              <li className="mt-1">
                <NavLink to={getStaffDashboardPath()} className="gap-2">
                  <MdDashboard className="text-base" />
                  My Dashboard
                </NavLink>
              </li>
              <li>
                <hr className="my-1" />
              </li>
              <li>
                <button
                  onClick={handleStaffLogout}
                  className="text-error gap-2"
                >
                  <FaSignOutAlt className="text-sm" />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : !user ? (
          /* ── Not logged in ── */
          <Link
            to="/login"
            className="btn btn-outline btn-sm gap-1 sm:gap-2 rounded-md font-semibold border-primary text-primary hover:bg-primary hover:text-white"
          >
            <FaUser className="text-xs sm:text-sm" />
            <span className="hidden xs:inline">Login</span>
          </Link>
        ) : (
          /* ── Firebase customer logged in ── */
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary font-bold text-sm">
                  {user.email?.[0].toUpperCase()}
                </span>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow-lg border border-base-300"
            >
              <li className="menu-title text-xs opacity-60">{user.email}</li>
              <li>
                <NavLink to="/profile">Profile</NavLink>
              </li>
              <li>
                <NavLink to="/my-reservations">My Reservations</NavLink>
              </li>
              <li>
                <hr className="my-1" />
              </li>
              <li>
                <button onClick={handleCustomerLogout} className="text-error">
                  <FaSignOutAlt className="text-sm" />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}

        {/* Book a Table — always visible */}
        {/* <NavLink
          to="/reservations"
          className="btn btn-primary btn-sm rounded-md font-semibold tracking-wide uppercase"
        >
          <span className="hidden xs:inline">Book a Table</span>
          <span className="xs:hidden">Book</span>
        </NavLink> */}

        <ReservationBell></ReservationBell>
      </div>
    </nav>
  );
};

export default Navbar;

// import React from "react";
// import { Link, NavLink } from "react-router";
// import { FaUser, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
// import useAuth from "../../Hooks/useAuth";

// const Navbar = () => {
//   const { user, signOutUser } = useAuth();

//   const handleLogout = () => {
//     signOutUser()
//       .then(() => {
//         console.log("User logged out successfully");
//       })
//       .catch((error) => {
//         console.log(error.message);
//       });
//   };

//   const navLinkClass = ({ isActive }) =>
//     `px-2 py-1 rounded-md transition-colors duration-200
//     ${
//       isActive
//         ? "text-primary underline underline-offset-4 font-semibold"
//         : "hover:text-primary hover:underline hover:underline-offset-4"
//     }`;

//   const links = (
//     <>
//       <li>
//         <NavLink to="/" className={navLinkClass}>
//           Home
//         </NavLink>
//       </li>
//       <li>
//         <NavLink to="/menu" className={navLinkClass}>
//           Menu
//         </NavLink>
//       </li>
//       <li>
//         <NavLink to="/reservations" className={navLinkClass}>
//           Reservations
//         </NavLink>
//       </li>
//       <li>
//         <NavLink to="/about" className={navLinkClass}>
//           About
//         </NavLink>
//       </li>
//     </>
//   );

//   return (
//     <div className="navbar bg-base-100 border-b border-base-300 px-4 sm:px-10 lg:px-20">
//       {/* Brand */}
//       <div className="navbar-start">
//         <div className="dropdown">
//           <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M4 6h16M4 12h8m-8 6h16"
//               />
//             </svg>
//           </div>

//           {/* Mobile dropdown */}
//           <ul
//             tabIndex={0}
//             className="menu menu-sm dropdown-content bg-base-100 border border-base-300 rounded-box z-50 mt-3 w-52 p-2 shadow-lg"
//           >
//             {links}
//           </ul>
//         </div>

//         {/* Logo */}
//         <NavLink
//           to="/"
//           className="btn btn-ghost text-2xl font-black tracking-widest uppercase text-primary hover:bg-transparent"
//         >
//           🔥 Crave
//         </NavLink>
//       </div>

//       {/* Desktop links */}
//       <div className="navbar-center hidden lg:flex">
//         <ul className="menu menu-horizontal px-1 gap-1">{links}</ul>
//       </div>

//       {/* CTA Buttons */}
//       <div className="navbar-end gap-2">
//         {/* Show Login/SignUp or User Menu based on authentication */}
//         {!user ? (
//           <>
//             {/* Sign Up Button */}
//             <Link
//               to="/login"
//               className="btn btn-outline btn-sm gap-2 rounded-md font-semibold border-primary text-primary hover:bg-primary hover:text-white"
//             >
//               <FaUser className="text-sm" />
//               Login
//             </Link>
//           </>
//         ) : (
//           <>
//             {/* User Avatar Dropdown */}
//             <div className="dropdown dropdown-end">
//               <div
//                 tabIndex={0}
//                 role="button"
//                 className="btn btn-ghost btn-circle avatar"
//               >
//                 <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
//                   <span className="text-primary font-bold text-sm">
//                     {user.email?.[0].toUpperCase()}
//                   </span>
//                 </div>
//               </div>
//               <ul
//                 tabIndex={0}
//                 className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow-lg border border-base-300"
//               >
//                 <li className="menu-title text-xs opacity-60">{user.email}</li>
//                 <li>
//                   <NavLink to="/profile">Profile</NavLink>
//                 </li>
//                 <li>
//                   <NavLink to="/my-reservations">My Reservations</NavLink>
//                 </li>
//                 <li>
//                   <hr className="my-1" />
//                 </li>
//                 <li>
//                   <button onClick={handleLogout} className="text-error">
//                     <FaSignOutAlt className="text-sm" />
//                     Logout
//                   </button>
//                 </li>
//               </ul>
//             </div>
//           </>
//         )}

//         {/* Book a Table Button - Always visible */}
//         <NavLink
//           to="/reservations"
//           className="btn btn-primary btn-sm rounded-md font-semibold tracking-wide uppercase"
//         >
//           Book a Table
//         </NavLink>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
