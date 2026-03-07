import { Presupuesto } from '../types/presupuesto';

export const buildNumeroPresupuesto = () => {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  const rand = Math.floor(100 + Math.random() * 900);
  return `MRC-${y}${m}${d}-${rand}`;
};

export const createEmptyPresupuesto = (): Presupuesto => ({
  id: crypto.randomUUID(),
  numero: '',
  fechaCreacion: new Date().toISOString(),
  estado: 'Pendiente',
  tiempoEntrega: '',
  observaciones: '',
  condicionesServicio: 'Validez del presupuesto: 10 días. Repuestos sujetos a disponibilidad.',
  cliente: {
    nombre: '',
    rut: '',
    telefono: '',
    email: '',
    direccion: ''
  },
  vehiculo: {
    patente: '',
    marca: '',
    modelo: '',
    anio: '',
    kilometraje: ''
  },
  items: [],
  totales: {
    subtotal: 0,
    ivaPorcentaje: 0,
    ivaMonto: 0,
    total: 0
  },
  companySnapshot: {
    nombreEmpresa: 'MRCastle',
    direccion: 'Valdivia, Los Rios, Chile',
    telefono: '+56 9 4416 5947',
    email: 'franciscoing@gmail.com',
    logo: '/logo-mrcastle.svg',
    moneda: 'CLP'
  }
});
