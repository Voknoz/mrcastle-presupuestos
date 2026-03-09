import { Presupuesto } from '../types/presupuesto';

export const samplePresupuestos: Presupuesto[] = [
  {
    id: crypto.randomUUID(),
    numero: 'MRC-20260306-101',
    fechaCreacion: new Date().toISOString(),
    estado: 'Pendiente',
    tiempoEntrega: '2 días hábiles',
    observaciones: 'Se recomienda revisión de frenos tras cambio de discos.',
    cliente: {
      nombre: 'Juan Pérez',
      rut: '12.345.678-9',
      telefono: '+56 9 8765 4321',
      email: 'juanperez@email.com',
      direccion: 'Av. O’Higgins 123, Temuco'
    },
    vehiculo: {
      patente: 'ABCD11',
      marca: 'Toyota',
      modelo: 'Yaris',
      anio: 2018,
      kilometraje: 85300
    },
    items: [
      {
        id: crypto.randomUUID(),
        descripcion: 'Cambio de pastillas de freno delanteras',
        tipoTrabajo: 'reparacion',
        cantidad: 1,
        precioUnitario: 65000,
        manoObra: 25000,
        tiempoEstimado: '2 horas',
        subtotal: 90000
      },
      {
        id: crypto.randomUUID(),
        descripcion: 'Diagnóstico tren delantero',
        tipoTrabajo: 'diagnostico',
        cantidad: 1,
        precioUnitario: 15000,
        manoObra: 10000,
        tiempoEstimado: '45 min',
        subtotal: 25000
      }
    ],
    totales: {
      subtotal: 115000,
      ivaPorcentaje: 19,
      ivaMonto: 21850,
      total: 136850
    },
    companySnapshot: {
      nombreEmpresa: 'MRCastle',
      direccion: 'Valdivia, Los Rios, Chile',
      telefono: '+56 9 4416 5947',
      email: 'franciscoing@gmail.com',
      logo: '/logo-mrcastle.svg',
      moneda: 'CLP'
    }
  }
];
