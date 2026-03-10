import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { RecepcionVehiculo } from '../types/recepcion';

const createEmptyRecepcion = (): RecepcionVehiculo => ({
  id: crypto.randomUUID(),
  numero: `REC-${Date.now()}`,
  fecha: new Date().toISOString().slice(0, 10),
  hora: new Date().toTimeString().slice(0, 5),
  cliente: {
    nombre: '',
    telefono: '',
    email: ''
  },
  vehiculo: {
    patente: '',
    marca: '',
    modelo: '',
    anio: '',
    color: '',
    kilometraje: ''
  },
  motivoIngreso: '',
  nivelCombustible: '1/2',
  testigosEncendidos: '',
  danosVisibles: '',
  observacionesCliente: '',
  observacionesInternas: '',
  checklist: {
    carroceria: 'No revisado',
    pintura: 'No revisado',
    parabrisas: 'No revisado',
    espejos: 'No revisado',
    luces: 'No revisado',
    neumaticos: 'No revisado',
    interior: 'No revisado',
    tablero: 'No revisado',
    frenos: 'No revisado',
    bateria: 'No revisado'
  },
  accesorios: {
    llavePrincipal: true,
    llaveRepuesto: false,
    controlRemoto: false,
    gata: false,
    ruedaRepuesto: false,
    documentos: false,
    radioPanel: false
  }
});

interface RecepcionState {
  recepciones: RecepcionVehiculo[];
  current: RecepcionVehiculo;
  setCurrent: (value: RecepcionVehiculo) => void;
  updateCurrent: (patch: Partial<RecepcionVehiculo>) => void;
  updateCliente: (patch: Partial<RecepcionVehiculo['cliente']>) => void;
  updateVehiculo: (patch: Partial<RecepcionVehiculo['vehiculo']>) => void;
  updateChecklist: (key: keyof RecepcionVehiculo['checklist'], value: string) => void;
  updateAccesorio: (key: keyof RecepcionVehiculo['accesorios'], value: boolean) => void;
  saveCurrent: () => void;
  resetCurrent: () => void;
  loadById: (id: string) => void;
  deleteById: (id: string) => void;
  duplicateById: (id: string) => void;
}

export const useRecepcionStore = create<RecepcionState>()(
  persist(
    (set, get) => ({
      recepciones: [],
      current: createEmptyRecepcion(),

      setCurrent: (value) => set({ current: value }),

      updateCurrent: (patch) =>
        set((state) => ({
          current: { ...state.current, ...patch }
        })),

      updateCliente: (patch) =>
        set((state) => ({
          current: {
            ...state.current,
            cliente: { ...state.current.cliente, ...patch }
          }
        })),

      updateVehiculo: (patch) =>
        set((state) => ({
          current: {
            ...state.current,
            vehiculo: { ...state.current.vehiculo, ...patch }
          }
        })),

      updateChecklist: (key, value) =>
        set((state) => ({
          current: {
            ...state.current,
            checklist: {
              ...state.current.checklist,
              [key]: value
            }
          }
        })),

      updateAccesorio: (key, value) =>
        set((state) => ({
          current: {
            ...state.current,
            accesorios: {
              ...state.current.accesorios,
              [key]: value
            }
          }
        })),

      saveCurrent: () =>
        set((state) => {
          const exists = state.recepciones.some((r) => r.id === state.current.id);

          const recepciones = exists
            ? state.recepciones.map((r) =>
                r.id === state.current.id ? state.current : r
              )
            : [state.current, ...state.recepciones];

          return {
            recepciones,
            current: createEmptyRecepcion()
          };
        }),

      resetCurrent: () => set({ current: createEmptyRecepcion() }),

      loadById: (id) =>
        set((state) => {
          const found = state.recepciones.find((r) => r.id === id);
          return found ? { current: found } : state;
        }),

      deleteById: (id) =>
        set((state) => ({
          recepciones: state.recepciones.filter((r) => r.id !== id)
        })),

      duplicateById: (id) =>
        set((state) => {
          const found = state.recepciones.find((r) => r.id === id);
          if (!found) return state;

          const clone: RecepcionVehiculo = {
            ...found,
            id: crypto.randomUUID(),
            numero: `REC-${Date.now()}`,
            fecha: new Date().toISOString().slice(0, 10),
            hora: new Date().toTimeString().slice(0, 5)
          };

          return {
            recepciones: [clone, ...state.recepciones]
          };
        })
    }),
    { name: 'mrcastle-recepciones-store' }
  )
);
