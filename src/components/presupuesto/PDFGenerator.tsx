import { Download } from 'lucide-react';
import Button from '../ui/Button';
import { usePresupuestoStore } from '../../store/presupuesto.store';
import { generatePresupuestoPDF } from '../../services/pdf.service';

export default function PDFGenerator() {
  const current = usePresupuestoStore((s) => s.current);

  return (
    <Button full onClick={() => generatePresupuestoPDF(current)}>
      <Download size={18} className="mr-2" />
      Descargar presupuesto en PDF
    </Button>
  );
}
