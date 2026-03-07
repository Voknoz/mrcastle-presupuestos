import { jsPDF } from 'jspdf';
import { autoTable } from 'jspdf-autotable';
import { Presupuesto } from '../types/presupuesto';
import { formatCLP } from '../utils/currency';
import { formatDate } from '../utils/date';
import { loadImageAsDataUrl } from '../utils/image';

export async function generatePresupuestoPDF(presupuesto: Presupuesto) {
  const doc = new jsPDF();
  const dark = '#0f172a';
  const gray = '#64748b';
  const text = '#111827';

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  try {
    const watermark = await loadImageAsDataUrl('/logo-watermark.jpg', 0.3);

    const imgWidth = 92;
    const imgHeight = 92;
    const x = (pageWidth - imgWidth) / 2;
    const y = 38;

    doc.addImage(watermark, 'PNG', x, y, imgWidth, imgHeight);
  } catch (error) {
    console.warn('No se pudo cargar el sello de agua', error);
  }

  doc.setFillColor(dark);
  doc.roundedRect(12, 10, 186, 24, 4, 4, 'F');

  doc.setTextColor('#ffffff');
  doc.setFontSize(18);
  doc.text('MRCastle', 18, 22);

  doc.setFontSize(10);
  doc.text('Presupuesto de trabajos mecánicos', 18, 28);

  doc.setTextColor(gray);
  doc.setFontSize(10);
  doc.text(`N° ${presupuesto.numero}`, 150, 20);
  doc.text(`Fecha ${formatDate(presupuesto.fechaCreacion)}`, 150, 26);

  let y = 44;

  doc.setTextColor(text);
  doc.setFontSize(12);
  doc.text('Empresa', 14, y);
  y += 6;

  doc.setFontSize(10);
  doc.text(presupuesto.companySnapshot.nombreEmpresa, 14, y);
  y += 5;
  doc.text(presupuesto.companySnapshot.direccion, 14, y);
  y += 5;
  doc.text(
    `${presupuesto.companySnapshot.telefono} · ${presupuesto.companySnapshot.email}`,
    14,
    y
  );

  y += 10;
  doc.setFontSize(12);
  doc.text('Cliente', 14, y);
  y += 6;

  doc.setFontSize(10);
  doc.text(`Nombre: ${presupuesto.cliente.nombre}`, 14, y);
  y += 5;
  doc.text(`RUT: ${presupuesto.cliente.rut || '-'}`, 14, y);
  y += 5;
  doc.text(`Teléfono: ${presupuesto.cliente.telefono}`, 14, y);
  y += 5;
  doc.text(`Email: ${presupuesto.cliente.email}`, 14, y);
  y += 5;
  doc.text(`Dirección: ${presupuesto.cliente.direccion}`, 14, y);

  y += 10;
  doc.setFontSize(12);
  doc.text('Vehículo', 14, y);
  y += 6;

  doc.setFontSize(10);
  doc.text(`Patente: ${presupuesto.vehiculo.patente}`, 14, y);
  y += 5;
  doc.text(
    `Marca/Modelo: ${presupuesto.vehiculo.marca} ${presupuesto.vehiculo.modelo}`,
    14,
    y
  );
  y += 5;
  doc.text(
    `Año: ${presupuesto.vehiculo.anio || '-'} · Kilometraje: ${presupuesto.vehiculo.kilometraje || '-'}`,
    14,
    y
  );

  autoTable(doc, {
    startY: y + 8,
    head: [[
      'Descripción',
      'Tipo',
      'Cant.',
      'P. Unit.',
      'Mano obra',
      'Tiempo',
      'Subtotal'
    ]],
    body: presupuesto.items.map((item) => [
      item.descripcion,
      item.tipoTrabajo,
      item.cantidad,
      formatCLP(item.precioUnitario),
      formatCLP(item.manoObra),
      item.tiempoEstimado,
      formatCLP(item.subtotal)
    ]),
    theme: 'grid',
    headStyles: {
      fillColor: [15, 23, 42],
      textColor: [255, 255, 255]
    },
    styles: {
      fontSize: 9,
      cellPadding: 3,
      textColor: [17, 24, 39]
    }
  });

  const finalY = (doc as any).lastAutoTable.finalY + 10;

  doc.setTextColor(text);
  doc.setFontSize(10);
  doc.text(`Tiempo estimado de entrega: ${presupuesto.tiempoEntrega || '-'}`, 14, finalY);
  doc.text(`Estado: ${presupuesto.estado}`, 14, finalY + 6);

  doc.setFontSize(11);
  doc.text(`Subtotal: ${formatCLP(presupuesto.totales.subtotal)}`, 138, finalY);

  doc.setFontSize(13);
  doc.text(`Total: ${formatCLP(presupuesto.totales.total)}`, 138, finalY + 10);

  doc.setFontSize(10);
  doc.text(`Observaciones: ${presupuesto.observaciones || '-'}`, 14, finalY + 22);
  doc.text(`Condiciones: ${presupuesto.condicionesServicio || '-'}`, 14, finalY + 30);


  doc.save(`${presupuesto.numero}.pdf`);
}
