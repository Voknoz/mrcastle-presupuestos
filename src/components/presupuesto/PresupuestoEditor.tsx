import { MessageCircle, Save, Send, Printer } from 'lucide-react';
import ClienteForm from '../forms/ClienteForm';
import VehiculoForm from '../forms/VehiculoForm';
import PresupuestoMetaForm from '../forms/PresupuestoMetaForm';
import PresupuestoItemsTable from './PresupuestoItemsTable';
import PresupuestoSummary from './PresupuestoSummary';
import PDFGenerator from './PDFGenerator';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { usePresupuestoStore } from '../../store/presupuesto.store';
import { useSettingsStore } from '../../store/settings.store';
import { buildMailtoLink, buildWhatsAppLink } from '../../services/share.service';
import { validatePresupuesto } from '../../utils/validators';
import { useAutosave } from '../../hooks/useAutoSave';

export default function PresupuestoEditor() {
  const current = usePresupuestoStore((s) => s.current);
  const saveCurrent = usePresupuestoStore((s) => s.saveCurrent);
  const recalcCurrent = usePresupuestoStore((s) => s.recalcCurrent);
  const settings = useSettingsStore((s) => s.settings);

  useAutosave(() => recalcCurrent(settings.iva), [current.items, settings.iva]);

  const handleSave = () => {
    recalcCurrent(settings.iva);
    const errors = validatePresupuesto(current);
    if (errors.length) {
      alert(errors.join('\n'));
      return;
    }
    saveCurrent(settings.iva);
    alert('Presupuesto guardado correctamente');
  };

  const handleEmail = () => {
    window.location.href = buildMailtoLink(current);
  };

  const handleWhatsapp = () => {
    window.open(buildWhatsAppLink(current), '_blank');
  };

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_360px]">
      <div className="space-y-4">
        <ClienteForm />
        <VehiculoForm />
        <PresupuestoMetaForm />
        <PresupuestoItemsTable />
      </div>

      <div className="space-y-4">
        <PresupuestoSummary />
        <Card title="Acciones">
          <div className="grid grid-cols-1 gap-3">
            <Button full onClick={handleSave}>
              <Save size={18} className="mr-2" />
              Guardar presupuesto
            </Button>
            <PDFGenerator />
            <Button full variant="secondary" onClick={handleEmail}>
              <Send size={18} className="mr-2" />
              Enviar por correo
            </Button>
            <Button full variant="secondary" onClick={handleWhatsapp}>
              <MessageCircle size={18} className="mr-2" />
              Enviar por WhatsApp
            </Button>
            <Button full variant="secondary" onClick={() => window.print()}>
              <Printer size={18} className="mr-2" />
              Imprimir
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
