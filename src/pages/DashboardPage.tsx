import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <Card title="Bienvenido a MRCastle">
        <p className="text-sm text-slate-600">
          Sistema de gestión y generación de presupuestos mecánicos.
        </p>
        <div className="mt-4">
          <Link to="/presupuestos/nuevo">
            <Button>Crear nuevo presupuesto</Button>
          </Link>
        </div>
      </Card>

      <Card title="Accesos rápidos">
        <div className="flex flex-col gap-3">
          <Link to="/historial">
            <Button variant="secondary" full>
              Ver historial
            </Button>
          </Link>
          <Link to="/configuracion">
            <Button variant="secondary" full>
              Configuración
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
