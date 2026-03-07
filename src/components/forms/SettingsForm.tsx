import Card from '../ui/Card';
import Input from '../ui/Input';
import { useSettingsStore } from '../../store/settings.store';

export default function SettingsForm() {
  const settings = useSettingsStore((s) => s.settings);
  const updateSettings = useSettingsStore((s) => s.updateSettings);

  return (
    <Card title="Configuración de empresa">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input label="Nombre empresa" value={settings.nombreEmpresa} onChange={(e) => updateSettings({ nombreEmpresa: e.target.value })} />
        <Input label="Logo (ruta o URL)" value={settings.logo || ''} onChange={(e) => updateSettings({ logo: e.target.value })} />
        <Input label="Dirección" value={settings.direccion} onChange={(e) => updateSettings({ direccion: e.target.value })} />
        <Input label="Teléfono" value={settings.telefono} onChange={(e) => updateSettings({ telefono: e.target.value })} />
        <Input label="Email" value={settings.email} onChange={(e) => updateSettings({ email: e.target.value })} />
        <Input label="Moneda" value={settings.moneda} readOnly />
      </div>
    </Card>
  );
}
