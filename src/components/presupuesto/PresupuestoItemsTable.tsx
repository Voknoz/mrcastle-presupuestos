import { Plus, Trash2 } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { usePresupuestoStore } from '../../store/presupuesto.store';
import { formatCLP } from '../../utils/currency';

export default function PresupuestoItemsTable() {
  const items = usePresupuestoStore((s) => s.current.items);
  const addItem = usePresupuestoStore((s) => s.addItem);
  const updateItem = usePresupuestoStore((s) => s.updateItem);
  const removeItem = usePresupuestoStore((s) => s.removeItem);

  return (
    <Card
      title="Ítems del presupuesto"
      action={
        <Button onClick={addItem}>
          <Plus size={18} className="mr-2" />
          Agregar ítem
        </Button>
      }
    >
      <div className="space-y-4 md:hidden">
        {items.map((item, i) => (
          <div key={item.id} className="rounded-2xl border border-slate-200 p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-semibold text-slate-900">Ítem {i + 1}</span>
              <button
                onClick={() => window.confirm('¿Eliminar ítem?') && removeItem(item.id)}
                className="rounded-lg p-2 text-red-600"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <input className="min-h-12 rounded-xl border px-4 py-3" placeholder="Descripción" value={item.descripcion} onChange={(e) => updateItem(item.id, { descripcion: e.target.value })} />
              <select className="min-h-12 rounded-xl border px-4 py-3" value={item.tipoTrabajo} onChange={(e) => updateItem(item.id, { tipoTrabajo: e.target.value as any })}>
                <option value="reparacion">Reparación</option>
                <option value="mantencion">Mantención</option>
                <option value="diagnostico">Diagnóstico</option>
                <option value="repuesto">Repuesto</option>
              </select>
              <input type="number" className="min-h-12 rounded-xl border px-4 py-3" placeholder="Cantidad" value={item.cantidad} onChange={(e) => updateItem(item.id, { cantidad: Number(e.target.value) })} />
              <input type="number" className="min-h-12 rounded-xl border px-4 py-3" placeholder="Precio unitario" value={item.precioUnitario} onChange={(e) => updateItem(item.id, { precioUnitario: Number(e.target.value) })} />
              <input type="number" className="min-h-12 rounded-xl border px-4 py-3" placeholder="Mano de obra" value={item.manoObra} onChange={(e) => updateItem(item.id, { manoObra: Number(e.target.value) })} />
              <input className="min-h-12 rounded-xl border px-4 py-3" placeholder="Tiempo estimado" value={item.tiempoEstimado} onChange={(e) => updateItem(item.id, { tiempoEstimado: e.target.value })} />
              <div className="rounded-xl bg-slate-50 p-3 text-right font-semibold">Subtotal: {formatCLP(item.subtotal)}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b text-left text-slate-500">
              <th className="p-2">Descripción</th>
              <th className="p-2">Tipo</th>
              <th className="p-2">Cantidad</th>
              <th className="p-2">Precio Unitario</th>
              <th className="p-2">Mano de obra</th>
              <th className="p-2">Tiempo</th>
              <th className="p-2">Subtotal</th>
              <th className="p-2"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b align-top">
                <td className="p-2">
                  <input className="w-full rounded-lg border p-2" value={item.descripcion} onChange={(e) => updateItem(item.id, { descripcion: e.target.value })} />
                </td>
                <td className="p-2">
                  <select className="w-full rounded-lg border p-2" value={item.tipoTrabajo} onChange={(e) => updateItem(item.id, { tipoTrabajo: e.target.value as any })}>
                    <option value="reparacion">Reparación</option>
                    <option value="mantencion">Mantención</option>
                    <option value="diagnostico">Diagnóstico</option>
                    <option value="repuesto">Repuesto</option>
                  </select>
                </td>
                <td className="p-2">
                  <input type="number" className="w-24 rounded-lg border p-2" value={item.cantidad} onChange={(e) => updateItem(item.id, { cantidad: Number(e.target.value) })} />
                </td>
                <td className="p-2">
                  <input type="number" className="w-28 rounded-lg border p-2" value={item.precioUnitario} onChange={(e) => updateItem(item.id, { precioUnitario: Number(e.target.value) })} />
                </td>
                <td className="p-2">
                  <input type="number" className="w-28 rounded-lg border p-2" value={item.manoObra} onChange={(e) => updateItem(item.id, { manoObra: Number(e.target.value) })} />
                </td>
                <td className="p-2">
                  <input className="w-28 rounded-lg border p-2" value={item.tiempoEstimado} onChange={(e) => updateItem(item.id, { tiempoEstimado: e.target.value })} />
                </td>
                <td className="p-2 font-semibold">{formatCLP(item.subtotal)}</td>
                <td className="p-2">
                  <button onClick={() => window.confirm('¿Eliminar ítem?') && removeItem(item.id)} className="rounded-lg p-2 text-red-600">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
