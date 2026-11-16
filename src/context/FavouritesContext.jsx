import React, { createContext, useContext, useState, useEffect } from "react";
import { MOVIES_DATA } from "../data/movies";

const FavouritesContext = createContext(null);

const STORAGE_KEY = "movie_explorer_favourites";
const USER_STORAGE_KEY = "movie_explorer_user";

export const FavouritesProvider = ({ children }) => {
  const [favouriteIds, setFavouriteIds] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error("Failed to read favourites from localStorage", e);
    }
    return [1, 4];
  });

  // Current logged in user state
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem(USER_STORAGE_KEY);
      if (savedUser) {
        return JSON.parse(savedUser);
      }
    } catch (e) {
      console.error("Failed to read user from localStorage", e);
    }
    return null;
  });

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Synchronize favourites with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favouriteIds));
    } catch (e) {
      console.error("Failed to save favourites to localStorage", e);
    }
  }, [favouriteIds]);

  // Synchronize user with localStorage
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    } catch (e) {
      console.error("Failed to save user to localStorage", e);
    }
  }, [currentUser]);

  const showToast = (message, type = "info") => {
    setToastMessage({ message, type, id: Date.now() });
  };

  const closeToast = () => {
    setToastMessage(null);
  };

  const loginUser = (user) => {
    setCurrentUser(user);
    showToast(`Welcome back, ${user.name}! 🎬`, "add");
    setAuthModalOpen(false);
  };

  const logoutUser = () => {
    const prevName = currentUser?.name || "User";
    setCurrentUser(null);
    showToast(`Goodbye, ${prevName}. You have logged out.`, "info");
  };

  const openAuthModal = () => setAuthModalOpen(true);
  const closeAuthModal = () => setAuthModalOpen(false);

  const isFavourite = (movieId) => {
    return favouriteIds.includes(movieId);
  };

  const toggleFavourite = (movie) => {
    if (!movie || !movie.id) return;

    if (favouriteIds.includes(movie.id)) {
      setFavouriteIds((prev) => prev.filter((id) => id !== movie.id));
      showToast(`Removed "${movie.title}" from Favourites`, "remove");
    } else {
      setFavouriteIds((prev) => [...prev, movie.id]);
      showToast(`Added "${movie.title}" to Favourites ❤️`, "add");
    }
  };

  const removeFavourite = (movieId, movieTitle) => {
    setFavouriteIds((prev) => prev.filter((id) => id !== movieId));
    if (movieTitle) {
      showToast(`Removed "${movieTitle}" from Favourites`, "remove");
    }
  };

  const clearFavourites = () => {
    setFavouriteIds([]);
    showToast("Cleared all favourite movies", "info");
  };

  // Compute full movie objects for favourites
  const favouriteMovies = MOVIES_DATA.filter((m) => favouriteIds.includes(m.id));

  return (
    <FavouritesContext.Provider
      value={{
        favouriteIds,
        favouriteMovies,
        favouritesCount: favouriteIds.length,
        isFavourite,
        toggleFavourite,
        removeFavourite,
        clearFavourites,
        currentUser,
        loginUser,
        logoutUser,
        authModalOpen,
        openAuthModal,
        closeAuthModal,
        toastMessage,
        closeToast
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error("useFavourites must be used within a FavouritesProvider");
  }
  return context;
};
