import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  TrendingUp,
  Flame,
  ArrowRight,
  Star,
  Calendar,
  Heart,
  Info,
  Play,
  Sparkles,
  ChevronRight,
  Clapperboard,
  Clock,
  Tv
} from "lucide-react";
import { MOVIES_DATA, GENRES_LIST } from "../data/movies";
import { MovieCard } from "../components/MovieCard";
import { MovieModal } from "../components/MovieModal";
import { useFavourites } from "../context/FavouritesContext";

export const Home = () => {
  const navigate = useNavigate();
  const { isFavourite, toggleFavourite } = useFavourites();

  // Curated hero highlights (top 4 blockbusters with wide 4K backdrops)
  const heroMovies = MOVIES_DATA.filter((m) => m.isHero);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Auto-advance hero banner every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroMovies.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [heroMovies.length]);

  const activeHero = heroMovies[currentHeroIndex] || heroMovies[0];
  const isHeroFav = isFavourite(activeHero.id);

  // Filter trending and popular movies dynamically
  const trendingMovies = MOVIES_DATA.filter((m) => m.isTrending);
  const popularMovies = MOVIES_DATA.filter((m) => m.isPopular);

  return (
    <div className="home-page-container">
      {/* ================= HERO SECTION ================= */}
      <section
        className="hero-section"
        style={{
          backgroundImage: `linear-gradient(to right, #0b0e17 0%, rgba(11, 14, 23, 0.92) 40%, rgba(11, 14, 23, 0.72) 75%, rgba(11, 14, 23, 0.95) 100%), linear-gradient(to top, #0b0e17 0%, transparent 60%), url(${activeHero.backdrop})`
        }}
      >
        <div className="hero-container">
          {/* Left Column: Perfectly Aligned Movie Info */}
          <div className="hero-info-col">
            {/* Spotlight Badge */}
            <div className="hero-pill">
              <Flame size={15} className="hero-pill-icon" />
              <span>Featured Spotlight</span>
            </div>

            {/* Movie Title */}
            <h1 className="hero-title">{activeHero.title}</h1>

            {/* Tagline */}
            {activeHero.tagline && (
              <p className="hero-tagline">"{activeHero.tagline}"</p>
            )}

            {/* Meta Row: Uniformly Aligned Pills */}
            <div className="hero-meta-row">
              <div className="hero-meta-pill rating-pill" title={`IMDb Rating: ${activeHero.rating}/10`}>
                <Star size={14} className="star-icon" />
                <span className="rating-score">{activeHero.rating.toFixed(1)}</span>
                <span className="rating-max">/10</span>
              </div>

              <div className="hero-meta-pill year-pill">
                <Calendar size={13} />
                <span>{activeHero.year}</span>
              </div>

              <div className="hero-meta-pill duration-pill">
                <Clock size={13} />
                <span>{activeHero.duration}</span>
              </div>

              <div className="hero-meta-pill quality-pill">
                <Tv size={13} />
                <span>4K ULTRA HD</span>
              </div>
            </div>

            {/* Genres Row */}
            <div className="hero-genres-row">
              {activeHero.genres?.map((genre) => (
                <span key={genre} className="hero-genre-pill">
                  {genre}
                </span>
              ))}
            </div>

            {/* Synopsis Description */}
            <p className="hero-description">{activeHero.description}</p>

            {/* Action Buttons: Perfectly Aligned */}
            <div className="hero-actions-row">
              <button
                className="btn-primary hero-action-btn"
                onClick={() => setSelectedMovie(activeHero)}
              >
                <Info size={17} />
                <span>Movie Details</span>
              </button>

              <button
                className={`btn-secondary hero-action-btn hero-fav-btn ${isHeroFav ? "btn-hero-fav-active" : ""}`}
                onClick={() => toggleFavourite(activeHero)}
              >
                <Heart size={17} className={isHeroFav ? "heart-filled" : ""} />
                <span>{isHeroFav ? "In Favourites" : "Add to Favourites"}</span>
              </button>

              <Link to="/explore" className="btn-outline hero-action-btn hero-explore-link">
                <span>View All Movies</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Slider Switcher Bar */}
            <div className="hero-slider-nav">
              <span className="hero-slider-label">Spotlight {currentHeroIndex + 1} of {heroMovies.length}</span>
              <div className="hero-dots-group">
                {heroMovies.map((m, idx) => (
                  <button
                    key={m.id}
                    className={`hero-dot-bar ${idx === currentHeroIndex ? "hero-dot-active" : ""}`}
                    onClick={() => setCurrentHeroIndex(idx)}
                    aria-label={`Jump to ${m.title}`}
                    title={m.title}
                  >
                    <span className="dot-title-preview">{m.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Visual Poster Card & Preview */}
          <div className="hero-showcase-col">
            <div
              className="hero-poster-card"
              onClick={() => setSelectedMovie(activeHero)}
              title={`Click to view ${activeHero.title}`}
            >
              <div className="hero-poster-ambient-glow" />
              <img
                src={activeHero.poster}
                alt={`${activeHero.title} poster`}
                className="hero-poster-img"
              />

              {/* Poster Card Overlay */}
              <div className="hero-poster-overlay">
                <button
                  className="hero-play-circle"
                  aria-label="Play Trailer"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (activeHero.trailerCode) {
                      window.open(`https://www.youtube.com/watch?v=${activeHero.trailerCode}`, "_blank");
                    } else {
                      setSelectedMovie(activeHero);
                    }
                  }}
                >
                  <Play size={24} className="play-icon-triangle" />
                </button>
                <span className="hero-watch-trailer-text">Watch Official Trailer</span>
              </div>

              {/* Bottom Card Info Strip */}
              <div className="hero-card-bottom-strip">
                <div className="hero-card-director">
                  <span className="director-label">Director</span>
                  <span className="director-name">{activeHero.director}</span>
                </div>
                <div className="hero-card-score">
                  <Star size={13} className="star-icon" />
                  <span>{activeHero.rating.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= QUICK GENRE BAR ================= */}
      <section className="section-container quick-genres-section">
        <div className="quick-genres-scroll">
          {GENRES_LIST.slice(1, 9).map((genre) => (
            <button
              key={genre}
              className="quick-genre-chip"
              onClick={() => navigate(`/explore?genre=${encodeURIComponent(genre)}`)}
            >
              <Clapperboard size={13} />
              <span>{genre}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ================= TRENDING MOVIES SECTION ================= */}
      <section className="section-container trending-section">
        <div className="section-header">
          <div className="section-title-wrap">
            <div className="section-badge badge-trending">
              <TrendingUp size={16} />
              <span>This Week</span>
            </div>
            <h2 className="section-title">Trending Movies</h2>
            <p className="section-subtitle">
              The hottest blockbusters and audience favorites making waves right now.
            </p>
          </div>

          <Link to="/explore" className="view-more-link">
            <span>View All</span>
            <ChevronRight size={18} />
          </Link>
        </div>

        <div className="movies-grid">
          {trendingMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onSelect={(m) => setSelectedMovie(m)}
            />
          ))}
        </div>
      </section>

      {/* ================= EXPLORE PROMO BANNER ================= */}
      <section className="section-container">
        <div className="promo-banner">
          <div className="promo-banner-content">
            <div className="promo-pill">
              <Sparkles size={14} />
              <span>Unlimited Entertainment</span>
            </div>
            <h2 className="promo-title">Looking for Something Specific?</h2>
            <p className="promo-desc">
              Filter through Sci-Fi, Crime, Animation, Drama and sort by highest IMDb
              ratings or latest release years.
            </p>
            <Link to="/explore" className="btn-primary promo-btn">
              <span>Explore All Movies</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= POPULAR MOVIES SECTION ================= */}
      <section className="section-container popular-section">
        <div className="section-header">
          <div className="section-title-wrap">
            <div className="section-badge badge-popular">
              <Flame size={16} />
              <span>All-Time Hits</span>
            </div>
            <h2 className="section-title">Popular & Critically Acclaimed</h2>
            <p className="section-subtitle">
              Timeless masterpieces and top rated crowd pleasers according to global audiences.
            </p>
          </div>

          <Link to="/explore" className="view-more-link">
            <span>View All</span>
            <ChevronRight size={18} />
          </Link>
        </div>

        <div className="movies-grid">
          {popularMovies.slice(0, 8).map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onSelect={(m) => setSelectedMovie(m)}
            />
          ))}
        </div>

        {/* View All Movies Big Button */}
        <div className="view-all-cta-wrap">
          <Link to="/explore" className="btn-primary btn-view-all-movies">
            <span>View All Movies ({MOVIES_DATA.length})</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

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
