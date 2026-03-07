// src/types/presupuesto.ts
export type EstadoPresupuesto = 'Pendiente' | 'Aprobado' | 'Rechazado';
export type TipoTrabajo = 'reparacion' | 'mantencion' | 'diagnostico' | 'repuesto';

export interface Cliente {
  nombre: string;
  rut?: string;
  telefono: string;
  email: string;
  direccion: string;
}

export interface Vehiculo {
  patente: string;
  marca: string;
  modelo: string;
  anio: number | '';
  kilometraje: number | '';
}

export interface PresupuestoItem {
  id: string;
  descripcion: string;
  tipoTrabajo: TipoTrabajo;
  cantidad: number;
  precioUnitario: number;
  manoObra: number;
  tiempoEstimado: string;
  subtotal: number;
}

export interface PresupuestoTotales {
  subtotal: number;
  ivaPorcentaje: number;
  ivaMonto: number;
  total: number;
}

export interface Presupuesto {
  id: string;
  numero: string;
  fechaCreacion: string;
  estado: EstadoPresupuesto;
  tiempoEntrega: string;
  observaciones: string;
  condicionesServicio: string;
  cliente: Cliente;
  vehiculo: Vehiculo;
  items: PresupuestoItem[];
  totales: PresupuestoTotales;
  companySnapshot: {
    nombreEmpresa: string;
    direccion: string;
    telefono: string;
    email: string;
    logo?: string;
    moneda: 'CLP';
  };
}

export interface CompanySettings {
  nombreEmpresa: string;
  logo?: string;
  direccion: string;
  telefono: string;
  email: string;
  iva: number;
  moneda: 'CLP';
}
