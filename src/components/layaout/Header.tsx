import { Home, FileText } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../ui/Button';
import { useSettingsStore } from '../../store/settings.store';

export default function Header() {
  const { pathname } = useLocation();
  const settings = useSettingsStore((s) => s.settings);

  const isHome = pathname === '/';
  const logoSrc = settings.logo?.trim() || '/logo-mrcastle.svg';

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white">
            <img
              src={logoSrc}
              alt={settings.nombreEmpresa}
              className="h-10 w-10 object-contain"
            />
          </div>

          <div className="min-w-0 leading-tight">
            <div className="truncate text-xl font-bold text-slate-900">
              {settings.nombreEmpresa}
            </div>
            <div className="truncate text-sm text-slate-500">
              Gestión de presupuestos mecánicos
            </div>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          {!isHome && (
            <Link to="/">
              <Button variant="secondary" className="px-3 md:px-4">
                <Home size={18} className="mr-2" />
                <span className="hidden sm:inline">Inicio</span>
              </Button>
            </Link>
          )}

          <Link to="/presupuestos/nuevo">
            <Button className="px-3 md:px-4">
              <FileText size={18} className="mr-2" />
              <span className="hidden sm:inline">Nuevo presupuesto</span>
              <span className="sm:hidden">Nuevo</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
