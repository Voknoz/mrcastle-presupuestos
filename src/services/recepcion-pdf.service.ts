import { jsPDF } from 'jspdf';
import { useSettingsStore } from '../store/settings.store';
import { RecepcionVehiculo } from '../types/recepcion';
import { loadImageAsDataUrl } from '../utils/image';

export async function generateRecepcionPDF(data: RecepcionVehiculo) {
  const settings = useSettingsStore.getState().settings;
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  try {
    const watermark = await loadImageAsDataUrl('/logo-watermark.jpg', 0.16);
    const imgWidth = 92;
    const imgHeight = 92;
    const x = (pageWidth - imgWidth) / 2;
    const y = 55;

    doc.addImage(watermark, 'PNG', x, y, imgWidth, imgHeight);
  } catch (error) {
    console.warn('No se pudo cargar el sello de agua en recepción', error);

    doc.setTextColor(230, 230, 230);
    doc.setFontSize(42);
    doc.text('MRCastle', 55, 150, { angle: 35 });
  }

  doc.setFillColor('#0f172a');
  doc.roundedRect(12, 10, 186, 26, 4, 4, 'F');

  doc.setTextColor('#ffffff');
  doc.setFontSize(16);
  doc.text(settings.nombreEmpresa, 18, 20);
  doc.setFontSize(10);
  doc.text(settings.email, 18, 27);
  doc.text('Recepción de vehículo', 140, 27);

  let y = 48;
  doc.setTextColor('#111827');
  doc.setFontSize(12);
  doc.text('Datos del cliente', 14, y);
  doc.text('Datos del vehículo', 108, y);

  y += 6;
  doc.setFontSize(10);

  let leftY = y;
  doc.text(`Nombre: ${data.cliente.nombre || '-'}`, 14, leftY);
  leftY += 5;
  doc.text(`Teléfono: ${data.cliente.telefono || '-'}`, 14, leftY);
  leftY += 5;
  doc.text(`Email: ${data.cliente.email || '-'}`, 14, leftY);

  let rightY = y;
  doc.text(`Patente: ${data.vehiculo.patente || '-'}`, 108, rightY);
  rightY += 5;
  doc.text(`Marca: ${data.vehiculo.marca || '-'}`, 108, rightY);
  rightY += 5;
  doc.text(`Modelo: ${data.vehiculo.modelo || '-'}`, 108, rightY);
  rightY += 5;
  doc.text(`Año: ${data.vehiculo.anio || '-'}`, 108, rightY);
  rightY += 5;
  doc.text(`Color: ${data.vehiculo.color || '-'}`, 108, rightY);
  rightY += 5;
  doc.text(`Kilometraje: ${data.vehiculo.kilometraje || '-'}`, 108, rightY);

  y = Math.max(leftY, rightY) + 8;

  doc.setFontSize(10);
  doc.text(`Fecha: ${data.fecha || '-'}`, 14, y);
  doc.text(`Hora: ${data.hora || '-'}`, 70, y);
  doc.text(`Combustible: ${data.nivelCombustible || '-'}`, 120, y);

  y += 8;

  const motivo = doc.splitTextToSize(`Motivo de ingreso: ${data.motivoIngreso || '-'}`, 180);
  doc.text(motivo, 14, y);
  y += motivo.length * 5 + 3;

  const testigos = doc.splitTextToSize(`Testigos encendidos: ${data.testigosEncendidos || '-'}`, 180);
  doc.text(testigos, 14, y);
  y += testigos.length * 5 + 3;

  const danos = doc.splitTextToSize(`Daños visibles: ${data.danosVisibles || '-'}`, 180);
  doc.text(danos, 14, y);
  y += danos.length * 5 + 3;

  const obsCliente = doc.splitTextToSize(`Observaciones del cliente: ${data.observacionesCliente || '-'}`, 180);
  doc.text(obsCliente, 14, y);
  y += obsCliente.length * 5 + 3;

  const obsInternas = doc.splitTextToSize(`Observaciones internas: ${data.observacionesInternas || '-'}`, 180);
  doc.text(obsInternas, 14, y);
  y += obsInternas.length * 5 + 8;

  doc.setFontSize(11);
  doc.text('Checklist', 14, y);
  y += 6;
  doc.setFontSize(10);

  Object.entries(data.checklist).forEach(([key, value]) => {
    doc.text(`${key}: ${value}`, 14, y);
    y += 5;
  });

  y += 4;
  doc.setFontSize(11);
  doc.text('Accesorios entregados', 14, y);
  y += 6;
  doc.setFontSize(10);

  const accesorios = Object.entries(data.accesorios)
    .filter(([, value]) => value)
    .map(([key]) => key)
    .join(', ');

  const accesoriosLines = doc.splitTextToSize(accesorios || 'Ninguno', 180);
  doc.text(accesoriosLines, 14, y);

  doc.save(`${data.numero}-recepcion.pdf`);
}
