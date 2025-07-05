function RegisterPage() {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="p-8 bg-white rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Criar Conta</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="name">Nome</label>
                        <input className="w-full p-3 border rounded-lg" type="text" id="name" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                        <input className="w-full p-3 border rounded-lg" type="email" id="email" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2" htmlFor="password">Palavra-passe</label>
                        <input className="w-full p-3 border rounded-lg" type="password" id="password" />
                    </div>
                    <button className="w-full bg-purple-600 text-white p-3 rounded-lg font-semibold hover:bg-purple-700">
                        Registar
                    </button>
                </form>
            </div>
        </div>
    );
}