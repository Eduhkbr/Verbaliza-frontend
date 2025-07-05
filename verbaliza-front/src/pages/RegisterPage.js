import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { register } = useAuth();
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await register(name, email, password);
            setRegistrationSuccess(true);
        } catch (err) {
            setError('Falha no registo. Verifique os seus dados (a password deve ter no mínimo 8 caracteres).');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="p-8 bg-white rounded-xl shadow-lg w-full max-w-md">
                {registrationSuccess ? (
                    <div>
                        <h2 className="text-2xl font-bold text-center mb-4">Registo Concluído!</h2>
                        <p className="text-center text-gray-700">
                            Enviámos um link de verificação para o seu e-mail. Por favor, clique no link para ativar a sua conta antes de fazer o login.
                        </p>
                        <div className="text-center mt-6">
                            <Link to="/login" className="text-purple-600 hover:underline font-semibold">
                                Voltar para o Login
                            </Link>
                        </div>
                    </div>
                ) : (
                    <>
                        <h2 className="text-2xl font-bold text-center mb-6">Criar Conta</h2>
                        {error && <p className="text-red-500 text-center mb-4 text-sm">{error}</p>}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2" htmlFor="name">Nome</label>
                                <input className="w-full p-3 border rounded-lg" type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required/>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                                <input className="w-full p-3 border rounded-lg" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 mb-2" htmlFor="password">Senha</label>
                                <input className="w-full p-3 border rounded-lg" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength="8"/>
                            </div>
                            <button type="submit" className="w-full bg-purple-600 text-white p-3 rounded-lg font-semibold hover:bg-purple-700">
                                Registar
                            </button>
                        </form>
                        <p className="text-center mt-4 text-sm">
                            Já tem uma conta? <Link to="/login" className="text-purple-600 hover:underline font-semibold">Faça login</Link>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}