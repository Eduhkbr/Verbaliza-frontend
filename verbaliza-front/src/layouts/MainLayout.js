import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Book, Users, Map, PencilRuler, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const NavItem = ({ to, icon: Icon, label, onClick }) => (
    <NavLink
        to={to}
        onClick={onClick}
        className={({ isActive }) =>
            `flex items-center p-3 my-1 font-medium rounded-lg cursor-pointer transition-colors ${
                isActive && !onClick ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-600 hover:bg-gray-200'
            }`
        }
    >
        <Icon size={20} />
        <span className="ml-3">{label}</span>
    </NavLink>
);

export default function MainLayout() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            <aside className="w-64 flex-shrink-0 bg-white shadow-xl flex flex-col">
                <div className="flex items-center p-4 h-20 border-b border-gray-200">
                    <PencilRuler className="text-purple-600" size={24}/>
                    <span className="text-xl font-bold ml-2 text-gray-800">Estúdio</span>
                </div>
                <nav className="flex-1 px-3 py-4">
                    <ul>
                        <NavItem to="/dashboard" icon={LayoutDashboard} label="Painel" />
                        <NavItem to="/project/1/editor" icon={Book} label="Editor" />
                        <NavItem to="/characters" icon={Users} label="Personagens" />
                        <NavItem to="/world" icon={Map} label="Mundo" />
                    </ul>
                </nav>
                <div className="px-3 py-4 border-t border-gray-200">
                    <div onClick={handleLogout} className="flex items-center p-3 my-1 font-medium rounded-lg cursor-pointer transition-colors text-gray-600 hover:bg-gray-200">
                        <LogOut size={20} />
                        <span className="ml-3">Sair</span>
                    </div>
                </div>
            </aside>
            <main className="flex-1 overflow-y-auto p-8">
                <Outlet />
            </main>
        </div>
    );
}