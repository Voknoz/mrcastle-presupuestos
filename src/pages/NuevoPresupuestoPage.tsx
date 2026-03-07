import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import PresupuestoEditor from '../components/presupuesto/PresupuestoEditor';
import { usePresupuestoStore } from '../store/presupuesto.store';
import Button from '../components/ui/Button';

export default function NuevoPresupuestoPage() {
  const { id } = useParams();
  const loadById = usePresupuestoStore((s) => s.loadById);
  const resetCurrent = usePresupuestoStore((s) => s.resetCurrent);

  useEffect(() => {
    if (id) loadById(id);
    else resetCurrent();
  }, [id, loadById, resetCurrent]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Link to="/">
          <Button variant="secondary">
            <Home size={18} className="mr-2" />
            Inicio
          </Button>
        </Link>

        <Link to="/historial">
          <Button variant="secondary">
            <ArrowLeft size={18} className="mr-2" />
            Historial
          </Button>
        </Link>
      </div>

      <PresupuestoEditor />
    </div>
  );
}
