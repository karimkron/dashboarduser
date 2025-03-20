import { useState } from 'react';
  {/*import { Calendar, Award, Clock, Scissors } from 'lucide-react';*/}
import ProfileHeader from './components/ProfileHeader';
import ProfileStats from './components/ProfileStats';
import FavoriteLooks from './components/FavoriteLooks';
import AppointmentHistory from './components/AppointmentHistory';
import LoyaltyPoints from './components/LoyaltyPoints';
import PreferredServices from './components/PreferredServices';

const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState('overview');
  
    const tabs = [
      { id: 'overview', label: 'Vista General' },
      { id: 'appointments', label: 'Mis Citas' },
      { id: 'favorites', label: 'Favoritos' },
      { id: 'points', label: 'Puntos' },
    ];
  
    return (
      <div className="space-y-6 -m-6"> {/* Agregamos margin negativo */}
        {/* Cabecera del perfil */}
        <ProfileHeader />
  
        {/* Navegación por pestañas */}
        <div className="bg-white border-y"> {/* Quitamos rounded y shadow */}
          <div className="max-w-7xl mx-auto">
            <nav className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors
                    ${activeTab === tab.id
                      ? 'border-amber-600 text-amber-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
  
        {/* Contenido de las pestañas */}
        <div className="max-w-7xl mx-auto px-6">
          {activeTab === 'overview' && (
            <div className="grid gap-6 md:grid-cols-2">
              <ProfileStats />
              <PreferredServices />
              <FavoriteLooks />
              <LoyaltyPoints />
            </div>
          )}
  
          {activeTab === 'appointments' && (
            <div className="-mx-6"> {/* Margin negativo para full width */}
              <AppointmentHistory />
            </div>
          )}
  
          {activeTab === 'favorites' && (
            <div className="grid gap-6 md:grid-cols-2">
              <FavoriteLooks expanded />
              <PreferredServices expanded />
            </div>
          )}
  
          {activeTab === 'points' && (
            <div className="-mx-6"> {/* Margin negativo para full width */}
              <LoyaltyPoints expanded />
            </div>
          )}
        </div>
      </div>
    );
  };
  
export default ProfilePage;