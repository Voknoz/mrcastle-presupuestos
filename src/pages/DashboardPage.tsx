import { Link } from 'react-router-dom';
import { ClipboardCheck, FileText, History, Settings } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      <Card title="Nuevo presupuesto">
        <p className="text-sm text-slate-600">
          Crea una cotización rápida para trabajos mecánicos.
        </p>
        <div className="mt-4">
          <Link to="/presupuestos/nuevo">
            <Button full>
              <FileText size={18} className="mr-2" />
              Crear presupuesto
            </Button>
          </Link>
        </div>
      </Card>

      <Card title="Recepción">
        <p className="text-sm text-slate-600">
          Registra el estado del vehículo al ingreso al taller.
        </p>
        <div className="mt-4">
          <Link to="/recepcion/nueva">
            <Button full variant="secondary">
              <ClipboardCheck size={18} className="mr-2" />
              Nueva recepción
            </Button>
          </Link>
        </div>
      </Card>

      <Card title="Historial">
        <p className="text-sm text-slate-600">
          Revisa presupuestos guardados.
        </p>
        <div className="mt-4">
          <Link to="/historial">
            <Button full variant="secondary">
              <History size={18} className="mr-2" />
              Ver historial
            </Button>
          </Link>
        </div>
      </Card>

      <Card title="Configuración">
        <p className="text-sm text-slate-600">
          Ajusta datos de empresa, contacto y branding.
        </p>
        <div className="mt-4">
          <Link to="/configuracion">
            <Button full variant="secondary">
              <Settings size={18} className="mr-2" />
              Configurar
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
