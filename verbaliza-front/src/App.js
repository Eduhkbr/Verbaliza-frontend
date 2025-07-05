import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';
import DashboardPage from './pages/DashboardPage';
import EditorPage from './pages/EditorPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function PrivateRoute() {
    const { token } = useAuth();
    return token ? <MainLayout /> : <Navigate to="/login" />;
}

function AppRoutes() {
    const { token, loading } = useAuth();
    if (loading) {
        return <div className="flex justify-center items-center h-screen">A carregar aplicação...</div>;
    }

    return (
        <Routes>
            <Route path="/login" element={!token ? <LoginPage /> : <Navigate to="/dashboard" />} />
            <Route
                path="/register"
                element={
                    !token ? (
                        <RegisterPage />
                    ) : (
                        <Navigate to="/dashboard" />
                    )
                }
            />
            <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/editor/:projectId" element={<EditorPage />} />
            </Route>

            <Route path="*" element={<Navigate to={token ? "/dashboard" : "/login"} />} />
        </Routes>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </AuthProvider>
    );
}