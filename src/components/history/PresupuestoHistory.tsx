// src/components/history/PresupuestoHistory.tsx
import { Copy, Download, Eye, Pencil, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePresupuestoStore } from '../../store/presupuesto.store';
import { formatCLP } from '../../utils/currency';
import { generatePresupuestoPDF } from '../../services/pdf.service';

export default function PresupuestoHistory() {
  const { presupuestos, search, estadoFiltro, setSearch, setEstadoFiltro, deleteById, duplicateById } =
    usePresupuestoStore();

  const filtered = presupuestos.filter((p) => {
    const text = `${p.numero} ${p.cliente.nombre} ${p.vehiculo.marca} ${p.vehiculo.modelo} ${p.vehiculo.patente}`.toLowerCase();
    const matchSearch = text.includes(search.toLowerCase());
    const matchEstado = estadoFiltro === 'Todos' || p.estado === estadoFiltro;
    return matchSearch && matchEstado;
  });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <input
          className="rounded-xl border p-3"
          placeholder="Buscar por cliente, patente o número"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className="rounded-xl border p-3" value={estadoFiltro} onChange={(e) => setEstadoFiltro(e.target.value)}>
          <option>Todos</option>
          <option>Pendiente</option>
          <option>Aprobado</option>
          <option>Rechazado</option>
        </select>
      </div>

      <div className="hidden overflow-x-auto rounded-2xl border bg-white md:block">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="p-3 text-left">N°</th>
              <th className="p-3 text-left">Cliente</th>
              <th className="p-3 text-left">Vehículo</th>
              <th className="p-3 text-left">Fecha</th>
              <th className="p-3 text-left">Total</th>
              <th className="p-3 text-left">Estado</th>
              <th className="p-3 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-3">{p.numero}</td>
                <td className="p-3">{p.cliente.nombre}</td>
                <td className="p-3">{p.vehiculo.marca} {p.vehiculo.modelo} · {p.vehiculo.patente}</td>
                <td className="p-3">{new Date(p.fechaCreacion).toLocaleDateString('es-CL')}</td>
                <td className="p-3">{formatCLP(p.totales.total)}</td>
                <td className="p-3">{p.estado}</td>
                <td className="p-3">
                  <div className="flex flex-wrap gap-2">
                    <Link to={`/presupuestos/${p.id}`} className="rounded-lg border px-3 py-2"><Eye size={16} /></Link>
                    <Link to={`/presupuestos/${p.id}`} className="rounded-lg border px-3 py-2"><Pencil size={16} /></Link>
                    <button onClick={() => generatePresupuestoPDF(p)} className="rounded-lg border px-3 py-2"><Download size={16} /></button>
                    <button onClick={() => duplicateById(p.id)} className="rounded-lg border px-3 py-2"><Copy size={16} /></button>
                    <button onClick={() => window.confirm('¿Eliminar presupuesto?') && deleteById(p.id)} className="rounded-lg border px-3 py-2 text-red-600"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
