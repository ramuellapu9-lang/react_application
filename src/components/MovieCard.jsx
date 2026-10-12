function MovieCard({
    movie,
    isFavorite,
    onFavorite,
    onSelect
}) {

    const poster =
        movie.Poster !== "N/A"
            ? movie.Poster
            : "https://via.placeholder.com/300x450?text=No+Poster";

    const handleFavoriteClick = (e) => {
        e.stopPropagation(); // don't open modal
        onFavorite(movie);
    };

    const handleCardClick = () => {
        onSelect?.(movie);
    };

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
        >

            <div className="movie-poster">

                <img src={poster} alt={movie.Title} loading="lazy" />

                <button
                    className={`favorite-button ${isFavorite ? "favorited" : ""}`}
                    onClick={handleFavoriteClick}
                    title={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
                    aria-label="Toggle favorite"
                >
                    {isFavorite ? "❤️" : "🤍"}
                </button>

            </div>

            <div className="movie-info">

                <h3 title={movie.Title}>{movie.Title}</h3>

                <div className="movie-meta">
                    <span>{movie.Year}</span>
                    <span className="dot">•</span>
                    <span>{movie.Type}</span>
                </div>

                <button
                    className={`wishlist-button ${isFavorite ? "remove" : ""}`}
                    onClick={handleFavoriteClick}
                >
                    {isFavorite ? "Remove from Wishlist" : "Add to Wishlist"}
                </button>

            </div>

        </article>
    );
}

export default MovieCard;