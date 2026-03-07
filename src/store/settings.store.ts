import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CompanySettings } from '../types/settings';

interface SettingsState {
  settings: CompanySettings;
  updateSettings: (patch: Partial<CompanySettings>) => void;
}

const defaultSettings: CompanySettings = {
  nombreEmpresa: 'MRCastle',
  logo: '/logo-mrcastle.svg',
  direccion: 'Valdivia, Los Rios, Chile',
  telefono: '+56 9 4416 5947',
  email: 'franciscoing@gmail.com',
  iva: 0,
  moneda: 'CLP'
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      settings: defaultSettings,
      updateSettings: (patch) =>
        set((state) => ({
          settings: { ...state.settings, ...patch }
        }))
    }),
    { name: 'mrcastle-settings-store' }
  )
);
