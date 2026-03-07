import Card from '../ui/Card';
import { usePresupuestoStore } from '../../store/presupuesto.store';
import { formatCLP } from '../../utils/currency';

export default function PresupuestoSummary() {
  const current = usePresupuestoStore((s) => s.current);

  return (
    <Card title="Resumen">
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <strong>{formatCLP(current.totales.subtotal)}</strong>
        </div>

        <div className="flex justify-between border-t pt-3 text-base">
          <span>Total final</span>
          <strong>{formatCLP(current.totales.total)}</strong>
        </div>
      </div>
    </Card>
  );
}
