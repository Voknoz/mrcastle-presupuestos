import { jsPDF } from 'jspdf';
import { autoTable } from 'jspdf-autotable';
import { Presupuesto } from '../types/presupuesto';
import { formatCLP } from '../utils/currency';
import { formatDate } from '../utils/date';
import { loadImageAsDataUrl } from '../utils/image';
import { useSettingsStore } from '../store/settings.store';

export async function generatePresupuestoPDF(presupuesto: Presupuesto) {
  const settings = useSettingsStore.getState().settings;

  const doc = new jsPDF();
  const dark = '#0f172a';
  const blue = '#1d4ed8';
  const gray = '#64748b';
  const text = '#111827';

  const pageWidth = doc.internal.pageSize.getWidth();

  try {
    const watermark = await loadImageAsDataUrl('/logo-watermark.jpg', 0.08);
    const imgWidth = 92;
    const imgHeight = 92;
    const x = (pageWidth - imgWidth) / 2;
    const y = 36;

    doc.addImage(watermark, 'PNG', x, y, imgWidth, imgHeight);
  } catch (error) {
    console.warn('No se pudo cargar el sello de agua', error);
  }

  doc.setFillColor(dark);
  doc.roundedRect(12, 10, 186, 28, 4, 4, 'F');

  doc.setTextColor('#ffffff');
  doc.setFontSize(17);
  doc.text(settings.nombreEmpresa, 18, 20);

  doc.setFontSize(10);
  doc.text(settings.email, 18, 27);

  doc.setFontSize(11);
  doc.text('Presupuesto de trabajos mecánicos', 18, 34);

  doc.setTextColor('#cbd5e1');
  doc.setFontSize(10);
  doc.text(`N° ${presupuesto.numero}`, 150, 20);
  doc.text(`Fecha ${formatDate(presupuesto.fechaCreacion)}`, 150, 27);

  let y = 50;

  doc.setTextColor(blue);
  doc.setFontSize(12);
  doc.text('Cliente', 14, y);
  doc.text('Vehículo', 108, y);

  y += 6;
  doc.setTextColor(text);
  doc.setFontSize(10);

  const clienteLines = [
    `Nombre: ${presupuesto.cliente.nombre}`,
    `RUT: ${presupuesto.cliente.rut || '-'}`,
    `Teléfono: ${presupuesto.cliente.telefono}`,
    `Email: ${presupuesto.cliente.email}`,
    `Dirección: ${presupuesto.cliente.direccion}`
  ];

  const vehiculoLines = [
    `Patente: ${presupuesto.vehiculo.patente}`,
    `Marca: ${presupuesto.vehiculo.marca}`,
    `Modelo: ${presupuesto.vehiculo.modelo}`,
    `Año: ${presupuesto.vehiculo.anio || '-'}`,
    `Kilometraje: ${presupuesto.vehiculo.kilometraje || '-'}`
  ];

  let clienteY = y;
  clienteLines.forEach((line) => {
    doc.text(line, 14, clienteY);
    clienteY += 5;
  });

  let vehiculoY = y;
  vehiculoLines.forEach((line) => {
    doc.text(line, 108, vehiculoY);
    vehiculoY += 5;
  });

  const infoBottomY = Math.max(clienteY, vehiculoY) + 6;

  autoTable(doc, {
    startY: infoBottomY,
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
      textColor: [255, 255, 255],
      fontSize: 9
    },
    styles: {
      fontSize: 9,
      cellPadding: 3,
      textColor: [17, 24, 39]
    },
    columnStyles: {
      0: { cellWidth: 54 },
      1: { cellWidth: 22 },
      2: { halign: 'center', cellWidth: 14 },
      3: { halign: 'right', cellWidth: 25 },
      4: { halign: 'right', cellWidth: 25 },
      5: { halign: 'center', cellWidth: 22 },
      6: { halign: 'right', cellWidth: 26 }
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

  const observaciones = presupuesto.observaciones?.trim()
    ? presupuesto.observaciones
    : '-';

  const observacionesLines = doc.splitTextToSize(
    `Observaciones: ${observaciones}`,
    180
  );

  doc.setFontSize(10);
  doc.text(observacionesLines, 14, finalY + 22);

  doc.save(`${presupuesto.numero}.pdf`);
}
