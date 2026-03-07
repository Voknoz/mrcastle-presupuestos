import Card from '../ui/Card';
import Input from '../ui/Input';
import { usePresupuestoStore } from '../../store/presupuesto.store';

export default function ClienteForm() {
  const cliente = usePresupuestoStore((s) => s.current.cliente);
  const updateCliente = usePresupuestoStore((s) => s.updateCliente);

  return (
    <Card title="Datos del cliente">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input label="Nombre" value={cliente.nombre} onChange={(e) => updateCliente({ nombre: e.target.value })} />
        <Input label="RUT (opcional)" value={cliente.rut || ''} onChange={(e) => updateCliente({ rut: e.target.value })} />
        <Input label="Teléfono" value={cliente.telefono} onChange={(e) => updateCliente({ telefono: e.target.value })} />
        <Input label="Correo electrónico" type="email" value={cliente.email} onChange={(e) => updateCliente({ email: e.target.value })} />
        <div className="md:col-span-2">
          <Input label="Dirección" value={cliente.direccion} onChange={(e) => updateCliente({ direccion: e.target.value })} />
        </div>
      </div>
    </Card>
  );
}
