// src/pages/settings/SettingsPage.tsx
import { useState } from 'react';
import { Bell, Shield, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SettingsPage = () => {
  const navigate = useNavigate(); // Hook para redireccionar
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState({
    darkMode: false,
    emailNotifications: true,
    smsNotifications: true,
    language: 'es',
    twoFactorAuth: false
  });

  const handleLogout = () => {
    // 1. Eliminar el token de autenticación (si está en localStorage)
    localStorage.removeItem('authToken'); // Cambia 'authToken' por la clave que uses para almacenar el token

    // 2. Redirigir al usuario a la página de inicio de sesión
    navigate('/login'); // Cambia '/login' por la ruta de tu página de inicio de sesión
  };

  const tabs = [
    { id: 'profile', label: 'Perfil', icon: User },
    { id: 'notifications', label: 'Notificaciones', icon: Bell },
    { id: 'security', label: 'Seguridad', icon: Shield },
    { id: 'preferences', label: 'Preferencias', icon: Shield }
  ];

  return (
    <div className="space-y-6 -m-6">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto p-6">
          <h1 className="text-2xl font-bold text-gray-900">Configuración</h1>
          <p className="text-gray-600">Gestiona tus preferencias y configuración de cuenta</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                  ${activeTab === tab.id
                    ? 'bg-amber-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 bg-white border rounded-lg">
            <div className="p-6">
            {activeTab === 'profile' && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Información Personal</h2>
                            
                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nombre
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
                          defaultValue="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
                          defaultValue="john@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Teléfono
                        </label>
                        <input
                          type="tel"
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
                          defaultValue="+34 123 456 789"
                        />
                      </div>
                    </div>
                            
                    <div className="pt-6 border-t">
                      <button className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors">
                        Guardar Cambios
                      </button>
                    </div>
                            
                    {/* Agregar sección de cerrar sesión */}
                    <div className="pt-6 mt-6 border-t">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Cerrar Sesión</h3>
                      <p className="text-gray-600 mb-4">¿Estás seguro que quieres cerrar sesión?</p>
                      <button 
                         onClick={handleLogout}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Cerrar Sesión
                      </button>
                    </div>
                  </div>
                )}

              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Preferencias de Notificaciones</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">Notificaciones por Email</h3>
                        <p className="text-sm text-gray-500">Recibe actualizaciones sobre tus citas</p>
                      </div>
                      <button
                        onClick={() => setSettings({...settings, emailNotifications: !settings.emailNotifications})}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                          ${settings.emailNotifications ? 'bg-amber-600' : 'bg-gray-200'}`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                            ${settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'}`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">Notificaciones SMS</h3>
                        <p className="text-sm text-gray-500">Recibe recordatorios por mensaje de texto</p>
                      </div>
                      <button
                        onClick={() => setSettings({...settings, smsNotifications: !settings.smsNotifications})}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                          ${settings.smsNotifications ? 'bg-amber-600' : 'bg-gray-200'}`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                            ${settings.smsNotifications ? 'translate-x-6' : 'translate-x-1'}`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Seguridad</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Cambiar Contraseña</h3>
                      <div className="space-y-3">
                        <input
                          type="password"
                          placeholder="Contraseña actual"
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
                        />
                        <input
                          type="password"
                          placeholder="Nueva contraseña"
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
                        />
                        <input
                          type="password"
                          placeholder="Confirmar nueva contraseña"
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
                        />
                        <button className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors">
                          Actualizar Contraseña
                        </button>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">Autenticación de dos factores</h3>
                          <p className="text-sm text-gray-500">Añade una capa extra de seguridad a tu cuenta</p>
                        </div>
                        <button
                          onClick={() => setSettings({...settings, twoFactorAuth: !settings.twoFactorAuth})}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                            ${settings.twoFactorAuth ? 'bg-amber-600' : 'bg-gray-200'}`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                              ${settings.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'}`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'preferences' && (
                <div className="space-y-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Preferencias</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">Modo Oscuro</h3>
                        <p className="text-sm text-gray-500">Cambia la apariencia de la aplicación</p>
                      </div>
                      <button
                        onClick={() => setSettings({...settings, darkMode: !settings.darkMode})}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                          ${settings.darkMode ? 'bg-amber-600' : 'bg-gray-200'}`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                            ${settings.darkMode ? 'translate-x-6' : 'translate-x-1'}`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;