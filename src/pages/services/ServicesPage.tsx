
import { useState } from 'react';
import { Clock, DollarSign, Search, Star } from 'lucide-react';

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: string;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  available: boolean;
}

const ServicesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'haircuts', name: 'Cortes' },
    { id: 'beards', name: 'Barbas' },
    { id: 'treatments', name: 'Tratamientos' },
    { id: 'color', name: 'Color' },
    { id: 'kids', name: 'Niños' }
  ];

  const services: Service[] = [
    {
      id: 1,
      name: "Corte Clásico",
      description: "Corte tradicional con tijera y acabado con navaja",
      price: 25,
      duration: "30 min",
      category: "haircuts",
      image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.9,
      reviews: 128,
      available: true
    },
    {
        id: 1,
        name: "Corte Clásico",
        description: "Corte tradicional con tijera y acabado con navaja",
        price: 25,
        duration: "30 min",
        category: "haircuts",
        image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        rating: 4.9,
        reviews: 128,
        available: true
      },
      {
        id: 1,
        name: "Corte Clásico",
        description: "Corte tradicional con tijera y acabado con navaja",
        price: 25,
        duration: "30 min",
        category: "haircuts",
        image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        rating: 4.9,
        reviews: 128,
        available: true
      },
      {
        id: 1,
        name: "Corte Clásico",
        description: "Corte tradicional con tijera y acabado con navaja",
        price: 25,
        duration: "30 min",
        category: "haircuts",
        image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        rating: 4.9,
        reviews: 128,
        available: true
      },
      {
        id: 1,
        name: "Corte Clásico",
        description: "Corte tradicional con tijera y acabado con navaja",
        price: 25,
        duration: "30 min",
        category: "haircuts",
        image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        rating: 4.9,
        reviews: 128,
        available: true
      },
      {
        id: 1,
        name: "Corte Clásico",
        description: "Corte tradicional con tijera y acabado con navaja",
        price: 25,
        duration: "30 min",
        category: "haircuts",
        image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        rating: 4.9,
        reviews: 128,
        available: true
      },
      {
        id: 1,
        name: "Corte Clásico",
        description: "Corte tradicional con tijera y acabado con navaja",
        price: 25,
        duration: "30 min",
        category: "haircuts",
        image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        rating: 4.9,
        reviews: 128,
        available: true
      },
      {
        id: 1,
        name: "Corte Clásico",
        description: "Corte tradicional con tijera y acabado con navaja",
        price: 25,
        duration: "30 min",
        category: "haircuts",
        image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        rating: 4.9,
        reviews: 128,
        available: true
      },
      {
        id: 1,
        name: "Corte Clásico",
        description: "Corte tradicional con tijera y acabado con navaja",
        price: 25,
        duration: "30 min",
        category: "haircuts",
        image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        rating: 4.9,
        reviews: 128,
        available: true
      },
      {
        id: 1,
        name: "Corte Clásico",
        description: "Corte tradicional con tijera y acabado con navaja",
        price: 25,
        duration: "30 min",
        category: "haircuts",
        image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        rating: 4.9,
        reviews: 128,
        available: true
      },
      {
        id: 1,
        name: "Corte Clásico",
        description: "Corte tradicional con tijera y acabado con navaja",
        price: 25,
        duration: "30 min",
        category: "haircuts",
        image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        rating: 4.9,
        reviews: 128,
        available: true
      },
      {
        id: 1,
        name: "Corte Clásico",
        description: "Corte tradicional con tijera y acabado con navaja",
        price: 25,
        duration: "30 min",
        category: "haircuts",
        image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        rating: 4.9,
        reviews: 128,
        available: true
      },
    // ... más servicios
  ];

  const filteredServices = services.filter(service => 
    (selectedCategory === 'all' || service.category === selectedCategory) &&
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Categories */}
            <div className="flex overflow-x-auto gap-2 pb-2 md:pb-0 w-full md:w-auto">
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
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white border rounded-lg overflow-hidden hover:border-amber-600 transition-colors"
            >
              <div className="aspect-video relative">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
                {!service.available && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="px-3 py-1 bg-red-500 text-white rounded-full text-sm">
                      No disponible
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {service.name}
                </h3>
                <p className="text-gray-600 mb-4">{service.description}</p>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-600">{service.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-600">${service.price}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < service.rating
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      ({service.reviews} reseñas)
                    </span>
                  </div>
                  <button
                    disabled={!service.available}
                    className={`px-4 py-2 rounded-lg transition-colors
                      ${service.available
                        ? 'bg-amber-600 text-white hover:bg-amber-700'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                  >
                    Reservar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;