import Card from '../ui/Card';
import Input from '../ui/Input';
import { usePresupuestoStore } from '../../store/presupuesto.store';

export default function VehiculoForm() {
  const vehiculo = usePresupuestoStore((s) => s.current.vehiculo);
  const updateVehiculo = usePresupuestoStore((s) => s.updateVehiculo);

  return (
    <Card title="Datos del vehículo">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input label="Patente" value={vehiculo.patente} onChange={(e) => updateVehiculo({ patente: e.target.value.toUpperCase() })} />
        <Input label="Marca" value={vehiculo.marca} onChange={(e) => updateVehiculo({ marca: e.target.value })} />
        <Input label="Modelo" value={vehiculo.modelo} onChange={(e) => updateVehiculo({ modelo: e.target.value })} />
        <Input label="Año" type="number" value={vehiculo.anio} onChange={(e) => updateVehiculo({ anio: Number(e.target.value) || '' })} />
        <Input label="Kilometraje" type="number" value={vehiculo.kilometraje} onChange={(e) => updateVehiculo({ kilometraje: Number(e.target.value) || '' })} />
      </div>
    </Card>
  );
}
