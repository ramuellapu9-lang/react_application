import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Signup() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Validation
        if (!username.trim() || !password.trim() || !confirm.trim()) {
            setError("Please fill in all fields.");
            return;
        }

        if (username.trim().length < 3) {
            setError("Username must be at least 3 characters.");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        if (password !== confirm) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);
        const result = await Promise.resolve(signup(username.trim(), password));
        setLoading(false);

        if (result.success) {
            navigate("/");
        } else {
            setError(result.message || "Unable to create account.");
        }
    };

    return (
        <div className="auth-page">

            {/* Left — Branding panel */}
            <div className="auth-visual">

                <Link to="/" className="auth-logo">
                    🎬 <span>CineVault</span>
                </Link>

                <div className="auth-visual-content">

                    <span className="auth-badge">✨ Join the club</span>

                    <h1>
                        Create your
                        <span> CineVault </span>
                        account.
                    </h1>

                    <p>
                        Save movies, build your watchlist, and never
                        forget what to watch next.
                    </p>

                    <ul className="auth-features">
                        <li><span>🎬</span> Instant access to your library</li>
                        <li><span>❤️</span> Sync wishlist across devices</li>
                        <li><span>🔒</span> Secure, local-first storage</li>
                    </ul>

                </div>

                <div className="auth-visual-footer">
                    © {new Date().getFullYear()} CineVault
                </div>

            </div>


            {/* Right — Signup form */}
            <div className="auth-form-panel">

                <div className="auth-card">

                    <div className="auth-card-header">
                        <h2>Create account</h2>
                        <p>Fill in the details to get started</p>
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
                                    placeholder="Choose a username"
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
                                    placeholder="At least 6 characters"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="new-password"
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

                        <div className="auth-field">
                            <label htmlFor="confirm">Confirm password</label>
                            <div className="auth-input-wrapper">
                                <span className="auth-input-icon">🔒</span>
                                <input
                                    id="confirm"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Re-enter your password"
                                    value={confirm}
                                    onChange={(e) => setConfirm(e.target.value)}
                                    autoComplete="new-password"
                                />
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
                                    Creating account...
                                </>
                            ) : (
                                <>Create account →</>
                            )}
                        </button>

                    </form>

                    <div className="auth-footer">
                        Already have an account?{" "}
                        <Link to="/login">Sign in</Link>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default Signup;