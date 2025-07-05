import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './css/DashboardPage.css';

const DashboardPage = () => {
    const [projects, setProjects] = useState([]);
    const [newProjectTitle, setNewProjectTitle] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const response = await api.get('/projects');
            setProjects(response.data);
            setError(null);
        } catch (err) {
            setError('Não foi possível carregar seus projetos.');
            console.error("Erro ao buscar projetos:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleCreateProject = async (e) => {
        e.preventDefault();
        if (!newProjectTitle.trim()) return;

        try {
            const response = await api.post('/projects', { title: newProjectTitle });
            setProjects([...projects, response.data]);
            setNewProjectTitle('');
            setError(null);
        } catch (err) {
            setError('Não foi possível criar o projeto. Tente novamente.');
            console.error("Erro ao criar projeto:", err);
        }
    };

    if (loading) {
        return <div className="dashboard-container"><h2>Carregando projetos...</h2></div>;
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h2>Meus Projetos</h2>
                <form onSubmit={handleCreateProject} className="create-project-form">
                    <input
                        type="text"
                        value={newProjectTitle}
                        onChange={(e) => setNewProjectTitle(e.target.value)}
                        placeholder="O título da sua próxima obra..."
                        aria-label="Título do novo projeto"
                    />
                    <button type="submit">Criar Novo Projeto</button>
                </form>
            </div>

            {error && <p className="error-message">{error}</p>}

            <div className="project-list">
                {projects.length > 0 ? (
                    projects.map((project) => (
                        <div key={project.id} className="project-card">
                            <h3>{project.title}</h3>
                        </div>
                    ))
                ) : (
                    !error && <p>Você ainda não tem projetos. Que tal criar o primeiro agora?</p>
                )}
            </div>
        </div>
    );
};

export default DashboardPage;