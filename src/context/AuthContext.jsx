import { createContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");

        return savedUser
            ? JSON.parse(savedUser)
            : null;
    });

    const login = (username, password) => {

        // Local practice authentication
        if (
            username === "admin" &&
            password === "1234"
        ) {
            const userData = {
                username: username
            };

            localStorage.setItem(
                "user",
                JSON.stringify(userData)
            );

            setUser(userData);

            return true;
        }

        return false;
    };

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                isAuthenticated: !!user
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;