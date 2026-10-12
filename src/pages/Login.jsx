import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!username.trim() || !password.trim()) {
            setError("Please fill in all fields.");
            return;
        }

        setLoading(true);

        // Simulate async login (if your login is sync, remove the timeout)
        const success = await Promise.resolve(login(username, password));

        setLoading(false);

        if (success) {
            navigate("/");
        } else {
            setError("Invalid username or password.");
        }
    };

    return (
        <div className="auth-page">

            {/* Left — Branding panel */}
            <div className="auth-visual">

                <Link to="/" className="auth-logo">
                    🎬 <span>CineHub</span>
                </Link>

                <div className="auth-visual-content">

                    <span className="auth-badge">🎥 Welcome back</span>

                    <h1>
                        Your next
                        <span> favorite movie</span>
                        awaits.
                    </h1>

                    <p>
                        Sign in to continue building your personal
                        watchlist and discover films you'll love.
                    </p>

                    <ul className="auth-features">
                        <li><span>❤️</span> Save unlimited movies</li>
                        <li><span>🔍</span> Search millions of titles</li>
                        <li><span>⭐</span> Track ratings & details</li>
                    </ul>

                </div>

                <div className="auth-visual-footer">
                    © {new Date().getFullYear()} CineVault
                </div>

            </div>


            {/* Right — Login form */}
            <div className="auth-form-panel">

                <div className="auth-card">

                    <div className="auth-card-header">
                        <h2>Sign in</h2>
                        <p>Enter your credentials to continue</p>
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form" noValidate>

                        {error && (
                            <div className="auth-error" role="alert">
                                ⚠️ {error}
                            </div>
                        )}

                        <div className="auth-field">
                            <label htmlFor="username">Username</label>
                            <div className="auth-input-wrapper">
                                <span className="auth-input-icon">👤</span>
                                <input
                                    id="username"
                                    type="text"
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    autoComplete="username"
                                    autoFocus
                                />
                            </div>
                        </div>

                        <div className="auth-field">
                            <label htmlFor="password">Password</label>
                            <div className="auth-input-wrapper">
                                <span className="auth-input-icon">🔒</span>
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    className="auth-toggle-password"
                                    onClick={() => setShowPassword((v) => !v)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                    tabIndex={-1}
                                >
                                    {showPassword ? "🙈" : "👁️"}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="auth-submit"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="auth-spinner" />
                                    Signing in...
                                </>
                            ) : (
                                <>Sign in →</>
                            )}
                        </button>

                    </form>

                    <div className="auth-footer">
                        Don't have an account?{" "}
                        <Link to="/signup">Create one</Link>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;