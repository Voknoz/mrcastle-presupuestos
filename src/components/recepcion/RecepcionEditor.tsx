import Card from '../ui/Card';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { useRecepcionStore } from '../../store/recepcion.store';
import { generateRecepcionPDF } from '../../services/recepcion-pdf.service';

const estados = ['Bueno', 'Regular', 'Malo', 'No revisado'];

export default function RecepcionEditor() {
  const {
    current,
    updateCurrent,
    updateCliente,
    updateVehiculo,
    updateChecklist,
    updateAccesorio,
    saveCurrent
  } = useRecepcionStore();

  return (
    <div className="space-y-4">
      <Card title="Recepción de vehículo">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input label="Fecha" type="date" value={current.fecha} onChange={(e) => updateCurrent({ fecha: e.target.value })} />
          <Input label="Hora" type="time" value={current.hora} onChange={(e) => updateCurrent({ hora: e.target.value })} />
          <Input label="Cliente" value={current.cliente.nombre} onChange={(e) => updateCliente({ nombre: e.target.value })} />
          <Input label="Teléfono" value={current.cliente.telefono} onChange={(e) => updateCliente({ telefono: e.target.value })} />
          <Input label="Email" value={current.cliente.email} onChange={(e) => updateCliente({ email: e.target.value })} />
          <Input label="Patente" value={current.vehiculo.patente} onChange={(e) => updateVehiculo({ patente: e.target.value.toUpperCase() })} />
          <Input label="Marca" value={current.vehiculo.marca} onChange={(e) => updateVehiculo({ marca: e.target.value })} />
          <Input label="Modelo" value={current.vehiculo.modelo} onChange={(e) => updateVehiculo({ modelo: e.target.value })} />
          <Input label="Año" type="number" value={current.vehiculo.anio} onChange={(e) => updateVehiculo({ anio: Number(e.target.value) || '' })} />
          <Input label="Color" value={current.vehiculo.color} onChange={(e) => updateVehiculo({ color: e.target.value })} />
          <Input label="Kilometraje" type="number" value={current.vehiculo.kilometraje} onChange={(e) => updateVehiculo({ kilometraje: Number(e.target.value) || '' })} />
          <Select label="Nivel de combustible" value={current.nivelCombustible} onChange={(e) => updateCurrent({ nivelCombustible: e.target.value })}>
            <option value="Vacío">Vacío</option>
            <option value="1/4">1/4</option>
            <option value="1/2">1/2</option>
            <option value="3/4">3/4</option>
            <option value="Lleno">Lleno</option>
          </Select>
          <div className="md:col-span-2">
            <Textarea label="Motivo de ingreso" value={current.motivoIngreso} onChange={(e) => updateCurrent({ motivoIngreso: e.target.value })} />
          </div>
          <div className="md:col-span-2">
            <Textarea label="Testigos encendidos" value={current.testigosEncendidos} onChange={(e) => updateCurrent({ testigosEncendidos: e.target.value })} />
          </div>
          <div className="md:col-span-2">
            <Textarea label="Daños visibles" value={current.danosVisibles} onChange={(e) => updateCurrent({ danosVisibles: e.target.value })} />
          </div>
          <div className="md:col-span-2">
            <Textarea label="Observaciones del cliente" value={current.observacionesCliente} onChange={(e) => updateCurrent({ observacionesCliente: e.target.value })} />
          </div>
          <div className="md:col-span-2">
            <Textarea label="Observaciones internas" value={current.observacionesInternas} onChange={(e) => updateCurrent({ observacionesInternas: e.target.value })} />
          </div>
        </div>
      </Card>

      <Card title="Checklist de recepción">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {Object.entries(current.checklist).map(([key, value]) => (
            <Select
              key={key}
              label={key}
              value={value}
              onChange={(e) => updateChecklist(key as keyof typeof current.checklist, e.target.value)}
            >
              {estados.map((estado) => (
                <option key={estado} value={estado}>{estado}</option>
              ))}
            </Select>
          ))}
        </div>
      </Card>

      <Card title="Accesorios entregados">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {Object.entries(current.accesorios).map(([key, value]) => (
            <label key={key} className="flex items-center gap-3 rounded-xl border p-3">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => updateAccesorio(key as keyof typeof current.accesorios, e.target.checked)}
              />
              <span>{key}</span>
            </label>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <Button
          full
          onClick={() => {
            saveCurrent();
            alert('Recepción guardada correctamente');
          }}
        >
          Guardar recepción
        </Button>

        <Button full variant="secondary" onClick={() => generateRecepcionPDF(current)}>
          Descargar recepción en PDF
        </Button>
      </div>
    </div>
  );
}
