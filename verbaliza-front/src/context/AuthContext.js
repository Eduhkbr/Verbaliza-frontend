import React, { createContext, useState, useContext } from 'react';
import { post } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('authToken'));
    const [user, setUser] = useState(null);

    const login = async (email, password) => {
        const response = await post('/login', { email, password });
        setUser(response.user);
        setToken(response.access_token);
        localStorage.setItem('authToken', response.access_token);
    };

    const register = async (name, email, password) => {
        await post('/register', { name, email, password });
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('authToken');
    };

    return (
        <AuthContext.Provider value={{ token, user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);