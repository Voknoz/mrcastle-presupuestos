import { Presupuesto } from '../types/presupuesto';

export function validatePresupuesto(p: Presupuesto) {
  const errors: string[] = [];

  if (!p.cliente.nombre.trim()) errors.push('El nombre del cliente es obligatorio');
  if (!p.cliente.telefono.trim()) errors.push('El teléfono es obligatorio');
  if (!/\S+@\S+\.\S+/.test(p.cliente.email)) errors.push('El correo electrónico no es válido');
  if (!p.cliente.direccion.trim()) errors.push('La dirección es obligatoria');
  if (!p.vehiculo.patente.trim()) errors.push('La patente es obligatoria');
  if (!p.vehiculo.marca.trim()) errors.push('La marca es obligatoria');
  if (!p.vehiculo.modelo.trim()) errors.push('El modelo es obligatorio');
  if (!p.items.length) errors.push('Debes agregar al menos un ítem');

  p.items.forEach((item, index) => {
    if (!item.descripcion.trim()) errors.push(`El ítem ${index + 1} no tiene descripción`);
    if (item.cantidad <= 0) errors.push(`La cantidad del ítem ${index + 1} debe ser mayor a 0`);
    if (item.precioUnitario < 0) errors.push(`Precio unitario inválido en el ítem ${index + 1}`);
    if (item.manoObra < 0) errors.push(`Mano de obra inválida en el ítem ${index + 1}`);
  });

  return errors;
}
