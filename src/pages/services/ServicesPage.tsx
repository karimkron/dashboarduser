import { useState, useEffect, useRef } from 'react';
import { Clock, Euro, Search, RefreshCw } from 'lucide-react';
import api from '../../services/api';

interface Service {
  _id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
  image: string;
  points: number;
}

const ServicesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  // Estado para controlar la visibilidad de la sección de filtros
  const [isVisible, setIsVisible] = useState(true);

  // Referencia al contenedor de scroll
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollYRef = useRef(0);
  const scrollThreshold = 10; // umbral para evitar cambios muy bruscos

  // Desactivar el rebote globalmente (por si acaso)
  useEffect(() => {
    document.documentElement.style.overscrollBehavior = 'none';
    document.body.style.overscrollBehavior = 'none';
    return () => {
      document.documentElement.style.overscrollBehavior = '';
      document.body.style.overscrollBehavior = '';
    };
  }, []);

  // Función para obtener los servicios desde la API o localStorage
  const fetchServices = async () => {
    try {
      const response = await api.get<Service[]>('/api/services');
      const servicesData = response.data;
      const uniqueCategories = Array.from(new Set(servicesData.map(service => service.category)))
        .map(category => ({ id: category, name: category }));
      localStorage.setItem('services', JSON.stringify(servicesData));
      localStorage.setItem('categories', JSON.stringify(uniqueCategories));
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
      setServices(JSON.parse(storedServices));
      setCategories(JSON.parse(storedCategories));
      setLoading(false);
    } else {
      fetchServices();
    }
  }, []);

  // Actualizar servicios al volver a la pestaña
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') fetchServices();
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchServices();
    setIsRefreshing(false);
  };

  const filteredServices = services.filter(service =>
    (selectedCategory === 'all' || service.category === selectedCategory) &&
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Escuchar el scroll en el contenedor de scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleScroll = () => {
      if (isSearchFocused) return;
      const currentScrollY = container.scrollTop;
      if (currentScrollY > lastScrollYRef.current + scrollThreshold) {
        // Scroll hacia abajo: ocultar la sección de filtros
        setIsVisible(false);
      } else if (currentScrollY < lastScrollYRef.current - scrollThreshold) {
        // Scroll hacia arriba: mostrar la sección de filtros
        setIsVisible(true);
      }
      lastScrollYRef.current = currentScrollY;
    };
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [isSearchFocused]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Cargando servicios...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    // Contenedor personalizado de scroll
    <div
      ref={containerRef}
      style={{
        overflowY: 'scroll',
        height: '100vh',
        overscrollBehavior: 'none',
        scrollBehavior: 'smooth'
      }}
    >
      {/* Dejar espacio para el header fijo */}
      <div className="mt-16">
        {/* Sección de filtros: ahora con posición fixed para poder ocultarla */}
        <div
          className={`bg-white border-b fixed left-0 right-0 z-40 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
          style={{ top: '64px' }} // justo debajo del header (header: 64px de alto)
        >
          <div className="max-w-max mx-auto p-2">
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
            </div>
            {/* Categorías (oculto en móviles cuando el input está enfocado) */}
            {!isSearchFocused && (
              <div className="flex overflow-x-auto gap-2 pb-2 md:pb-0 w-full md:w-auto mt-4">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 text-sm md:text-base rounded-full whitespace-nowrap transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-amber-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
                <button
                  onClick={handleRefresh}
                  className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                  <span className="hidden md:inline">Actualizar</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Contenedor de servicios:
            Cuando la sección de filtros está visible, se deja espacio para header (64px) + filtros (asumamos 80px),
            y cuando está oculta, solo se deja espacio para el header */}
        <div
          className={`max-w-7xl mx-auto p-2 transition-all duration-300 ${
            isVisible ? 'mt-[190px]' : 'mt-16'
          }`}
        >
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {filteredServices.map((service) => (
              <div
                key={service._id}
                className="bg-white border rounded-lg overflow-hidden hover:border-amber-600 transition-colors"
              >
                <div className="aspect-video relative">
                  <img
                    src={service.image || 'https://placehold.co/300x200'}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xs md:text-xl font-semibold text-gray-900 mb-2">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 mb-2 text-[10px] md:text-xl">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex items-center gap-1 md:gap-4 text-[10px] md:text-base">
                      <Clock className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-600">{service.duration} min</span>
                    </div>
                    <div className="flex items-center gap-1 md:gap-4 text-[10px] md:text-base">
                      <Euro className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-600">€{service.price}</span>
                    </div>
                  </div>
                  <div className="flex items-center pb-2 gap-1 md:gap-4 text-[10px] md:text-base">
                    <span className="text-green-500">Puntos: {service.points}</span>
                  </div>
                  <button
                    className="w-full bg-amber-600 text-[10px] md:text-xl text-white px-2 py-1 md:px-4 md:py-2 rounded-lg hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    Reservar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
