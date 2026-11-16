import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import {
  Film,
  Compass,
  Heart,
  Menu,
  X,
  Sparkles,
  LogIn,
  LogOut,
  User,
  ChevronDown
} from "lucide-react";
import { useFavourites } from "../context/FavouritesContext";
import { AuthModal } from "./AuthModal";

export const Navbar = () => {
  const {
    favouritesCount,
    currentUser,
    logoutUser,
    authModalOpen,
    openAuthModal,
    closeAuthModal
  } = useFavourites();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  }, [location.pathname]);

  // Click outside listener for user dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Add background blur effect when scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={`site-header ${scrolled ? "header-scrolled" : ""}`}>
        <div className="header-container">
          {/* Brand Logo */}
          <Link to="/" className="brand-logo" aria-label="Stackly Home">
            <img
              src={`${import.meta.env.BASE_URL}images/logo_0983.webp`}
              alt="Stackly"
              className="brand-logo-img"
            />
          </Link>

          {/* Desktop Navigation Links & Login */}
          <nav className="desktop-nav">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `nav-link ${isActive ? "nav-link-active" : ""}`
              }
            >
              <span>Home</span>
            </NavLink>

            <NavLink
              to="/explore"
              className={({ isActive }) =>
                `nav-link ${isActive ? "nav-link-active" : ""}`
              }
            >
              <Compass size={16} />
              <span>Explore Movies</span>
            </NavLink>

            <NavLink
              to="/favourites"
              className={({ isActive }) =>
                `nav-link nav-link-fav ${isActive ? "nav-link-active" : ""}`
              }
            >
              <Heart size={16} className="fav-nav-icon" />
              <span>Favourites</span>
              {favouritesCount > 0 && (
                <span className="badge-count" title={`${favouritesCount} movies saved`}>
                  {favouritesCount}
                </span>
              )}
            </NavLink>

            {/* Login / User Profile in Marked Area */}
            {currentUser ? (
              <div className="user-profile-menu-container" ref={dropdownRef}>
                <button
                  type="button"
                  className="user-profile-pill"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  aria-label="User profile menu"
                  aria-expanded={userDropdownOpen}
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="user-avatar-tiny"
                  />
                  <span className="user-name-short">{currentUser.name.split(" ")[0]}</span>
                  <ChevronDown
                    size={14}
                    className={`user-dd-arrow ${userDropdownOpen ? "arrow-rotated" : ""}`}
                  />
                </button>

                {userDropdownOpen && (
                  <div className="user-dropdown-menu">
                    <div className="user-dropdown-header">
                      <span className="user-dd-name">{currentUser.name}</span>
                      <span className="user-dd-email">{currentUser.email}</span>
                    </div>

                    <Link
                      to="/favourites"
                      className="user-dd-item"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      <Heart size={15} />
                      <span>My Favourites ({favouritesCount})</span>
                    </Link>

                    <button
                      type="button"
                      className="user-dd-item user-dd-logout"
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logoutUser();
                      }}
                    >
                      <LogOut size={15} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                className="nav-login-btn"
                onClick={openAuthModal}
                aria-label="Log in to CineScope"
              >
                <LogIn size={15} />
                <span>Login</span>
              </button>
            )}
          </nav>

          {/* Mobile Hamburger Toggle Button */}
          <button
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
        {mobileMenuOpen && (
          <div className="mobile-drawer-overlay" onClick={() => setMobileMenuOpen(false)}>
            <div
              className="mobile-drawer"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-label="Mobile Navigation"
            >
              <div className="mobile-drawer-header">
                <Link
                  to="/"
                  className="brand-logo"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Stackly Home"
                >
                  <img
                    src={`${import.meta.env.BASE_URL}images/logo_0983.webp`}
                    alt="Stackly"
                    className="brand-logo-img"
                  />
                </Link>
                <button
                  className="close-drawer-btn"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>

              <nav className="mobile-nav-links">
                {/* Mobile User Status / Login */}
                <div className="mobile-auth-banner">
                  {currentUser ? (
                    <div className="mobile-user-card">
                      <img
                        src={currentUser.avatar}
                        alt={currentUser.name}
                        className="mobile-user-avatar"
                      />
                      <div className="mobile-user-details">
                        <span className="mobile-user-name">{currentUser.name}</span>
                        <span className="mobile-user-email">{currentUser.email}</span>
                      </div>
                    </div>
                  ) : (
                    <button
                      className="btn-primary mobile-login-btn"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        openAuthModal();
                      }}
                    >
                      <LogIn size={18} />
                      <span>Login to Account</span>
                    </button>
                  )}
                </div>

                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `mobile-nav-item ${isActive ? "mobile-nav-active" : ""}`
                  }
                >
                  <Film size={20} />
                  <span>Home</span>
                </NavLink>

                <NavLink
                  to="/explore"
                  className={({ isActive }) =>
                    `mobile-nav-item ${isActive ? "mobile-nav-active" : ""}`
                  }
                >
                  <Compass size={20} />
                  <span>Explore Movies</span>
                </NavLink>

                <NavLink
                  to="/favourites"
                  className={({ isActive }) =>
                    `mobile-nav-item ${isActive ? "mobile-nav-active" : ""}`
                  }
                >
                  <div className="mobile-fav-left">
                    <Heart size={20} />
                    <span>Favourites</span>
                  </div>
                  {favouritesCount > 0 && (
                    <span className="badge-count">{favouritesCount}</span>
                  )}
                </NavLink>

                {currentUser && (
                  <button
                    className="mobile-nav-item mobile-logout-item"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logoutUser();
                    }}
                  >
                    <div className="mobile-fav-left">
                      <LogOut size={20} />
                      <span>Sign Out</span>
                    </div>
                  </button>
                )}
              </nav>

              <div className="mobile-drawer-footer">
                <p>Explore top movies, ratings and reviews.</p>
              </div>
            </div>
          </div>
        )}

      {/* Auth Modal */}
      <AuthModal isOpen={authModalOpen} onClose={closeAuthModal} />
    </>
  );
};
