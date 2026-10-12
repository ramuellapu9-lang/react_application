function MovieSkeleton() {
    return (
        <div className="skeleton-card">
            <div className="skeleton-poster skeleton-shimmer" />
            <div className="skeleton-info">
                <div className="skeleton-line title skeleton-shimmer" />
                <div className="skeleton-line meta skeleton-shimmer" />
                <div className="skeleton-line button skeleton-shimmer" />
            </div>
        </div>
    );
}

export default MovieSkeleton;