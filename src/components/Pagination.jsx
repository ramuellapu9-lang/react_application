function Pagination({ currentPage, totalPages, onPageChange }) {

    if (totalPages <= 1) return null;

    // Build a smart range with ellipsis
    const getPageNumbers = () => {
        const pages = [];
        const delta = 1; // how many pages to show around current

        // Always show first page
        pages.push(1);

        // Add "..." if gap between 1 and current-delta
        if (currentPage - delta > 2) {
            pages.push("...");
        }

        // Add middle pages around current
        for (
            let i = Math.max(2, currentPage - delta);
            i <= Math.min(totalPages - 1, currentPage + delta);
            i++
        ) {
            pages.push(i);
        }

        // Add "..." if gap between current+delta and last page
        if (currentPage + delta < totalPages - 1) {
            pages.push("...");
        }

        // Always show last page
        if (totalPages > 1) {
            pages.push(totalPages);
        }

        return pages;
    };

    const pages = getPageNumbers();

    const goTo = (page) => {
        if (page < 1 || page > totalPages || page === currentPage) return;
        onPageChange(page);
    };

    return (
        <nav className="pagination" aria-label="Pagination">

            <button
                className="pagination-btn"
                onClick={() => goTo(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
            >
                ← Prev
            </button>

            <div className="pagination-pages">
                {pages.map((page, idx) =>
                    page === "..." ? (
                        <span
                            key={`ellipsis-${idx}`}
                            className="pagination-ellipsis"
                        >
                            …
                        </span>
                    ) : (
                        <button
                            key={page}
                            className={`pagination-page ${
                                page === currentPage ? "active" : ""
                            }`}
                            onClick={() => goTo(page)}
                            aria-label={`Go to page ${page}`}
                            aria-current={page === currentPage ? "page" : undefined}
                        >
                            {page}
                        </button>
                    )
                )}
            </div>

            <button
                className="pagination-btn"
                onClick={() => goTo(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
            >
                Next →
            </button>

        </nav>
    );
}

export default Pagination;