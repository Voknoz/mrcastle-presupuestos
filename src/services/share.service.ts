import { Presupuesto } from '../types/presupuesto';
import { formatCLP } from '../utils/currency';

export const buildMailtoLink = (p: Presupuesto) => {
  const subject = encodeURIComponent(`Presupuesto ${p.numero} - ${p.companySnapshot.nombreEmpresa}`);
  const body = encodeURIComponent(
    `Hola ${p.cliente.nombre},

Te compartimos tu presupuesto ${p.numero}.
Vehículo: ${p.vehiculo.marca} ${p.vehiculo.modelo} - ${p.vehiculo.patente}
Total: ${formatCLP(p.totales.total)}

Saludos,
${p.companySnapshot.nombreEmpresa}`
  );

  return `mailto:${p.cliente.email}?subject=${subject}&body=${body}`;
};

export const buildWhatsAppLink = (p: Presupuesto) => {
  const text = encodeURIComponent(
    `Hola ${p.cliente.nombre}, te compartimos tu presupuesto ${p.numero} de ${p.companySnapshot.nombreEmpresa}. Total: ${formatCLP(p.totales.total)}.`
  );
  return `https://wa.me/?text=${text}`;
};
