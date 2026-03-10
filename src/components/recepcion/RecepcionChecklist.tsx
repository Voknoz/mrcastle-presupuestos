 import Card from '../ui/Card';
import Select from '../ui/Select';
import { useRecepcionStore } from '../../store/recepcion.store';

const estados = ['Bueno', 'Regular', 'Malo', 'No revisado'] as const;

const labels: Record<string, string> = {
  carroceria: 'Carrocería',
  pintura: 'Pintura',
  parabrisas: 'Parabrisas',
  espejos: 'Espejos',
  luces: 'Luces',
  neumaticos: 'Neumáticos',
  interior: 'Interior',
  tablero: 'Tablero',
  frenos: 'Frenos',
  bateria: 'Batería'
};

export default function RecepcionChecklist() {
  const checklist = useRecepcionStore((s) => s.current.checklist);
  const updateChecklist = useRecepcionStore((s) => s.updateChecklist);

  return (
    <Card title="Checklist de recepción">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {Object.entries(checklist).map(([key, value]) => (
          <Select
            key={key}
            label={labels[key] || key}
            value={value}
            onChange={(e) =>
              updateChecklist(key as keyof typeof checklist, e.target.value)
            }
          >
            {estados.map((estado) => (
              <option key={estado} value={estado}>
                {estado}
              </option>
            ))}
          </Select>
        ))}
      </div>
    </Card>
  );
}
