import React from "react";
import { Links, Link, useLocation, useNavigate } from "react-router-dom";

const NavBar = () => {
  let location = useLocation();
  let navigate = useNavigate();

  const hadnleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login") // Redirect to login page after logout
  }

  React.useEffect(() => {
    // This will run when the component mounts or location changes
    // You can add any side effects here if needed
  }, [location]);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Navbar
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul className="dropdown-menu"></ul>
              </li>
            </ul>
            {!localStorage.getItem("token") ? (
              <form className="d-flex" role="search">
                <Link
                  className="btn btn-outline-success mx-2"
                  to="/login"
                  type="submit"
                >
                  Login
                </Link>
                <Link
                  className="btn btn-outline-success mx-2"
                  to="/signup"
                  type="submit"
                >
                  Sign Up
                </Link>
              </form>
            ) : (
              <div className="btn btn-outline-success mx-2" onClick={hadnleLogout}>Logout</div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
