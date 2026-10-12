import MovieSkeleton from "./MovieSkeleton";

function MovieSkeletonGrid({ count = 10 }) {
    return (
        <div className="movie-grid">
            {Array.from({ length: count }).map((_, i) => (
                <MovieSkeleton key={i} />
            ))}
        </div>
    );
}

export default MovieSkeletonGrid;