import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => localStorage.getItem('authToken'));
    const [loading, setLoading] = useState(true);

    const login = async (email, password) => {
        try {
            const response = await api.post('/login', { email, password });
            const { user: loggedUser, access_token: apiToken } = response.data;

            localStorage.setItem('authToken', apiToken);
            setToken(apiToken);
            setUser(loggedUser);
            api.defaults.headers.common['Authorization'] = `Bearer ${apiToken}`;
        } catch (error) {
        }
    };

    const register = async (name, email, password) => {
        await api.post('/register', { name, email, password, password_confirmation: password });
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setToken(null);
        setUser(null);
        delete api.defaults.headers.common['Authorization'];
    };

    useEffect(() => {
        const loadStoredToken = () => {
            const storedToken = localStorage.getItem('authToken');
            if (storedToken) {
                setToken(storedToken);
                api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
            } else {
            }
            setLoading(false);
        };

        loadStoredToken();
    }, []);


    return (
        <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);