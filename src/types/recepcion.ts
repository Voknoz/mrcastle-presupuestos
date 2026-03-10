export type EstadoCheck = 'Bueno' | 'Regular' | 'Malo' | 'No revisado';

export interface RecepcionChecklist {
  carroceria: EstadoCheck;
  pintura: EstadoCheck;
  parabrisas: EstadoCheck;
  espejos: EstadoCheck;
  luces: EstadoCheck;
  neumaticos: EstadoCheck;
  interior: EstadoCheck;
  tablero: EstadoCheck;
  frenos: EstadoCheck;
  bateria: EstadoCheck;
}

export interface RecepcionAccesorios {
  llavePrincipal: boolean;
  llaveRepuesto: boolean;
  controlRemoto: boolean;
  gata: boolean;
  ruedaRepuesto: boolean;
  documentos: boolean;
  radioPanel: boolean;
}

export interface RecepcionVehiculo {
  id: string;
  numero: string;
  fecha: string;
  hora: string;
  cliente: {
    nombre: string;
    telefono: string;
    email: string;
  };
  vehiculo: {
    patente: string;
    marca: string;
    modelo: string;
    anio: number | '';
    color: string;
    kilometraje: number | '';
  };
  motivoIngreso: string;
  nivelCombustible: string;
  testigosEncendidos: string;
  danosVisibles: string;
  observacionesCliente: string;
  observacionesInternas: string;
  checklist: RecepcionChecklist;
  accesorios: RecepcionAccesorios;
}
