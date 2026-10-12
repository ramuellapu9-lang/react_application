import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

function MovieModal({ movie, isFavorite, onFavorite, onClose }) {

    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch full movie details (plot, cast, rating, runtime...)
    useEffect(() => {
        if (!movie) return;

        let cancelled = false;

        const fetchDetails = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    `https://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}&plot=full`
                );
                const data = await response.json();

                if (cancelled) return;

                if (data.Response === "True") {
                    setDetails(data);
                } else {
                    setError(data.Error || "Unable to load details.");
                }
            } catch {
                if (!cancelled) setError("Unable to load details.");
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        fetchDetails();

        return () => {
            cancelled = true;
        };
    }, [movie]);

    // Close on Escape
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleKey);

        // Lock scroll
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleKey);
            document.body.style.overflow = "";
        };
    }, [onClose]);

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    const poster =
        (details?.Poster && details.Poster !== "N/A")
            ? details.Poster
            : movie.Poster !== "N/A"
            ? movie.Poster
            : "https://via.placeholder.com/300x450?text=No+Poster";

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">

                <button
                    className="modal-close"
                    onClick={onClose}
                    aria-label="Close"
                >
                    ✕
                </button>

                {loading && (
                    <div className="modal-loading">
                        Loading details...
                    </div>
                )}

                {error && (
                    <div className="modal-loading" style={{ color: "#f87171" }}>
                        {error}
                    </div>
                )}

                {!loading && !error && details && (
                    <div className="modal-body">

                        <div className="modal-poster">
                            <img src={poster} alt={details.Title} />
                        </div>

                        <div className="modal-details">

                            <h2>{details.Title}</h2>

                            {details.Tagline && details.Tagline !== "N/A" && (
                                <p className="modal-tagline">
                                    “{details.Tagline}”
                                </p>
                            )}

                            <div className="modal-chips">
                                {details.imdbRating && details.imdbRating !== "N/A" && (
                                    <span className="chip rating">
                                        ⭐ {details.imdbRating} / 10
                                    </span>
                                )}
                                {details.Year && details.Year !== "N/A" && (
                                    <span className="chip">{details.Year}</span>
                                )}
                                {details.Rated && details.Rated !== "N/A" && (
                                    <span className="chip">{details.Rated}</span>
                                )}
                                {details.Runtime && details.Runtime !== "N/A" && (
                                    <span className="chip">{details.Runtime}</span>
                                )}
                                {details.Genre && details.Genre !== "N/A" &&
                                    details.Genre.split(", ").map((g) => (
                                        <span className="chip" key={g}>{g}</span>
                                    ))
                                }
                            </div>

                            {details.Plot && details.Plot !== "N/A" && (
                                <p className="modal-plot">{details.Plot}</p>
                            )}

                            <div className="modal-meta-grid">
                                {details.Director && details.Director !== "N/A" && (
                                    <div className="meta-item">
                                        <span className="meta-label">Director</span>
                                        <span className="meta-value">{details.Director}</span>
                                    </div>
                                )}
                                {details.Actors && details.Actors !== "N/A" && (
                                    <div className="meta-item">
                                        <span className="meta-label">Cast</span>
                                        <span className="meta-value">{details.Actors}</span>
                                    </div>
                                )}
                                {details.Released && details.Released !== "N/A" && (
                                    <div className="meta-item">
                                        <span className="meta-label">Released</span>
                                        <span className="meta-value">{details.Released}</span>
                                    </div>
                                )}
                                {details.Country && details.Country !== "N/A" && (
                                    <div className="meta-item">
                                        <span className="meta-label">Country</span>
                                        <span className="meta-value">{details.Country}</span>
                                    </div>
                                )}
                            </div>

                            <div className="modal-actions">
                                <button
                                    className={`wishlist-button ${isFavorite ? "remove" : ""}`}
                                    onClick={() => onFavorite(details)}
                                >
                                    {isFavorite
                                        ? "❤️ Remove from Wishlist"
                                        : "🤍 Add to Wishlist"}
                                </button>
                            </div>

                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}

export default MovieModal;