import { FileText, History, Home, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../utils/cn';

export default function BottomNav() {
  const { pathname } = useLocation();

  const items = [
    { to: '/', label: 'Inicio', icon: Home },
    { to: '/presupuestos/nuevo', label: 'Nuevo', icon: FileText },
    { to: '/historial', label: 'Historial', icon: History },
    { to: '/configuracion', label: 'Config.', icon: Settings }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-slate-200 bg-white md:hidden">
      <div className="grid grid-cols-4">
        {items.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className={cn(
              'flex flex-col items-center justify-center gap-1 py-3 text-xs',
              pathname === to ? 'text-slate-900' : 'text-slate-500'
            )}
          >
            <Icon size={20} />
            <span>{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
