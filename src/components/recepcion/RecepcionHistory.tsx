import { Copy, Download, Eye, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Card from '../ui/Card';
import Button from '../ui/Button';
import EmptyState from '../ui/EmptyState';
import { useRecepcionStore } from '../../store/recepcion.store';
import { generateRecepcionPDF } from '../../services/recepcion-pdf.service';
import { formatDate } from '../../utils/date';

export default function RecepcionHistory() {
  const navigate = useNavigate();
  const recepciones = useRecepcionStore((s) => s.recepciones);
  const setCurrent = useRecepcionStore((s) => s.setCurrent);
  const deleteById = useRecepcionStore((s) => s.deleteById);
  const duplicateById = useRecepcionStore((s) => s.duplicateById);

  if (!recepciones.length) {
    return (
      <EmptyState
        title="No hay recepciones registradas"
        description="Cuando guardes una recepción de vehículo aparecerá aquí."
      />
    );
  }

  return (
    <div className="space-y-4">
      <Card title="Historial de recepción de vehículos">
        <div className="hidden overflow-x-auto md:block">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="p-3 text-left">N°</th>
                <th className="p-3 text-left">Fecha</th>
                <th className="p-3 text-left">Cliente</th>
                <th className="p-3 text-left">Vehículo</th>
                <th className="p-3 text-left">Patente</th>
                <th className="p-3 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {recepciones.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="p-3">{item.numero}</td>
                  <td className="p-3">{formatDate(item.fecha)}</td>
                  <td className="p-3">{item.cliente.nombre}</td>
                  <td className="p-3">{item.vehiculo.marca} {item.vehiculo.modelo}</td>
                  <td className="p-3">{item.vehiculo.patente}</td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="secondary"
                        className="min-h-10 px-3 py-2"
                        onClick={() => {
                          setCurrent(item);
                          navigate('/recepcion/nueva');
                        }}
                      >
                        <Eye size={16} className="mr-2" />
                        Ver
                      </Button>

                      <Button
                        variant="secondary"
                        className="min-h-10 px-3 py-2"
                        onClick={() => generateRecepcionPDF(item)}
                      >
                        <Download size={16} className="mr-2" />
                        PDF
                      </Button>

                      <Button
                        variant="secondary"
                        className="min-h-10 px-3 py-2"
                        onClick={() => duplicateById(item.id)}
                      >
                        <Copy size={16} className="mr-2" />
                        Duplicar
                      </Button>

                      <Button
                        variant="danger"
                        className="min-h-10 px-3 py-2"
                        onClick={() => {
                          if (window.confirm('¿Eliminar esta recepción?')) {
                            deleteById(item.id);
                          }
                        }}
                      >
                        <Trash2 size={16} className="mr-2" />
                        Eliminar
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-4 md:hidden">
          {recepciones.map((item) => (
            <div key={item.id} className="rounded-2xl border border-slate-200 p-4">
              <div className="mb-2 text-sm text-slate-500">{item.numero}</div>
              <div className="font-semibold text-slate-900">{item.cliente.nombre}</div>
              <div className="text-sm text-slate-600">
                {item.vehiculo.marca} {item.vehiculo.modelo} · {item.vehiculo.patente}
              </div>
              <div className="mt-1 text-sm text-slate-500">{formatDate(item.fecha)}</div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <Button
                  variant="secondary"
                  className="min-h-10 px-3 py-2"
                  onClick={() => {
                    setCurrent(item);
                    navigate('/recepcion/nueva');
                  }}
                >
                  <Eye size={16} className="mr-2" />
                  Ver
                </Button>

                <Button
                  variant="secondary"
                  className="min-h-10 px-3 py-2"
                  onClick={() => generateRecepcionPDF(item)}
                >
                  <Download size={16} className="mr-2" />
                  PDF
                </Button>

                <Button
                  variant="secondary"
                  className="min-h-10 px-3 py-2"
                  onClick={() => duplicateById(item.id)}
                >
                  <Copy size={16} className="mr-2" />
                  Duplicar
                </Button>

                <Button
                  variant="danger"
                  className="min-h-10 px-3 py-2"
                  onClick={() => {
                    if (window.confirm('¿Eliminar esta recepción?')) {
                      deleteById(item.id);
                    }
                  }}
                >
                  <Trash2 size={16} className="mr-2" />
                  Eliminar
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
