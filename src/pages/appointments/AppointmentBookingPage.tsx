import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Scissors, User, Plus } from 'lucide-react';
import { useAppointmentStore } from '../../store/appointment.store';
import api from '../../services/api';

interface TimeSlot {
  time: string;
  available: boolean;
}

interface MonthGroup {
  month: string;
  year: string;
  dates: Date[];
}

const AppointmentBookingPage = () => {
  const navigate = useNavigate();
  const { 
    selectedServices,
    selectedDate,
    selectedTime,
    setDate,
    setTime,
    removeService
  } = useAppointmentStore();
  
  const [availability, setAvailability] = useState<string[]>([]);
  const [availableDays, setAvailableDays] = useState<Date[]>([]);
  const [monthGroups, setMonthGroups] = useState<MonthGroup[]>([]);

  // Calcular totales
  const totalDuration = useMemo(() => 
    selectedServices.reduce((sum: number, service) => sum + service.duration, 0),
    [selectedServices]
  );

  const totalPrice = useMemo(() => 
    selectedServices.reduce((sum: number, service) => sum + service.price, 0),
    [selectedServices]
  );

  // Obtener días disponibles
  useEffect(() => {
    const fetchAvailableDays = async () => {
      try {
        const response = await api.get<{ date: string }[]>('/api/appointments/available-days');
        const days = response.data.map(day => new Date(day.date));
        setAvailableDays(days);
        
        // Agrupar por mes
        const grouped = days.reduce((groups: MonthGroup[], date: Date) => {
          const month = date.toLocaleString('es-ES', { month: 'long' });
          const year = date.getFullYear().toString();
          const existingGroup = groups.find(g => g.month === month && g.year === year);
          
          if (existingGroup) {
            existingGroup.dates.push(date);
          } else {
            groups.push({
              month,
              year,
              dates: [date]
            });
          }
          return groups;
        }, []);

        setMonthGroups(grouped);
      } catch (error) {
        console.error('Error fetching available days:', error);
      }
    };

    fetchAvailableDays();
  }, []);

  // Auto-seleccionar día actual si está disponible
  useEffect(() => {
    if (availableDays.length > 0 && !selectedDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const isAvailable = availableDays.some(d => 
        d.toISOString().split('T')[0] === today.toISOString().split('T')[0]
      );
      if (isAvailable) setDate(today);
    }
  }, [availableDays, selectedDate, setDate]);

  // Obtener disponibilidad
  useEffect(() => {
    const fetchAvailability = async () => {
      if (selectedDate) {
        try {
          const response = await api.get<{ availableSlots: string[] }>('/api/appointments/availability', {
            params: { 
              date: selectedDate.toISOString(),
              duration: totalDuration
            }
          });
          setAvailability(response.data.availableSlots);
        } catch (error) {
          console.error('Error fetching availability:', error);
        }
      }
    };

    fetchAvailability();
  }, [selectedDate, totalDuration]);

  // Verificar disponibilidad del día
  const isDayAvailable = (day: Date) => 
    availableDays.some(d => d.toDateString() === day.toDateString());

  return (
    <div className="pt-16 pb-20 md:pt-20 bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Selector de fecha */}
        <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Seleccionar fecha</h2>
          {monthGroups.map((group) => (
            <div key={`${group.month}-${group.year}`} className="mb-6">
              <h3 className="font-medium text-lg mb-3">
                {`${group.month.charAt(0).toUpperCase() + group.month.slice(1)} ${group.year}`}
              </h3>
              <div className="grid grid-cols-7 gap-2">
                {group.dates.map((date, i) => {
                  const isAvailable = isDayAvailable(date);
                  const isSelected = selectedDate?.toDateString() === date.toDateString();
                  const dayName = date.toLocaleDateString('es-ES', { weekday: 'short' });
                  
                  return (
                    <button
                      key={i}
                      onClick={() => isAvailable && setDate(date)}
                      disabled={!isAvailable}
                      className={`p-2 rounded-lg text-center transition-colors flex flex-col items-center
                        ${isSelected ? 'bg-amber-600 text-white' : ''}
                        ${isAvailable ? 
                          'bg-gray-100 hover:bg-amber-100' : 
                          'bg-gray-200 cursor-not-allowed opacity-75'}
                      `}
                    >
                      <span className="text-xs font-medium">{dayName}</span>
                      <span className="text-lg">{date.getDate()}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Selector de hora */}
        {selectedDate && (
          <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5" /> Seleccionar horario
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {availability.length > 0 ? (
                availability.map((time, i) => (
                  <button
                    key={i}
                    onClick={() => setTime(time)}
                    className={`p-2 rounded-md text-sm ${
                      selectedTime === time ? 
                      'bg-amber-600 text-white' : 
                      'bg-gray-100 hover:bg-amber-100'
                    }`}
                  >
                    {time}
                  </button>
                ))
              ) : (
                <p className="text-center text-gray-500 col-span-3">
                  No hay horarios disponibles para esta fecha
                </p>
              )}
            </div>
          </div>
        )}

        {/* Servicios seleccionados */}
        <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Scissors className="h-5 w-5" /> Servicios seleccionados
          </h3>
          
          {selectedServices.map((service) => (
            <div key={service._id} className="flex justify-between items-center p-3 mb-2 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium">{service.name}</h4>
                <span className="text-sm text-gray-600">{service.duration} min</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold">€{service.price.toFixed(2)}</span>
                <button 
                  onClick={() => removeService(service._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}

          <button 
            onClick={() => navigate('/dashboard/services')}
            className="w-full mt-4 p-2 border-2 border-dashed border-amber-400 rounded-lg
                     hover:bg-amber-50 text-amber-600 flex items-center justify-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Añadir otro servicio
          </button>
        </div>

        {/* Resumen */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-semibold">Duración total:</h3>
              <span className="text-gray-600">{totalDuration} minutos</span>
            </div>
            <span className="text-2xl font-bold text-amber-600">
              €{totalPrice.toFixed(2)}
            </span>
          </div>

          <button
            onClick={() => navigate('/confirmation')}
            disabled={!selectedDate || !selectedTime || selectedServices.length === 0}
            className="w-full bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 
                     disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Confirmar cita
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBookingPage;