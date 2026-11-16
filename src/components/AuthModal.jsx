import React, { useState, useEffect } from "react";
import { X, Lock, Mail, User, Eye, EyeOff, LogIn, Sparkles, CheckCircle } from "lucide-react";
import { useFavourites } from "../context/FavouritesContext";

export const AuthModal = ({ isOpen, onClose }) => {
  const { loginUser } = useFavourites();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    rememberMe: true
  });

  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    setErrorMsg("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email.trim() || !formData.password.trim()) {
      setErrorMsg("Please enter both email and password.");
      return;
    }
    if (isSignUp && !formData.name.trim()) {
      setErrorMsg("Please enter your name.");
      return;
    }

    const userName = isSignUp
      ? formData.name.trim()
      : formData.email.split("@")[0].replace(/[._]/g, " ");

    const formattedName =
      userName.charAt(0).toUpperCase() + userName.slice(1);

    loginUser({
      name: formattedName,
      email: formData.email.trim(),
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80`
    });
  };

  const handleDemoLogin = () => {
    loginUser({
      name: "Alex Mercer",
      email: "alex@cinescope.movie",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80"
    });
  };

  return (
    <div className="auth-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="auth-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="auth-close-btn" onClick={onClose} aria-label="Close dialog">
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="auth-header">
          <div className="auth-icon-badge">
            <LogIn size={22} />
          </div>
          <h2 className="auth-title">
            {isSignUp ? "Create Stackly Account" : "Welcome Back"}
          </h2>
          <p className="auth-subtitle">
            {isSignUp
              ? "Join to save your favourites and sync your personalized cinema watchlist."
              : "Sign in to access your curated movie watchlist and recommendations."}
          </p>
        </div>

        {/* Mode Tabs */}
        <div className="auth-tabs">
          <button
            type="button"
            className={`auth-tab ${!isSignUp ? "auth-tab-active" : ""}`}
            onClick={() => {
              setIsSignUp(false);
              setErrorMsg("");
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`auth-tab ${isSignUp ? "auth-tab-active" : ""}`}
            onClick={() => {
              setIsSignUp(true);
              setErrorMsg("");
            }}
          >
            Sign Up
          </button>
        </div>

        {errorMsg && <div className="auth-error-banner">{errorMsg}</div>}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          {isSignUp && (
            <div className="auth-field">
              <label htmlFor="auth-name" className="auth-label">
                Full Name
              </label>
              <div className="auth-input-wrapper">
                <User size={17} className="auth-input-icon" />
                <input
                  type="text"
                  id="auth-name"
                  name="name"
                  className="auth-input"
                  placeholder="e.g. Alex Mercer"
                  value={formData.name}
                  onChange={handleChange}
                  required={isSignUp}
                />
              </div>
            </div>
          )}

          <div className="auth-field">
            <label htmlFor="auth-email" className="auth-label">
              Email Address
            </label>
            <div className="auth-input-wrapper">
              <Mail size={17} className="auth-input-icon" />
              <input
                type="email"
                id="auth-email"
                name="email"
                className="auth-input"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="auth-field">
            <div className="auth-label-row">
              <label htmlFor="auth-password" className="auth-label">
                Password
              </label>
              {!isSignUp && (
                <button
                  type="button"
                  className="auth-forgot-link"
                  onClick={() => alert("Password reset link sent to your email!")}
                >
                  Forgot password?
                </button>
              )}
            </div>
            <div className="auth-input-wrapper">
              <Lock size={17} className="auth-input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                id="auth-password"
                name="password"
                className="auth-input"
                placeholder="Enter password..."
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="auth-toggle-pwd"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="auth-checkbox-row">
            <label className="auth-checkbox-label">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <span>Remember me on this browser</span>
            </label>
          </div>

          <button type="submit" className="btn-primary auth-submit-btn">
            <span>{isSignUp ? "Create Free Account" : "Sign In to Stackly"}</span>
          </button>

          {/* Quick Demo Login Option */}
          <div className="auth-divider">
            <span>OR QUICK LOGIN</span>
          </div>

          <button
            type="button"
            className="auth-demo-btn"
            onClick={handleDemoLogin}
            title="Instant 1-Click Demo Login"
          >
            <Sparkles size={16} className="demo-icon" />
            <span>One-Click Demo Login</span>
          </button>
        </form>
      </div>
    </div>
  );
};
