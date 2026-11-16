import React from "react";
import { Link } from "react-router-dom";
import { Film, ExternalLink, MapPin, Mail, Phone } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-top">
          {/* Column 1: Brand Info */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo" aria-label="Stackly Home">
              <img
                src="/images/logo_0983.webp"
                alt="Stackly"
                className="brand-logo-img footer-logo-img"
              />
            </Link>
            <p className="footer-tagline">
              Your ultimate gateway to explore trending movies, cinema classics, ratings,
              and curate your personalized favourites list.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="footer-nav-col">
            <h4 className="footer-heading">Navigation</h4>
            <ul className="footer-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/explore">Explore Movies</Link>
              </li>
              <li>
                <Link to="/favourites">Favourites</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Inspirations */}
          <div className="footer-nav-col">
            <h4 className="footer-heading">Inspirations</h4>
            <ul className="footer-links">
              <li>
                <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">
                  TMDB <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a href="https://www.imdb.com/" target="_blank" rel="noopener noreferrer">
                  IMDb <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a href="https://www.netflix.com/" target="_blank" rel="noopener noreferrer">
                  Netflix <ExternalLink size={12} />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Address in Marked Area */}
          <div className="footer-nav-col footer-contact-col">
            <h4 className="footer-heading">Contact Info</h4>
            <ul className="footer-contact-list">
              <li className="footer-contact-item">
                <MapPin size={17} className="footer-contact-icon" />
                <span className="footer-contact-text">
                  MMR Complex, Chinna Thirupathi, near Chinna Muniyappan Kovil, Salem, Tamil Nadu 636008
                </span>
              </li>

              <li className="footer-contact-item">
                <Mail size={16} className="footer-contact-icon" />
                <a href="mailto:info@stackly.com" className="footer-contact-link">
                  info@stackly.com
                </a>
              </li>

              <li className="footer-contact-item">
                <Phone size={16} className="footer-contact-icon" />
                <a href="tel:9876543210" className="footer-contact-link">
                  +91 9876543210
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            &copy; {new Date().getFullYear()} CineScope Movie Explorer. Built with React, ES6+, HTML5 & CSS3.
          </p>
          <p className="footer-subtext">
            Designed for movie lovers everywhere. Data and images used for demonstration purposes.
          </p>
        </div>
      </div>
    </footer>
  );
};
