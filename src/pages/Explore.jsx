import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Search,
  Filter,
  ArrowUpDown,
  RotateCcw,
  Film,
  Sparkles,
  Calendar,
  XCircle,
  Clapperboard
} from "lucide-react";
import { MOVIES_DATA, GENRES_LIST } from "../data/movies";
import { MovieCard } from "../components/MovieCard";
import { MovieModal } from "../components/MovieModal";

export const Explore = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Search input state
  const [searchQuery, setSearchQuery] = useState("");

  // Selected genre state (initialized from URL if present)
  const initialGenre = searchParams.get("genre") || "All";
  const [selectedGenre, setSelectedGenre] = useState(initialGenre);

  // Sorting state: 'rating-desc', 'rating-asc', 'year-desc', 'year-asc', 'title-asc'
  const [sortBy, setSortBy] = useState("rating-desc");

  // Release year filter state: 'all', '2020s', '2010s', 'classic'
  const [yearFilter, setYearFilter] = useState("all");

  // Selected movie for modal
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Sync state if URL query param changes
  useEffect(() => {
    const genreParam = searchParams.get("genre");
    if (genreParam && GENRES_LIST.includes(genreParam)) {
      setSelectedGenre(genreParam);
    }
  }, [searchParams]);

  // Handle Genre selection
  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
    if (genre === "All") {
      searchParams.delete("genre");
      setSearchParams(searchParams);
    } else {
      setSearchParams({ genre });
    }
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedGenre("All");
    setSortBy("rating-desc");
    setYearFilter("all");
    setSearchParams({});
  };

  const isFiltered =
    searchQuery.trim() !== "" ||
    selectedGenre !== "All" ||
    sortBy !== "rating-desc" ||
    yearFilter !== "all";

  // Filter and sort movies dynamically
  const filteredMovies = useMemo(() => {
    return MOVIES_DATA.filter((movie) => {
      // Search by title (case-insensitive)
      const matchesSearch = movie.title
        .toLowerCase()
        .includes(searchQuery.trim().toLowerCase());

      // Genre filter
      const matchesGenre =
        selectedGenre === "All" ||
        (movie.genres && movie.genres.includes(selectedGenre));

      // Year filter
      let matchesYear = true;
      if (yearFilter === "2020s") {
        matchesYear = movie.year >= 2020;
      } else if (yearFilter === "2010s") {
        matchesYear = movie.year >= 2010 && movie.year <= 2019;
      } else if (yearFilter === "classic") {
        matchesYear = movie.year < 2010;
      }

      return matchesSearch && matchesGenre && matchesYear;
    }).sort((a, b) => {
      if (sortBy === "rating-desc") {
        return b.rating - a.rating;
      } else if (sortBy === "rating-asc") {
        return a.rating - b.rating;
      } else if (sortBy === "year-desc") {
        return b.year - a.year;
      } else if (sortBy === "year-asc") {
        return a.year - b.year;
      } else if (sortBy === "title-asc") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  }, [searchQuery, selectedGenre, sortBy, yearFilter]);

  return (
    <div className="explore-page-container">
      {/* Page Header */}
      <section className="explore-hero-header">
        <div className="explore-header-content">
          <div className="explore-badge">
            <Film size={15} />
            <span>Movie Catalog</span>
          </div>
          <h1 className="explore-page-title">Explore Movies</h1>
          <p className="explore-page-desc">
            Search our curated archive of acclaimed cinematic masterpieces, filter by your
            favorite genre, and sort by rating or release year.
          </p>
        </div>
      </section>

      <div className="section-container explore-main-content">
        {/* Controls Toolbar: Search & Sort & Clear */}
        <div className="explore-toolbar">
          {/* Search Bar */}
          <div className="search-input-wrapper">
            <Search className="search-icon" size={19} />
            <input
              type="text"
              className="search-input"
              placeholder="Search movies by title (e.g. Dune, Inception, Batman)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search movies by title"
            />
            {searchQuery && (
              <button
                className="search-clear-btn"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search text"
              >
                <XCircle size={18} />
              </button>
            )}
          </div>

          {/* Controls Right: Year Filter & Sort By Dropdown */}
          <div className="toolbar-controls-right">
            {/* Release Year Dropdown */}
            <div className="select-wrapper">
              <Calendar size={16} className="select-icon" />
              <select
                className="filter-select"
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                aria-label="Filter by release year era"
              >
                <option value="all">All Release Years</option>
                <option value="2020s">New Releases (2020 - Present)</option>
                <option value="2010s">2010s Hits (2010 - 2019)</option>
                <option value="classic">Cinema Classics (Pre-2010)</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="select-wrapper">
              <ArrowUpDown size={16} className="select-icon" />
              <select
                className="filter-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort movies by"
              >
                <option value="rating-desc">Highest Rating</option>
                <option value="rating-asc">Lowest Rating</option>
                <option value="year-desc">Newest Release Year</option>
                <option value="year-asc">Oldest Release Year</option>
                <option value="title-asc">Title: A to Z</option>
              </select>
            </div>

            {/* Clear Filters Button */}
            {isFiltered && (
              <button
                className="btn-clear-filters"
                onClick={handleClearFilters}
                title="Reset all filters"
              >
                <RotateCcw size={15} />
                <span>Clear Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Genre Pill Filter Row */}
        <div className="genre-filter-container">
          <div className="genre-filter-label">
            <Filter size={15} />
            <span>Genre:</span>
          </div>
          <div className="genre-pills-list">
            {GENRES_LIST.map((genre) => (
              <button
                key={genre}
                className={`genre-filter-pill ${selectedGenre === genre ? "genre-filter-active" : ""}`}
                onClick={() => handleGenreClick(genre)}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter and Active Filter tags */}
        <div className="results-summary-row">
          <span className="results-count">
            Showing <strong>{filteredMovies.length}</strong> of{" "}
            <strong>{MOVIES_DATA.length}</strong> movies
          </span>

          {isFiltered && (
            <div className="active-tag-pills">
              {searchQuery && (
                <span className="active-tag">
                  Keyword: "{searchQuery}"
                  <button onClick={() => setSearchQuery("")}>&times;</button>
                </span>
              )}
              {selectedGenre !== "All" && (
                <span className="active-tag">
                  Genre: {selectedGenre}
                  <button onClick={() => handleGenreClick("All")}>&times;</button>
                </span>
              )}
              {yearFilter !== "all" && (
                <span className="active-tag">
                  Era: {yearFilter}
                  <button onClick={() => setYearFilter("all")}>&times;</button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Movies Grid or Empty State */}
        {filteredMovies.length > 0 ? (
          <div className="movies-grid">
            {filteredMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onSelect={(m) => setSelectedMovie(m)}
              />
            ))}
          </div>
        ) : (
          <div className="empty-results-state">
            <div className="empty-results-icon-wrap">
              <Clapperboard size={48} className="empty-icon" />
            </div>
            <h3 className="empty-results-title">No Movies Found</h3>
            <p className="empty-results-desc">
              We couldn't find any movie matching "{searchQuery || selectedGenre}". Try
              checking your spelling, picking a different genre, or clearing your filters.
            </p>
            <button className="btn-primary empty-reset-btn" onClick={handleClearFilters}>
              <RotateCcw size={16} />
              <span>Reset All Filters</span>
            </button>
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
