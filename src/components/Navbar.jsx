import { Link, NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../hooks/useAuth";

function Navbar({ favoritesCount }) {

    const {
        user,
        logout,
        isAuthenticated
    } = useAuth();

    return (
        <header className="navbar">
            <div className="navbar-container">

                <Link to="/" className="logo">
                    🎬 <span>CineHub</span>
                </Link>

                <nav className="nav-links">
            {isAuthenticated && (
                        <>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive
                                ? "nav-link active"
                                : "nav-link"
                        }
                    >
                        🎬
                        <span className="nav-label">Movies</span>
                    </NavLink>

                    <NavLink
                        to="/favorites"
                        className={({ isActive }) =>
                            isActive
                                ? "nav-link active"
                                : "nav-link"
                        }
                    >
                        ❤️
                        <span className="nav-label">
                            Watchlist
                        </span>

                        <span className="favorite-count">
                            {favoritesCount}
                        </span>
                    </NavLink>
                            <span>
                                Welcome {user.username}
                            </span>

                            <button className="logout-button " onClick={logout}>
                                Logout
                            </button>
                        </>
                    )}

                    <ThemeToggle />

                </nav>

            </div>
        </header>
    );
}

export default Navbar;