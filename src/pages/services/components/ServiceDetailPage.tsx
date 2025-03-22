import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, ChevronLeft } from 'lucide-react';
import { useServiceStore } from '../../../store/serviceStore';

const ServiceDetailPage = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { services } = useServiceStore();
  const [service, setService] = useState<any>(null);
  const [sameCategoryServices, setSameCategoryServices] = useState<any[]>([]);
  const [otherCategoriesServices, setOtherCategoriesServices] = useState<{ [key: string]: any[] }>({});

  useEffect(() => {
    const loadData = async () => {
      window.scrollTo(0, 0);
      const selectedService = services.find(s => s._id === serviceId);
      
      if (selectedService) {
        setService(selectedService);
        
        const sameCategory = services.filter(s => 
          s.category === selectedService.category && 
          s._id !== selectedService._id
        );
        setSameCategoryServices(sameCategory);
        
        const otherCategories = services.filter(s => 
          s.category !== selectedService.category
        ).reduce((acc: { [key: string]: any[] }, service) => {
          if (!acc[service.category]) {
            acc[service.category] = [];
          }
          acc[service.category].push(service);
          return acc;
        }, {});
        
        setOtherCategoriesServices(otherCategories);
      }
    };

    if (services.length === 0) {
      // Si no hay servicios, redirigir después de un tiempo
      const timer = setTimeout(() => navigate('/dashboard/services'), 2000);
      return () => clearTimeout(timer);
    } else {
      loadData();
    }
  }, [serviceId, services, navigate]);

  const handleBack = () => {
    navigate(-1); // Navegar a la página anterior
  };

  if (!service) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  const handleServiceClick = (id: string) => {
    navigate(`/dashboard/services/${id}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="pt-16 pb-20 md:pt-20 lg:pb-0 bg-gray-50 ">
      {/* Botón de retroceso */}
      <button 
        onClick={handleBack}
        className="fixed top-3 left-4 z-50 p-2 bg-white   rounded-full shadow-lg hover:bg-gray-50 md:hidden"
      >
        <ChevronLeft className="h-6 w-6 text-gray-600" />
      </button>

      {/* Mobile View */}
      <div className="md:hidden p-4">
        {/* Encabezado */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold">{service.name}</h1>
          <p className="text-gray-600">{service.description}</p>
        </div>

        {/* Imagen del servicio */}
        <div className="relative pt-[70%] mb-4">
          <img 
            src={service.image || 'https://placehold.co/300x200'} 
            alt={service.name}
            className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
          />
        </div>
        
        {/* Detalles del servicio */}
        <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xl font-bold text-gray-900">{service.price.toFixed(2)} €</span>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-gray-400" />
              <span className="text-xs text-gray-600">{service.duration} min</span>
            </div>
          </div>
          <div className="mb-3">
            <span className="inline-block bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
              Puntos: {service.points}
            </span>
          </div>
          <button className="w-full bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700">
            Reservar cita
          </button>
        </div>

        {/* Servicios relacionados */}
        <div className="mt-6">
          {sameCategoryServices.length > 0 && (
            <>
              <h2 className="text-xl font-bold mb-4">Misma categoría</h2>
              <div className="flex overflow-x-auto pb-4 space-x-3 hide-scrollbar">
                {sameCategoryServices.map(service => (
                  <div 
                    key={service._id}
                    className="flex-shrink-0 w-48 bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer"
                    onClick={() => handleServiceClick(service._id)}
                  >
                    <div className="relative pt-[100%]">
                      <img
                        src={service.image || 'https://placehold.co/300x200'}
                        alt={service.name}
                        className="absolute top-0 left-0 w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-gray-800 truncate">{service.name}</h3>
                      <p className="text-sm text-gray-500 truncate mb-2">{service.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold">{service.price.toFixed(2)} €</span>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-gray-400 mr-1" />
                          <span className="text-xs">{service.duration}m</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {Object.entries(otherCategoriesServices).map(([category, services]) => (
            <div key={category} className="mt-6">
              <h2 className="text-xl font-bold mb-4">{category}</h2>
              <div className="flex overflow-x-auto pb-4 space-x-3 hide-scrollbar">
                {services.map(service => (
                  <div
                    key={service._id}
                    className="flex-shrink-0 w-48 bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer"
                    onClick={() => handleServiceClick(service._id)}
                  >
                    <div className="relative pt-[100%]">
                      <img
                        src={service.image || 'https://placehold.co/300x200'}
                        alt={service.name}
                        className="absolute top-0 left-0 w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-gray-800 truncate">{service.name}</h3>
                      <p className="text-sm text-gray-500 truncate mb-2">{service.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold">{service.price.toFixed(2)} €</span>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-gray-400 mr-1" />
                          <span className="text-xs">{service.duration}m</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block p-4">
        <div className="flex gap-8">
          <div className="w-1/3">
            <div className="relative pt-[80%] rounded-xl overflow-hidden shadow-lg">
              <img 
                src={service.image || 'https://placehold.co/300x200'} 
                alt={service.name}
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="w-2/3">
            <h1 className="text-3xl font-bold mb-4">{service.name}</h1>
            <p className="text-gray-600 text-lg mb-6">{service.description}</p>
            
            <div className="flex justify-between items-center mb-6">
              <span className="text-2xl font-bold text-gray-900">{service.price.toFixed(2)} €</span>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600">{service.duration} minutos</span>
              </div>
            </div>
            
            <div className="mb-6">
              <span className="inline-block bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                Puntos: {service.points}
              </span>
            </div>
            
            <button className="w-full bg-amber-600 text-white px-6 py-3 rounded-xl hover:bg-amber-700 transition-colors text-lg">
              Reservar cita
            </button>
          </div>
        </div>

        {/* Servicios relacionados */}
        <div className="mt-12">
          {sameCategoryServices.length > 0 && (
            <>
              <h2 className="text-2xl font-bold mb-6">Servicios de la misma categoría</h2>
              <div className="grid grid-cols-3 gap-4 mb-8">
                {sameCategoryServices.map(service => (
                  <div
                    key={service._id}
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md"
                  >
                    <div 
                      className="relative pt-[70%] cursor-pointer"
                      onClick={() => handleServiceClick(service._id)}
                    >
                      <img
                        src={service.image || 'https://placehold.co/300x200'}
                        alt={service.name}
                        className="absolute top-0 left-0 w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg truncate">{service.name}</h3>
                      <p className="text-gray-500 text-sm truncate mb-3">{service.description}</p>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xl font-bold">{service.price.toFixed(2)} €</span>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-gray-400 mr-1" />
                          <span className="text-sm">{service.duration}m</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleServiceClick(service._id)}
                        className="w-full bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700"
                      >
                        Reservar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {Object.entries(otherCategoriesServices).map(([category, services]) => (
            <div key={category} className="mt-8">
              <h2 className="text-2xl font-bold mb-6">{category}</h2>
              <div className="grid grid-cols-3 gap-4">
                {services.map(service => (
                  <div
                    key={service._id}
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md"
                  >
                    <div 
                      className="relative pt-[70%] cursor-pointer"
                      onClick={() => handleServiceClick(service._id)}
                    >
                      <img
                        src={service.image || 'https://placehold.co/300x200'}
                        alt={service.name}
                        className="absolute top-0 left-0 w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg truncate">{service.name}</h3>
                      <p className="text-gray-500 text-sm truncate mb-3">{service.description}</p>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xl font-bold">{service.price.toFixed(2)} €</span>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-gray-400 mr-1" />
                          <span className="text-sm">{service.duration}m</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleServiceClick(service._id)}
                        className="w-full bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700"
                      >
                        Reservar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ServiceDetailPage;