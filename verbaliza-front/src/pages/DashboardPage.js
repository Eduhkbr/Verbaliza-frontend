import React, { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import api from '../services/api';
import ProjectCard from '../components/ProjectCard';

const DashboardPage = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await api.get('/projects');
                setProjects(response.data);
            } catch (err) {
                setError('Não foi possível carregar os seus projetos. Tente recarregar a página.');
                console.error("Erro ao buscar projetos:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const handleNewProject = () => {
        alert("Funcionalidade 'Novo Projeto' a ser implementada.");
    };

    if (loading) {
        return (
            <div className="p-8">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Painel de Projetos</h1>
                <p className="text-gray-500 dark:text-gray-400 mb-8">A carregar os seus projetos...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Oops!</h1>
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Painel de Projetos</h1>
            <p className="text-gray-500 dark:text-gray-400 mb-8">Bem-vindo de volta! Continue de onde parou.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map(project => (
                    <ProjectCard key={project.id} project={project} />
                ))}

                <button
                    onClick={handleNewProject}
                    className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors duration-300 text-gray-500 dark:text-gray-400"
                >
                    <PlusCircle className="w-12 h-12 mb-2" />
                    <span className="font-semibold">Novo Projeto</span>
                </button>
            </div>
        </div>
    );
};

export default DashboardPage;