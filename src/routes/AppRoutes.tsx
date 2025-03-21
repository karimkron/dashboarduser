import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import ProfilePage from '../pages/profile/ProfilePage';
import NotificationsPage from '../pages/notifications/NotificationsPage';
import ServicesPage from '../pages/services/ServicesPage';
import AppointmentsPage from '../pages/appointments/AppointmentsPage';
import SettingsPage from '../pages/settings/SettingsPage';
import DashboardPage from '../pages/dashboard/DashboardPage';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';
import ResetPasswordPage from '../pages/auth/ResetPasswordPage';
import VerifyEmailPage from '../pages/auth/VerifyEmailPage';
import ProductsPage from '../pages/Products/ProductsPage';

// Componente para proteger rutas que requieren autenticación
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Verifica si el usuario está autenticado

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />; // Redirige a login si no está autenticado
  }

  return children; // Renderiza el componente protegido si está autenticado
};

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Rutas de autenticación */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />

        {/* Ruta raíz: Redirige al dashboard si está autenticado, de lo contrario al login */}
        <Route
          path="/"
          element={
            <Navigate to={localStorage.getItem('token') ? '/dashboard' : '/login'} replace />
          }
        />

        {/* Rutas del Dashboard (requieren autenticación) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <DashboardPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/profile"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <ProfilePage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/products"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <ProductsPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/notifications"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <NotificationsPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/appointments"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <AppointmentsPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/services"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <ServicesPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/settings"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <SettingsPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;