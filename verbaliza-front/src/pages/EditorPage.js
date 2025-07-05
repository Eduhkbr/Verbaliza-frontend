import { useParams } from 'react-router-dom';

function EditorPage() {
    const { projectId } = useParams();
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Editor</h1>
            <p className="text-gray-500 mb-8">A editar o projeto: {projectId}</p>
            <div className="w-full h-96 bg-white rounded-xl shadow-md p-4">
                <textarea className="w-full h-full resize-none border-none focus:ring-0" placeholder="Comece a escrever..."></textarea>
            </div>
        </div>
    );
}