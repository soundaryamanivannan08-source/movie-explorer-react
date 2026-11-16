import React, { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Toast } from "./components/Toast";
import { Home } from "./pages/Home";
import { Explore } from "./pages/Explore";
import { Favourites } from "./pages/Favourites";
import { useFavourites } from "./context/FavouritesContext";
import "./App.css";

// Automatically scrolls window to top on route navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
};

export const AppContent = () => {
  const { toastMessage, closeToast } = useFavourites();

  return (
    <div className="app-layout">
      <ScrollToTop />
      <Navbar />

      <main className="app-main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />

      {/* Floating Toast notification */}
      <Toast toast={toastMessage} onClose={closeToast} />
    </div>
  );
};

export default function App() {
  return <AppContent />;
}
