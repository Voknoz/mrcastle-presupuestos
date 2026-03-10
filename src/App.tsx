import { Navigate, Route, Routes } from 'react-router-dom';
import AppShell from './components/layaout/AppShell';
import DashboardPage from './pages/DashboardPage';
import NuevoPresupuestoPage from './pages/NuevoPresupuestoPage';
import HistorialPage from './pages/HistorialPage';
import ConfiguracionPage from './pages/ConfiguracionPage';
import NotFoundPage from './pages/NotFoundPage';
import RecepcionNuevaPage from './pages/RecepcionNuevaPage';
import RecepcionHistorialPage from './pages/RecepcionHistorialPage';

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/presupuestos/nuevo" element={<NuevoPresupuestoPage />} />
        <Route path="/presupuestos/:id" element={<NuevoPresupuestoPage />} />
        <Route path="/historial" element={<HistorialPage />} />
        <Route path="/configuracion" element={<ConfiguracionPage />} />
        <Route path="/app" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/recepcion/nueva" element={<RecepcionNuevaPage />} />
        <Route path="/recepcion/historial" element={<RecepcionHistorialPage />} />
      </Routes>
    </AppShell>
  );
}
