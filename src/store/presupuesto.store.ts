import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { samplePresupuestos } from '../data/seed';
import { Presupuesto, PresupuestoItem } from '../types/presupuesto';
import { calcularSubtotalItem, calcularTotales } from '../utils/calculations';
import { buildNumeroPresupuesto, createEmptyPresupuesto } from '../utils/id';

interface PresupuestoState {
  presupuestos: Presupuesto[];
  current: Presupuesto;
  search: string;
  estadoFiltro: string;
  setSearch: (value: string) => void;
  setEstadoFiltro: (value: string) => void;
  setCurrent: (value: Presupuesto) => void;
  resetCurrent: () => void;
  updateCurrent: (patch: Partial<Presupuesto>) => void;
  updateCliente: (patch: Partial<Presupuesto['cliente']>) => void;
  updateVehiculo: (patch: Partial<Presupuesto['vehiculo']>) => void;
  addItem: () => void;
  updateItem: (id: string, patch: Partial<PresupuestoItem>) => void;
  removeItem: (id: string) => void;
  recalcCurrent: (iva: number) => void;
  saveCurrent: (iva: number) => Presupuesto;
  loadById: (id: string) => void;
  deleteById: (id: string) => void;
  duplicateById: (id: string) => void;
  seedIfEmpty: () => void;
}

export const usePresupuestoStore = create<PresupuestoState>()(
  persist(
    (set, get) => ({
      presupuestos: [],
      current: createEmptyPresupuesto(),
      search: '',
      estadoFiltro: 'Todos',

      setSearch: (value) => set({ search: value }),
      setEstadoFiltro: (value) => set({ estadoFiltro: value }),
      setCurrent: (value) => set({ current: value }),
      resetCurrent: () => set({ current: createEmptyPresupuesto() }),

      updateCurrent: (patch) =>
        set((state) => ({ current: { ...state.current, ...patch } })),

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

      addItem: () =>
        set((state) => ({
          current: {
            ...state.current,
            items: [
              ...state.current.items,
              {
                id: crypto.randomUUID(),
                descripcion: '',
                tipoTrabajo: 'reparacion',
                cantidad: 1,
                precioUnitario: 0,
                manoObra: 0,
                tiempoEstimado: '',
                subtotal: 0
              }
            ]
          }
        })),

      updateItem: (id, patch) =>
        set((state) => ({
          current: {
            ...state.current,
            items: state.current.items.map((item) => {
              if (item.id !== id) return item;
              const next = { ...item, ...patch };
              return { ...next, subtotal: calcularSubtotalItem(next) };
            })
          }
        })),

      removeItem: (id) =>
        set((state) => ({
          current: {
            ...state.current,
            items: state.current.items.filter((item) => item.id !== id)
          }
        })),

      recalcCurrent: (iva) =>
        set((state) => ({
          current: {
            ...state.current,
            items: state.current.items.map((item) => ({
              ...item,
              subtotal: calcularSubtotalItem(item)
            })),
            totales: calcularTotales(state.current.items, iva)
          }
        })),

      saveCurrent: (iva) => {
        const state = get();
        const prepared: Presupuesto = {
          ...state.current,
          numero: state.current.numero || buildNumeroPresupuesto(),
          items: state.current.items.map((item) => ({
            ...item,
            subtotal: calcularSubtotalItem(item)
          })),
          totales: calcularTotales(state.current.items, iva)
        };

        const exists = state.presupuestos.some((p) => p.id === prepared.id);
        set({
          current: prepared,
          presupuestos: exists
            ? state.presupuestos.map((p) => (p.id === prepared.id ? prepared : p))
            : [prepared, ...state.presupuestos]
        });
        return prepared;
      },

      loadById: (id) =>
        set((state) => ({
          current: state.presupuestos.find((p) => p.id === id) ?? createEmptyPresupuesto()
        })),

      deleteById: (id) =>
        set((state) => ({
          presupuestos: state.presupuestos.filter((p) => p.id !== id)
        })),

      duplicateById: (id) =>
        set((state) => {
          const original = state.presupuestos.find((p) => p.id === id);
          if (!original) return state;

          const copy: Presupuesto = {
            ...original,
            id: crypto.randomUUID(),
            numero: buildNumeroPresupuesto(),
            fechaCreacion: new Date().toISOString(),
            estado: 'Pendiente',
            items: original.items.map((item) => ({
              ...item,
              id: crypto.randomUUID()
            }))
          };

          return { presupuestos: [copy, ...state.presupuestos] };
        }),

      seedIfEmpty: () =>
        set((state) => ({
          presupuestos: state.presupuestos.length ? state.presupuestos : samplePresupuestos
        }))
    }),
    { name: 'mrcastle-presupuestos-store' }
  )
);
