import { Scissors, Clock, DollarSign } from 'lucide-react';

interface PreferredServicesProps {
  expanded?: boolean;
}

const PreferredServices = ({ expanded = false }: PreferredServicesProps) => {
  const services = [
    {
      id: 1,
      name: "Corte + Barba",
      description: "Corte de cabello y arreglo de barba",
      duration: "45 min",
      price: 35,
      image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      timesBooked: 12
    },
    // ... otros servicios
  ];

  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            Servicios Preferidos
          </h3>
          {!expanded && (
            <button className="text-sm text-amber-600 hover:text-amber-700">
              Ver todos
            </button>
          )}
        </div>

        <div className="space-y-4">
          {(expanded ? services : services.slice(0, 2)).map((service) => (
            <div
              key={service.id}
              className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg hover:border-amber-200 transition-colors"
            >
              {/* Imagen */}
              <img
                src={service.image}
                alt={service.name}
                className="w-full sm:w-20 h-32 sm:h-20 rounded-lg object-cover"
              />
              
              {/* Información */}
              <div className="flex-1 space-y-2">
                <h4 className="font-medium text-gray-900">{service.name}</h4>
                <p className="text-sm text-gray-500">{service.description}</p>
                
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-1 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>{service.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <DollarSign className="h-4 w-4" />
                    <span>${service.price}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Scissors className="h-4 w-4" />
                    <span>{service.timesBooked} veces</span>
                  </div>
                </div>
              </div>

              {/* Botón de reserva */}
              <div className="flex sm:flex-col justify-end gap-2">
                <button className="w-full sm:w-auto px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm">
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

export default PreferredServices;