import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

export default function NotFoundPage() {
  return (
    <div className="rounded-2xl bg-white p-8 shadow-soft">
      <h1 className="text-2xl font-bold text-slate-900">Página no encontrada</h1>
      <p className="mt-2 text-slate-600">La ruta solicitada no existe.</p>
      <div className="mt-4">
        <Link to="/">
          <Button>Volver al inicio</Button>
        </Link>
      </div>
    </div>
  );
}
