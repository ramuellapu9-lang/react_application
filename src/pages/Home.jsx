import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";
import MovieSkeletonGrid from "../components/MovieSkeletonGrid";
import MovieModal from "../components/MovieModal";
import Pagination from "../components/Pagination";

function Home({ favorites, onFavorite }) {

    const [search, setSearch] = useState("");
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [selectedMovie, setSelectedMovie] = useState(null);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [currentQuery, setCurrentQuery] = useState("avengers");

    const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
    const RESULTS_PER_PAGE = 10;

    const fetchMovies = async (searchTerm, page = 1) => {

        if (!searchTerm.trim()) return;

        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(
                    searchTerm
                )}&type=movie&page=${page}`
            );
            const data = await response.json();

            if (data.Response === "True") {
                setMovies(data.Search);
                setTotalResults(parseInt(data.totalResults, 10) || 0);
                setCurrentQuery(searchTerm);
                setCurrentPage(page);
            } else {
                setMovies([]);
                setTotalResults(0);
                setError(data.Error);
            }

        } catch {
            setError("Unable to load movies.");
        } finally {
            setLoading(false);
        }
    };

    // Initial load
    useEffect(() => {
        fetchMovies("avengers", 1);
    }, []);

    // New search — reset to page 1
    const searchMovies = (term) => {
        const query = term ?? search;
        fetchMovies(query, 1);
    };

    // Page change — keep current query
    const handlePageChange = (page) => {
        fetchMovies(currentQuery, page);

        // Scroll to top of results for better UX
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    // OMDb caps results at 100 per query (10 pages)
    const totalPages = Math.min(
        Math.ceil(totalResults / RESULTS_PER_PAGE),
        10
    );

    return (
        <main>

            {/* Hero */}
            <section className="hero">
                <div className="hero-content">

                    <span className="hero-badge">
                        🎬 Discover • Search • Save
                    </span>

                    <h1>
                        Find Your Next
                        <span> Favorite Movie</span>
                    </h1>

                    <p>
                        Explore movies, discover something new,
                        and build your personal watchlist.
                    </p>

                    <SearchBar
                        search={search}
                        setSearch={setSearch}
                        onSearch={searchMovies}
                    />

                </div>
            </section>

            {/* Movies */}
            <section className="movies-section">

                <div className="section-header">
                    <div>
                        <span className="section-label">EXPLORE</span>
                        <h2>Discover Movies</h2>
                    </div>

                    {/* <span className="movie-count">
                        {loading
                            ? "Searching..."
                            : totalResults > 0
                            ? `${totalResults} results`
                            : `${movies.length} movies`}
                    </span> */}
                </div>

                {loading && <MovieSkeletonGrid count={RESULTS_PER_PAGE} />}

                {!loading && error && (
                    <div className="error">{error}</div>
                )}

                {!loading && !error && (
                    <>
                        <MovieList
                            movies={movies}
                            favorites={favorites}
                            onFavorite={onFavorite}
                            onSelect={setSelectedMovie}
                        />

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </>
                )}

            </section>

            {/* Modal */}
            {selectedMovie && (
                <MovieModal
                    movie={selectedMovie}
                    isFavorite={favorites.some(
                        (item) => item.imdbID === selectedMovie.imdbID
                    )}
                    onFavorite={onFavorite}
                    onClose={() => setSelectedMovie(null)}
                />
            )}

        </main>
    );
}

export default Home;