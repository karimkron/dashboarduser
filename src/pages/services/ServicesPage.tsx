import { useState, useEffect } from 'react';
import { Clock, DollarSign, Search, RefreshCw } from 'lucide-react';
import api from '../../services/api'; // Importa la instancia de la API

interface Service {
  _id: string; // Cambiado a _id para coincidir con MongoDB
  name: string;
  description: string;
  price: number;
  duration: number; // Cambiado a number para coincidir con el backend
  category: string;
  image: string;
  points: number; // Puntos de recompensa
}

const ServicesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [services, setServices] = useState<Service[]>([]); // Estado para almacenar los servicios
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(''); // Estado para manejar errores
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]); // Estado para las categorías
  const [isSearchFocused, setIsSearchFocused] = useState(false); // Estado para manejar el foco en el input de búsqueda

  // Función para obtener los servicios desde la API o localStorage
  const fetchServices = async () => {
    try {
      const response = await api.get<Service[]>('/api/services'); // Tipar la respuesta como Service[]
      const servicesData = response.data;

      // Obtener categorías únicas de los servicios
      const uniqueCategories = Array.from(new Set(servicesData.map(service => service.category)))
        .map(category => ({ id: category, name: category }));

      // Guardar servicios y categorías en localStorage
      localStorage.setItem('services', JSON.stringify(servicesData));
      localStorage.setItem('categories', JSON.stringify(uniqueCategories));

      // Actualizar el estado
      setServices(servicesData);
      setCategories([{ id: 'all', name: 'Todos' }, ...uniqueCategories]);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener los servicios:', error);
      setError('Error al cargar los servicios. Inténtalo de nuevo más tarde.');
      setLoading(false);
    }
  };

  // Cargar servicios al montar el componente
  useEffect(() => {
    const storedServices = localStorage.getItem('services');
    const storedCategories = localStorage.getItem('categories');

    if (storedServices && storedCategories) {
      // Si los servicios y categorías están en localStorage, usarlos
      setServices(JSON.parse(storedServices));
      setCategories(JSON.parse(storedCategories));
      setLoading(false);
    } else {
      // Si no están en localStorage, hacer la solicitud a la API
      fetchServices();
    }
  }, []);

  // Actualizar servicios cuando el componente se monta o cuando el usuario sale y vuelve
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchServices(); // Actualizar servicios cuando la página vuelve a estar visible
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Filtrar servicios según la categoría seleccionada y la búsqueda
  const filteredServices = services.filter(service =>
    (selectedCategory === 'all' || service.category === selectedCategory) &&
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Cargando servicios...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-6 -m-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-amber-900 border-b">
        <div className="max-w-7xl mx-auto p-6">
          <div className="text-center py-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Nuestros Servicios
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Descubre nuestra amplia gama de servicios profesionales diseñados para realzar tu estilo personal
            </p>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar servicios..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Botón de actualización */}
            <button
              onClick={fetchServices}
              className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <RefreshCw className="h-5 w-5" />
              <span className="hidden md:inline">Actualizar</span>
            </button>
          </div>

          {/* Categories */}
          <div className="flex overflow-x-auto gap-2 pb-2 md:pb-0 w-full md:w-auto mt-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors
                  ${selectedCategory === category.id
                    ? 'bg-amber-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto p-6">
        <div className={`grid grid-cols-1 ${isSearchFocused ? 'md:grid-cols-1' : 'md:grid-cols-2 lg:grid-cols-3'} gap-6`}>
          {filteredServices.map((service) => (
            <div
              key={service._id} // Usar _id como clave única
              className="bg-white border rounded-lg overflow-hidden hover:border-amber-600 transition-colors"
            >
              <div className="aspect-video relative">
                <img
                  src={service.image || 'https://placehold.co/300x200'} // Usar una URL de respaldo que funcione
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {service.name}
                </h3>
                <p className="text-gray-600 mb-4">{service.description}</p>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-600">{service.duration} min</span> {/* Mostrar duración en minutos */}
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-600">${service.price}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-600">Puntos: {service.points}</span> {/* Mostrar puntos de recompensa */}
                  </div>
                </div>

                <button
                  className="w-full bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  Reservar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;