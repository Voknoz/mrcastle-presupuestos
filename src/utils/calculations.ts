import { PresupuestoItem, PresupuestoTotales } from '../types/presupuesto';

export const calcularSubtotalItem = (item: PresupuestoItem) =>
  Number(item.cantidad || 0) * Number(item.precioUnitario || 0) + Number(item.manoObra || 0);

export const calcularTotales = (
  items: PresupuestoItem[],
  _ivaPorcentaje: number
): PresupuestoTotales => {
  const subtotal = items.reduce((acc, item) => acc + calcularSubtotalItem(item), 0);

  return {
    subtotal,
    ivaPorcentaje: 0,
    ivaMonto: 0,
    total: subtotal
  };
};
