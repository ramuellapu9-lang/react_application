import { useEffect, useState } from "react";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";
import Test from "./pages/Test";

function App() {

    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem("favorites");

        return saved
            ? JSON.parse(saved)
            : [];
    });
   const onTestingFunction =()=>{
        return "hello";
    }
    useEffect(() => {
        localStorage.setItem(
            "favorites",
            JSON.stringify(favorites)
        );
    }, [favorites]);

    const handleFavorite = (movie) => {

        setFavorites((previousFavorites) => {

            const exists = previousFavorites.some(
                (item) => item.imdbID === movie.imdbID
            );

            if (exists) {
                return previousFavorites.filter(
                    (item) => item.imdbID !== movie.imdbID
                );
            }

            return [
                ...previousFavorites,
                movie
            ];
        });
    };

    return (
        <ThemeProvider>

            <AuthProvider>

                <BrowserRouter>

                    <Navbar
                        favoritesCount={favorites.length}
                    />

                    <Routes>

                        {/* Login */}
                        <Route
                            path="/login"
                            element={<Login />}
                        />

                        {/* Home */}
                        <Route
                            path="/"
                            element={
                                <ProtectedRoute>
                                    <Home
                                        favorites={favorites}
                                        onFavorite={handleFavorite}
                                    />
                                </ProtectedRoute>
                            }
                        />

                        {/* Favorites */}
                        <Route
                            path="/favorites"
                            element={
                                <ProtectedRoute>
                                    <Favorites
                                        favorites={favorites}
                                        onFavorite={handleFavorite}
                                    />
                                </ProtectedRoute>
                            }
                        />

                        {/* Test */}
                        <Route
                            path="/test"
                            element={
                                <Test
                                    test="hello222"
                                    onTestingFunction={onTestingFunction}
                                    favorites={favorites}
                                />
                            }
                        />

                    </Routes>

                </BrowserRouter>

            </AuthProvider>

        </ThemeProvider>
    );
}

export default App;


// import { useEffect, useState } from "react";

// function App() {
//     const [message, setMessage] = useState("");

//     useEffect(() => {
//         fetch("http://localhost:8080/api/hello")
//             .then(response => response.text())
//             .then(data => {
//                 setMessage(data);
//             })
//             .catch(error => {
//                 console.error("API Error:", error);
//             });
//     }, []);

//     return (
//         <div>
//             <h1>React Application</h1>

//             <p>{message}</p>
//         </div>
//     );
// }

// export default App;