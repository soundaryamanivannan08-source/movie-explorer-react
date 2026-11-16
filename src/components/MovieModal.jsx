import React, { useEffect } from "react";
import { X, Star, Heart, Calendar, Clock, Film, ExternalLink, User, Users } from "lucide-react";
import { useFavourites } from "../context/FavouritesContext";

export const MovieModal = ({ movie, onClose }) => {
  const { isFavourite, toggleFavourite } = useFavourites();

  // Close on Escape key press
  useEffect(() => {
    if (!movie) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    // Prevent background scrolling while modal is open
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [movie, onClose]);

  if (!movie) return null;

  const favorited = isFavourite(movie.id);

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Modal Backdrop Banner */}
        <div
          className="modal-banner"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(11, 14, 23, 0.4) 0%, rgba(11, 14, 23, 0.95) 100%), url(${movie.backdrop || movie.poster})`
          }}
        >
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>

          {movie.tagline && <span className="modal-tagline">"{movie.tagline}"</span>}
        </div>

        {/* Modal Content */}
        <div className="modal-content">
          <div className="modal-header-row">
            <div className="modal-poster-col">
              <img
                src={movie.poster}
                alt={`${movie.title} poster`}
                className="modal-poster-img"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&auto=format&fit=crop&q=80";
                }}
              />
            </div>

            <div className="modal-main-meta">
              <h2 className="modal-title">{movie.title}</h2>

              <div className="modal-meta-badges">
                <div className="badge-rating" title="IMDb Score">
                  <Star size={15} className="star-icon" />
                  <span className="badge-rating-val">{movie.rating.toFixed(1)}</span>
                  <span className="badge-rating-max">/10</span>
                </div>

                <div className="badge-meta">
                  <Calendar size={14} />
                  <span>{movie.year}</span>
                </div>

                {movie.duration && (
                  <div className="badge-meta">
                    <Clock size={14} />
                    <span>{movie.duration}</span>
                  </div>
                )}
              </div>

              {/* Genres list */}
              <div className="modal-genres">
                {movie.genres?.map((genre) => (
                  <span key={genre} className="genre-pill modal-genre-pill">
                    {genre}
                  </span>
                ))}
              </div>

              {/* Actions row */}
              <div className="modal-actions-row">
                <button
                  className={`btn-fav-modal ${favorited ? "btn-fav-active" : ""}`}
                  onClick={() => toggleFavourite(movie)}
                >
                  <Heart size={18} className={favorited ? "heart-filled" : ""} />
                  <span>{favorited ? "In Favourites" : "Add to Favourites"}</span>
                </button>

                {movie.trailerCode && (
                  <a
                    href={`https://www.youtube.com/watch?v=${movie.trailerCode}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-trailer-modal"
                  >
                    <ExternalLink size={16} />
                    <span>Watch Trailer</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Synopsis */}
          <div className="modal-body-section">
            <h4 className="modal-section-title">Overview</h4>
            <p className="modal-description">{movie.description}</p>
          </div>

          {/* Cast & Crew */}
          <div className="modal-crew-grid">
            {movie.director && (
              <div className="crew-item">
                <div className="crew-label">
                  <User size={15} />
                  <span>Director</span>
                </div>
                <div className="crew-value">{movie.director}</div>
              </div>
            )}

            {movie.cast && movie.cast.length > 0 && (
              <div className="crew-item crew-cast-full">
                <div className="crew-label">
                  <Users size={15} />
                  <span>Starring Cast</span>
                </div>
                <div className="crew-chips">
                  {movie.cast.map((actor) => (
                    <span key={actor} className="actor-chip">
                      {actor}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
