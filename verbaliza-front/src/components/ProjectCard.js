import React from 'react';

// Componente Card reutilizado da pré-visualização
const Card = ({ children, className = '' }) => (
    <div className={`bg-white dark:bg-gray-800/50 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden ${className}`}>
        {children}
    </div>
);

const ProjectCard = ({ project }) => {
    // Calcula a percentagem do progresso, garantindo que não ultrapasse 100%
    const progressPercentage = Math.min(100, Math.round((project.word_count / project.word_count_goal) * 100));

    // Formata a data de atualização (lógica a ser implementada)
    const lastUpdate = new Date(project.updated_at).toLocaleDateString('pt-BR', {
        day: 'numeric', month: 'short'
    });

    const handleSelectProject = () => {
        // Futuramente, navegará para o editor do projeto específico
        // navigate(`/editor/${project.id}`);
        alert(`Abrindo projeto: ${project.title}`);
    };

    return (
        <Card>
            <div className="p-6">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm font-medium text-purple-600 dark:text-purple-400">{project.genre || 'Sem Gênero'}</p>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-1 cursor-pointer hover:text-purple-600" onClick={handleSelectProject}>
                            {project.title}
                        </h2>
                    </div>
                    <div className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full whitespace-nowrap">
                        {lastUpdate}
                    </div>
                </div>
                <div className="mt-4">
                    <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-1">
                        <span>Progresso</span>
                        <span>{progressPercentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                    </div>
                    <div className="text-right text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {(project.word_count || 0).toLocaleString()} / {(project.word_count_goal || 0).toLocaleString()} palavras
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default ProjectCard;