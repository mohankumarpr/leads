import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../Context/UserContext'; // Import the user context

export const Navbar = () => {
  const { user, setUser } = useUser(); // Access user from context
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false); // State to manage logout button visibility
  const [isScrolled, setIsScrolled] = useState(false);

  const handleLogout = () => {
    setUser(null); // Clear user data on logout
    navigate('/'); // Redirect to home after logout
  };

  // Add scroll listener
  useEffect(() => {
    const handleScroll = () => {
      // Check if the page is scrolled more than 50px
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg ${isScrolled ? "scrolled" : ""}`}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" style={{color: '#bf3f4f'}}>Varthak</Link>
        <div className="collapse navbar-collapse justify-content-center">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/pricing">Pricing</Link>
            </li>
          </ul>
        </div>
        <div className="d-flex">
          {user ? (
            <div 
              className="nav-item dropdown"
              onMouseEnter={() => setShowLogout(true)}
              onMouseLeave={() => setShowLogout(false)}
            >
              <span className="nav-link dropdown-toggle">
                {user.name}
              </span>
              {showLogout && (
                <div className="dropdown-menu dropdown-menu-right">
                  <button className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link className="btn btn-primary" to="/login">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
