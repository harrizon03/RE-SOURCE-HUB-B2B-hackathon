import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Plus, Database, Settings, LogOut } from 'lucide-react';

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, clear auth tokens here
    navigate('/login');
  };

  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/data', icon: Database, label: 'Data Explorer' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-slate-800 border-r border-slate-700 z-40">
      <div className="h-full flex flex-col">
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                    ? 'bg-slate-700 text-white'
                    : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                  }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4">
          <Link
            to="/inject"
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70 transition-all transform hover:scale-105 animate-pulse"
          >
            <Plus className="w-6 h-6" />
            <span className="text-lg">Inject Material</span>
          </Link>
        </div>

        <div className="mt-auto p-4 border-t border-slate-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all group"
          >
            <LogOut className="w-5 h-5 group-hover:text-red-400 transition-colors" />
            <span className="font-medium group-hover:text-red-400 transition-colors">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
