import Card from '../ui/Card';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Textarea from '../ui/Textarea';
import { usePresupuestoStore } from '../../store/presupuesto.store';

export default function PresupuestoMetaForm() {
  const current = usePresupuestoStore((s) => s.current);
  const updateCurrent = usePresupuestoStore((s) => s.updateCurrent);

  return (
    <Card title="Datos del presupuesto">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input
          label="Fecha de creación"
          type="date"
          value={current.fechaCreacion.slice(0, 10)}
          onChange={(e) => updateCurrent({ fechaCreacion: new Date(e.target.value).toISOString() })}
        />

        <Select
          label="Estado"
          value={current.estado}
          onChange={(e) => updateCurrent({ estado: e.target.value as any })}
        >
          <option value="Pendiente">Pendiente</option>
          <option value="Aprobado">Aprobado</option>
          <option value="Rechazado">Rechazado</option>
        </Select>

        <Input
          label="Tiempo estimado de entrega"
          value={current.tiempoEntrega}
          onChange={(e) => updateCurrent({ tiempoEntrega: e.target.value })}
        />

        <Input
          label="Número de presupuesto"
          value={current.numero}
          onChange={(e) => updateCurrent({ numero: e.target.value })}
        />

        <div className="md:col-span-2">
          <Textarea
            label="Observaciones"
            value={current.observaciones}
            onChange={(e) => updateCurrent({ observaciones: e.target.value })}
          />
        </div>
      </div>
    </Card>
  );
}
