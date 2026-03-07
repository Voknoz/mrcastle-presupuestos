export const formatDate = (value: string) =>
  new Date(value).toLocaleDateString('es-CL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
