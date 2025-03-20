import { useState } from "react";
import { Calendar, Clock, User, MapPin } from "lucide-react";

const AppointmentsPage = () => {
  const [selectedFilter, setSelectedFilter] = useState("upcoming");

  const appointments = [
    {
      id: 1,
      service: "Corte + Barba",
      barber: "Carlos Rodríguez",
      date: "2024-02-25T15:00:00",
      duration: "45 min",
      status: "upcoming",
      price: 35,
      location: "Sede Principal",
      notes: "Preferencia: degradado bajo",
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
      location: "Sede Principal",
    },
    {
      id: 3,
      service: "Corte Clásico",
      barber: "Juan Pérez",
      date: "2024-02-01T17:00:00",
      duration: "30 min",
      status: "cancelled",
      price: 25,
      location: "Sede Principal",
      cancellationReason: "Cliente solicitó cancelación",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "upcoming":
        return "Próxima";
      case "completed":
        return "Completada";
      case "cancelled":
        return "Cancelada";
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6 -m-6">
      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Mis Citas</h1>
              <p className="text-gray-600">Gestiona tus citas y reservas</p>
            </div>
            <button className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors">
              Nueva Cita
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {["upcoming", "completed", "cancelled"].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors
                  ${
                    selectedFilter === filter
                      ? "bg-amber-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Appointments List */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="space-y-4">
          {appointments
            .filter(
              (app) => selectedFilter === "all" || app.status === selectedFilter
            )
            .map((appointment) => (
              <div
                key={appointment.id}
                className="bg-white border rounded-lg hover:border-amber-200 transition-colors"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {appointment.service}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            appointment.status
                          )}`}
                        >
                          {getStatusText(appointment.status)}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="h-5 w-5 text-gray-400" />
                          <span>
                            {new Date(appointment.date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="h-5 w-5 text-gray-400" />
                          <span>
                            {new Date(appointment.date).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <User className="h-5 w-5 text-gray-400" />
                          <span>{appointment.barber}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="h-5 w-5 text-gray-400" />
                          <span>{appointment.location}</span>
                        </div>
                      </div>

                      {appointment.notes && (
                        <p className="mt-2 text-sm text-gray-500">
                          Notas: {appointment.notes}
                        </p>
                      )}

                      {appointment.status === "cancelled" &&
                        appointment.cancellationReason && (
                          <p className="mt-2 text-sm text-red-500">
                            Razón de cancelación:{" "}
                            {appointment.cancellationReason}
                          </p>
                        )}
                    </div>

                    {appointment.status === "upcoming" && (
                      <div className="flex gap-2">
                        <button className="px-4 py-2 bg-white text-gray-700 border rounded-lg hover:bg-gray-50 transition-colors">
                          Reagendar
                        </button>
                        <button className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                          Cancelar
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AppointmentsPage;
