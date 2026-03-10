 import { Download } from 'lucide-react';
import Button from '../ui/Button';
import { useRecepcionStore } from '../../store/recepcion.store';
import { generateRecepcionPDF } from '../../services/recepcion-pdf.service';

export default function RecepcionPDFButton() {
  const current = useRecepcionStore((s) => s.current);

  return (
    <Button
      full
      variant="secondary"
      onClick={() => generateRecepcionPDF(current)}
    >
      <Download size={18} className="mr-2" />
      Descargar recepción en PDF
    </Button>
  );
}
