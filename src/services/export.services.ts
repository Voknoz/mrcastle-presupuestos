import { Presupuesto } from '../types/presupuesto';
import { formatDate } from '../utils/date';

export function exportPresupuestosCSV(items: Presupuesto[]) {
  const headers = [
    'Numero',
    'Cliente',
    'Patente',
    'Vehiculo',
    'Fecha',
    'Estado',
    'Subtotal',
    'IVA',
    'Total'
  ];

  const rows = items.map((p) => [
    p.numero,
    p.cliente.nombre,
    p.vehiculo.patente,
    `${p.vehiculo.marca} ${p.vehiculo.modelo}`,
    formatDate(p.fechaCreacion),
    p.estado,
    p.totales.subtotal,
    p.totales.ivaMonto,
    p.totales.total
  ]);

  const csv = [headers, ...rows]
    .map((row) => row.map((col) => `"${String(col).replace('"', '""')}"`).join(','))
    .join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'presupuestos-mrcastle.csv';
  a.click();
  URL.revokeObjectURL(url);
}
