import React, { useState } from "react";
import { Star, Heart, Calendar, Info, Clock } from "lucide-react";
import { useFavourites } from "../context/FavouritesContext";

export const MovieCard = ({ movie, onSelect }) => {
  const { isFavourite, toggleFavourite } = useFavourites();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const favorited = isFavourite(movie.id);

  const handleFavouriteClick = (e) => {
    e.stopPropagation();
    toggleFavourite(movie);
  };

  const handleCardClick = () => {
    if (onSelect) {
      onSelect(movie);
    }
  };

  // Fallback placeholder image with movie title in SVG
  const fallbackSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="450" viewBox="0 0 300 450"><rect width="300" height="450" fill="%231a2035"/><text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" fill="%2394a3b8" font-size="20" font-family="sans-serif">🎬</text><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" fill="%23cbd5e1" font-size="14" font-weight="600" font-family="sans-serif">${encodeURIComponent(
    movie.title
  )}</text></svg>`;

  return (
    <article
      className="movie-card"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleCardClick();
        }
      }}
      aria-label={`View details for ${movie.title}`}
    >
      <div className="card-poster-wrapper">
        {!imageLoaded && !imageError && (
          <div className="poster-skeleton-loader" aria-hidden="true" />
        )}
        <img
          src={imageError ? fallbackSvg : movie.poster}
          alt={`${movie.title} poster`}
          loading="lazy"
          className={`movie-poster-img ${imageLoaded ? "img-loaded" : ""}`}
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            setImageError(true);
            setImageLoaded(true);
          }}
        />

        {/* Favorite Button Overlay */}
        <button
          className={`fav-button-overlay ${favorited ? "is-favorited" : ""}`}
          onClick={handleFavouriteClick}
          aria-label={favorited ? `Remove ${movie.title} from favourites` : `Add ${movie.title} to favourites`}
          title={favorited ? "Remove from Favourites" : "Add to Favourites"}
        >
          <Heart
            size={18}
            className={`heart-icon ${favorited ? "heart-filled" : ""}`}
          />
        </button>

        {/* Rating Badge */}
        <div className="card-rating-badge" title={`IMDb Rating: ${movie.rating} / 10`}>
          <Star size={13} className="star-icon" />
          <span className="rating-score">{movie.rating.toFixed(1)}</span>
        </div>

        {/* Hover Quick Action */}
        <div className="card-hover-overlay">
          <div className="quick-info-btn">
            <Info size={16} />
            <span>Quick View</span>
          </div>
        </div>
      </div>

      <div className="card-info">
        <div className="card-meta">
          <span className="card-year">
            <Calendar size={12} />
            {movie.year}
          </span>
          {movie.duration && (
            <span className="card-duration">
              <Clock size={12} />
              {movie.duration}
            </span>
          )}
        </div>

        <h3 className="card-title" title={movie.title}>
          {movie.title}
        </h3>

        {/* Genre Tags */}
        <div className="card-genres">
          {movie.genres &&
            movie.genres.slice(0, 2).map((genre) => (
              <span key={genre} className="genre-pill">
                {genre}
              </span>
            ))}
          {movie.genres && movie.genres.length > 2 && (
            <span className="genre-pill genre-more">+{movie.genres.length - 2}</span>
          )}
        </div>
      </div>
    </article>
  );
};
