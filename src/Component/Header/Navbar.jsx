import React from "react";
import { Link, NavLink } from "react-router";
import { FaUser, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";

const Navbar = () => {
  const { user, signOutUser } = useAuth();

  const handleLogout = () => {
    signOutUser()
      .then(() => {
        console.log("User logged out successfully");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const navLinkClass = ({ isActive }) =>
    `px-2 py-1 rounded-md transition-colors duration-200
    ${
      isActive
        ? "text-primary underline underline-offset-4 font-semibold"
        : "hover:text-primary hover:underline hover:underline-offset-4"
    }`;

  const links = (
    <>
      <li>
        <NavLink to="/" className={navLinkClass}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/menu" className={navLinkClass}>
          Menu
        </NavLink>
      </li>
      <li>
        <NavLink to="/reservations" className={navLinkClass}>
          Reservations
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" className={navLinkClass}>
          About
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 border-b border-base-300 px-4 sm:px-10 lg:px-20">
      {/* Brand */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          {/* Mobile dropdown */}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 border border-base-300 rounded-box z-50 mt-3 w-52 p-2 shadow-lg"
          >
            {links}
          </ul>
        </div>

        {/* Logo */}
        <NavLink
          to="/"
          className="btn btn-ghost text-2xl font-black tracking-widest uppercase text-primary hover:bg-transparent"
        >
          🔥 Crave
        </NavLink>
      </div>

      {/* Desktop links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-1">{links}</ul>
      </div>

      {/* CTA Buttons */}
      <div className="navbar-end gap-2">
        {/* Show Login/SignUp or User Menu based on authentication */}
        {!user ? (
          <>
            {/* Sign Up Button */}
            <Link
              to="/login"
              className="btn btn-outline btn-sm gap-2 rounded-md font-semibold border-primary text-primary hover:bg-primary hover:text-white"
            >
              <FaUser className="text-sm" />
              Login
            </Link>
          </>
        ) : (
          <>
            {/* User Avatar Dropdown */}
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
                  <button onClick={handleLogout} className="text-error">
                    <FaSignOutAlt className="text-sm" />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </>
        )}

        {/* Book a Table Button - Always visible */}
        <NavLink
          to="/reservations"
          className="btn btn-primary btn-sm rounded-md font-semibold tracking-wide uppercase"
        >
          Book a Table
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
