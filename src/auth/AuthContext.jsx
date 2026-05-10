import { createContext, useContext, useEffect, useState } from "react";
import { getToken, removeToken, saveToken } from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const token = getToken();

        if (token) {
            setAuthenticated(true);
        }
    }, []);

    function login(token) {
        saveToken(token);
        setAuthenticated(true);
    }

    function logout() {
        removeToken();
        setAuthenticated(false);
    }

    return (
        <AuthContext.Provider
            value={{
                authenticated,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}