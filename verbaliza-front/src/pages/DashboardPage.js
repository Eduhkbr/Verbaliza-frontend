function DashboardPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Painel de Projetos</h1>
            <p className="text-gray-500 mb-8">Bem-vindo de volta!</p>
            {/* Aqui entrará a lista de projetos vinda da API */}
            <div className="p-10 border-2 border-dashed border-gray-300 rounded-xl text-center">
                <p className="text-gray-500">Os seus projetos aparecerão aqui.</p>
            </div>
        </div>
    );
}