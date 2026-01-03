import React from "react";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch {
      toast.error("Logout failed");
    }
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "font-semibold text-primary border-b-2 border-primary"
      : "hover:text-primary transition";

  const publicLinks = (
    <>
      <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
      <li><NavLink to="/allJobs" className={navLinkClass}>All Jobs</NavLink></li>
    </>
  );

  const privateLinks = (
    <>
      <li><NavLink to="/addAJobs" className={navLinkClass}>Add Job</NavLink></li>
      <li><NavLink to="/my-accepted-tasks" className={navLinkClass}>Accepted Tasks</NavLink></li>
      <li><NavLink to="/myAddedJobs" className={navLinkClass}>My Jobs</NavLink></li>
      <li><NavLink to="/profile" className={navLinkClass}>Profile</NavLink></li>
    </>
  );

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <nav className="sticky top-0 z-50 bg-base-100 border-b">
        <div className="navbar max-w-7xl mx-auto px-4">

          {/* LEFT */}
          <div className="navbar-start">
            <div className="dropdown lg:hidden">
              <label tabIndex={0} className="btn btn-ghost">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-56"
              >
                {publicLinks}
                {user && privateLinks}
              </ul>
            </div>

            <NavLink to="/" className="text-xl font-bold tracking-wide">
              Freelance<span className="text-primary">Market</span>
            </NavLink>
          </div>

          {/* CENTER */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal gap-4">
              {publicLinks}
              {user && privateLinks}
            </ul>
          </div>

          {/* RIGHT */}
          <div className="navbar-end gap-3">
            <ThemeToggle />

            {user ? (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="avatar cursor-pointer">
                  <div className="w-10 rounded-full ring ring-primary ring-offset-2">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="User profile" />
                    ) : (
                      <div className="bg-primary text-white flex items-center justify-center h-full">
                        {user.email?.[0]?.toUpperCase()}
                      </div>
                    )}
                  </div>
                </label>

                <ul
                  tabIndex={0}
                  className="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li className="menu-title">
                    <span>{user.displayName || user.email}</span>
                  </li>
                  <li><NavLink to="/profile">Profile</NavLink></li>
                  <li><button onClick={handleLogout}>Logout</button></li>
                </ul>
              </div>
            ) : (
              <>
                <NavLink to="/login" className="btn btn-outline btn-sm">
                  Login
                </NavLink>
                <NavLink to="/register" className="btn btn-primary btn-sm">
                  Register
                </NavLink>
              </>
            )}
          </div>

        </div>
      </nav>
    </>
  );
};

export default Navbar;
