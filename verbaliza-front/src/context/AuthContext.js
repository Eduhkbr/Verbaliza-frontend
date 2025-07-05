import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('authToken'));
    const [user, setUser] = useState(null);

    const login = async (email, password) => {
        const response = await api.post('/login', { email, password });
        const { user, access_token: apiToken } = response.data;

        setUser(user);
        setToken(apiToken);
        localStorage.setItem('authToken', apiToken);
        api.defaults.headers.common['Authorization'] = `Bearer ${apiToken}`;
    };

    const register = async (name, email, password) => {
        await api.post('/register', { name, email, password, password_confirmation: password });
    };

    const logout = () => {
        // Limpa o estado e o localStorage
        api.post('/logout').finally(() => {
            setUser(null);
            setToken(null);
            localStorage.removeItem('authToken');
            delete api.defaults.headers.common['Authorization'];
        });
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
            api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        }
    }, []);


    return (
        <AuthContext.Provider value={{ token, user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);