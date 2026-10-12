import { useEffect, useState } from "react";
import MovieList from "../components/MovieList";
import MovieModal from "../components/MovieModal";
import Pagination from "../components/Pagination";

const ITEMS_PER_PAGE = 8;

function Favorites({ favorites, onFavorite }) {

    const [selectedMovie, setSelectedMovie] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.max(
        1,
        Math.ceil(favorites.length / ITEMS_PER_PAGE)
    );

    // Reset to page 1 when list shrinks (e.g., item removed on last page)
    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [favorites.length, currentPage, totalPages]);

    // Slice the current page's items
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const pageItems = favorites.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="favorites-page">

            <div className="favorites-header">
                <h1>My Wishlist ❤️</h1>
                <p>
                    {favorites.length === 0
                        ? "Your watchlist is waiting to be filled."
                        : `${favorites.length} ${
                              favorites.length === 1 ? "movie" : "movies"
                          } saved to your collection.`}
                </p>
            </div>

            <MovieList
                movies={pageItems}
                favorites={favorites}
                onFavorite={onFavorite}
                onSelect={setSelectedMovie}
            />

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />

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

        </div>
    );
}

export default Favorites;