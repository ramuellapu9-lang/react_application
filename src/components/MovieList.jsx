import MovieCard from "./MovieCard";

function MovieList({
    movies,
    favorites,
    onFavorite,
    onSelect
}) {

    if (movies.length === 0) {
        return (
            <div className="empty-state">
                <div className="empty-icon">🎬</div>
                <h3>
                    {favorites.length === 0
                        ? "No favorites yet"
                        : "No movies found"}
                </h3>
                <p>
                    {favorites.length === 0
                        ? "Start adding movies to your wishlist."
                        : "Try searching for another movie."}
                </p>
            </div>
        );
    }

    return (
        <div className="movie-grid">
            {movies.map((movie) => (
                <MovieCard
                    key={movie.imdbID}
                    movie={movie}
                    isFavorite={favorites.some(
                        (item) => item.imdbID === movie.imdbID
                    )}
                    onFavorite={onFavorite}
                    onSelect={onSelect}
                />
            ))}
        </div>
    );
}

export default MovieList;