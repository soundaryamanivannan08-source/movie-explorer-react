import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  Compass,
  Trash2,
  Film,
  Sparkles,
  ArrowRight,
  BookmarkX
} from "lucide-react";
import { useFavourites } from "../context/FavouritesContext";
import { MovieCard } from "../components/MovieCard";
import { MovieModal } from "../components/MovieModal";

export const Favourites = () => {
  const { favouriteMovies, favouritesCount, clearFavourites } = useFavourites();
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to remove all movies from your favourites?")) {
      clearFavourites();
    }
  };

  return (
    <div className="favourites-page-container">
      {/* Header Banner */}
      <section className="fav-hero-header">
        <div className="fav-header-content">
          <div className="fav-badge">
            <Heart size={15} className="heart-filled" />
            <span>Personal Collection</span>
          </div>
          <h1 className="fav-page-title">My Favourites</h1>
          <p className="fav-page-desc">
            Your handpicked watchlist of cinematic masterpieces. All selections are saved
            automatically in your browser's local storage.
          </p>
        </div>
      </section>

      <div className="section-container fav-main-content">
        {favouritesCount > 0 ? (
          <>
            {/* Top Bar with count and Clear All */}
            <div className="fav-top-bar">
              <div className="fav-counter-pill">
                <span>
                  Saved Movies: <strong>{favouritesCount}</strong>
                </span>
              </div>

              <div className="fav-actions-group">
                <Link to="/explore" className="btn-secondary btn-fav-add-more">
                  <Compass size={16} />
                  <span>Explore More</span>
                </Link>

                <button
                  className="btn-clear-all-fav"
                  onClick={handleClearAll}
                  title="Remove all saved movies"
                >
                  <Trash2 size={15} />
                  <span>Clear All</span>
                </button>
              </div>
            </div>

            {/* Favourites Grid */}
            <div className="movies-grid">
              {favouriteMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onSelect={(m) => setSelectedMovie(m)}
                />
              ))}
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="empty-favourites-container">
            <div className="empty-fav-icon-wrapper">
              <BookmarkX size={56} className="empty-fav-icon" />
            </div>

            <h2 className="empty-fav-title">No Favourite Movies Yet</h2>
            <p className="empty-fav-text">
              You haven't added any movies to your favourites collection yet. Browse our
              catalog of trending and popular titles, then click the heart icon on any card
              to save them here!
            </p>

            <div className="empty-fav-actions">
              <Link to="/explore" className="btn-primary empty-fav-btn">
                <Compass size={18} />
                <span>Discover Movies</span>
                <ArrowRight size={18} />
              </Link>
              <Link to="/" className="btn-secondary empty-fav-btn">
                <Film size={18} />
                <span>Go to Home</span>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
};
