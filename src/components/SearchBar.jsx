import { useEffect, useState } from "react";

function SearchBar({ search, setSearch, onSearch }) {

    const [debouncedSearch, setDebouncedSearch] = useState(search);

    // Debounce: run search 500ms after user stops typing
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);

    // Trigger search when debounced value changes
    useEffect(() => {
        if (debouncedSearch.trim()) {
            onSearch(debouncedSearch);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Immediate search on submit (bypass debounce)
        onSearch(search);
    };

    return (
        <form className="search-form" onSubmit={handleSubmit}>

            <div className="search-input-wrapper">
                <span className="search-icon">🔍</span>
                <input
                    type="text"
                    placeholder="Search for a movie..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    autoComplete="off"
                />
            </div>

            <button type="submit" className="search-button">
                Search
            </button>

        </form>
    );
}

export default SearchBar;