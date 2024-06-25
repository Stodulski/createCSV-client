import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const expirationTime = localStorage.getItem("expirationTime");

        if (token && expirationTime) {
            const expirationTimeInt = parseInt(expirationTime, 10);
            if (new Date().getTime() < expirationTimeInt) {
                setIsAuthenticated(true);
            } else {
                localStorage.removeItem("token");
                localStorage.removeItem("expirationTime");
                setIsAuthenticated(false);
            }
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
