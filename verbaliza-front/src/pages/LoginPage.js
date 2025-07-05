import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './css/LoginPage.css';
import api from '../services/api';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { login } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [verificationMessage, setVerificationMessage] = useState('');
    const [showResend, setShowResend] = useState(false);
    const [resendStatus, setResendStatus] = useState({ message: '', error: false });

    useEffect(() => {
        if (searchParams.get('verified') === 'true') {
            setVerificationMessage('E-mail verificado com sucesso! Pode agora fazer o login.');
        }
    }, [searchParams]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setVerificationMessage('');
        setShowResend(false);
        setResendStatus({ message: '', error: false });

        try {
            // 1. Chama a função login do nosso contexto
            await login(email, password);

            // 2. Se o login for bem-sucedido (não houver erro), redireciona
            navigate('/dashboard');

        } catch (err) {
            if (err.response?.status === 403 && err.response?.data?.email_not_verified) {
                setError(err.response.data.message);
                setShowResend(true);
            } else {
                setError(err.response?.data?.message || 'Falha no login. Verifique suas credenciais.');
            }
        }
    };

    const handleResendVerificationEmail = async () => {
        setResendStatus({ message: 'Enviando...', error: false });
        try {
            await api.post('/email/verification-notification', { email });
            setResendStatus({ message: 'Um novo link de verificação foi enviado para o seu e-mail.', error: false });
            setShowResend(false);
        } catch (err) {
            setResendStatus({ message: 'Falha ao reenviar o e-mail. Tente novamente mais tarde.', error: true });
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="p-8 bg-white rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

                {/* Mensagem de sucesso da verificação da URL */}
                {verificationMessage && <p className="text-green-600 bg-green-100 p-3 rounded-lg text-center mb-4 text-sm">{verificationMessage}</p>}

                {/* Mensagem de erro principal (credenciais inválidas, etc.) */}
                {error && <p className="text-red-500 text-center mb-4 text-sm">{error}</p>}

                {/* Mensagem de status do reenvio do e-mail */}
                {resendStatus.message && <p className={`${resendStatus.error ? 'text-red-500' : 'text-green-600'} text-center mb-4 text-sm`}>{resendStatus.message}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                        <input className="w-full p-3 border rounded-lg" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2" htmlFor="password">Senha</label>
                        <input className="w-full p-3 border rounded-lg" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    </div>
                    <button type="submit" className="w-full bg-purple-600 text-white p-3 rounded-lg font-semibold hover:bg-purple-700">
                        Entrar
                    </button>
                </form>

                {/* Botão para reenviar a verificação */}
                {showResend && (
                    <div className="text-center mt-4">
                        <button onClick={handleResendVerificationEmail} className="text-purple-600 hover:underline font-semibold text-sm">
                            Reenviar e-mail de verificação
                        </button>
                    </div>
                )}

                <p className="text-center mt-4 text-sm">
                    Não tem uma conta? <Link to="/register" className="text-purple-600 hover:underline font-semibold">Registe-se</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;