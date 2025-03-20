import { Calendar, Clock, User, MapPin, Star} from 'lucide-react';

const AppointmentHistory = () => {
  const appointments = [
    {
      id: 1,
      service: "Corte + Barba",
      barber: "Carlos Rodríguez",
      date: "2024-02-25T15:00:00",
      duration: "45 min",
      status: "upcoming",
      price: 35,
      location: "Sede Principal"
    },
    {
      id: 2,
      service: "Fade + Diseño",
      barber: "Miguel Ángel",
      date: "2024-02-15T11:00:00",
      duration: "60 min",
      status: "completed",
      price: 40,
      rating: 5,
      location: "Sede Principal"
    },
    {
      id: 3,
      service: "Corte Clásico",
      barber: "Juan Pérez",
      date: "2024-02-01T17:00:00",
      duration: "30 min",
      status: "completed",
      price: 25,
      rating: 4,
      location: "Sede Principal"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Próxima cita */}
      {appointments.find(app => app.status === 'upcoming') && (
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg p-6 text-white">
          <h3 className="text-lg font-medium mb-4">Próxima Cita</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{new Date(appointments[0].date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{new Date(appointments[0].date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span>{appointments[0].barber}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>{appointments[0].location}</span>
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <h4 className="font-medium">{appointments[0].service}</h4>
                <p className="text-sm opacity-90">Duración: {appointments[0].duration}</p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-white text-amber-600 rounded-lg hover:bg-gray-50 transition-colors flex-1">
                  Reagendar
                </button>
                <button className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors flex-1">
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Historial de citas */}
      <div className="bg-white rounded-lg border">
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Historial de Citas
          </h3>
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="p-4 border rounded-lg hover:border-amber-200 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {appointment.service}
                    </h4>
                    <p className="text-sm text-gray-500">{appointment.barber}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                    {appointment.status === 'upcoming' ? 'Próxima' : 'Completada'}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Fecha</p>
                    <p className="font-medium text-gray-900">
                      {new Date(appointment.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Hora</p>
                    <p className="font-medium text-gray-900">
                      {new Date(appointment.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Duración</p>
                    <p className="font-medium text-gray-900">{appointment.duration}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Precio</p>
                    <p className="font-medium text-gray-900">${appointment.price}</p>
                  </div>
                </div>

                {appointment.status === 'completed' && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < (appointment.rating || 0)
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentHistory;