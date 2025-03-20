import { ReactNode } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Home, User, Calendar, Package, Settings } from 'lucide-react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useUIStore } from '../../store/uiStore'; // Importar el store para acceder al estado del sidebar

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();
  const { isSidebarOpen } = useUIStore(); // Obtener el estado del sidebar

  const mobileMenuItems = [
    { 
      icon: Home, 
      label: 'Dashboard', 
      path: '/dashboard',
    },
    { 
      icon: Package, 
      label: 'Servicios', 
      path: '/dashboard/services',
    },
    { 
      icon: Calendar, 
      label: 'Citas', 
      path: '/dashboard/appointments',
    },
    { 
      icon: User, 
      label: 'Perfil', 
      path: '/dashboard/profile',
    },
    { 
      icon: Settings, 
      label: 'Ajustes', 
      path: '/dashboard/settings',
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      {/* Ajustar el margen izquierdo dinámicamente */}
      <div className={`min-h-screen pb-16 lg:pb-0 transition-all duration-300 ${
        isSidebarOpen ? 'lg:ml-64' : 'lg:ml-20'
      }`}>
        <Header />
        <main className="">
          {children}
        </main>
      </div>
      
      {/* Menú móvil mejorado */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex items-center justify-around">
          {mobileMenuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center py-2 px-3 transition-colors ${
                location.pathname === item.path
                  ? 'text-amber-600'
                  : 'text-gray-600 hover:text-amber-600'
              }`}
            >
              <item.icon className={`h-6 w-6 ${
                location.pathname === item.path
                  ? 'text-amber-600'
                  : 'text-gray-600'
              }`} />
              <span className="text-xs mt-1">{item.label}</span>
              {location.pathname === item.path && (
                <span className="absolute top-0 h-1 w-10 bg-amber-600 rounded-b-full"></span>
              )}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default DashboardLayout;