import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Calendar, Clock, Scissors, Check, ArrowLeft, Share2 } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { toast } from 'react-toastify';

const AppointmentConfirmationPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [appointment, setAppointment] = useState<any>(null);
  
  useEffect(() => {
    // Verificar si hay datos de cita en el state
    if (location.state?.appointmentSuccess && location.state?.appointmentData) {
      setAppointment(location.state.appointmentData);
    } else {
      // Intentar recuperar del localStorage como respaldo
      const savedAppointment = localStorage.getItem('lastConfirmedAppointment');
      if (savedAppointment) {
        try {
          setAppointment(JSON.parse(savedAppointment));
        } catch (error) {
          console.error('Error parsing appointment data:', error);
          navigate('/dashboard');
        }
      } else {
        // No hay datos de cita, redirigir
        navigate('/dashboard');
      }
    }
    
    // Si hay datos, guardarlos en localStorage
    if (location.state?.appointmentData) {
      localStorage.setItem(
        'lastConfirmedAppointment', 
        JSON.stringify(location.state.appointmentData)
      );
    }
    
    // Limpiar localStorage después de 30 minutos
    const cleanupTimeout = setTimeout(() => {
      localStorage.removeItem('lastConfirmedAppointment');
    }, 30 * 60 * 1000);
    
    return () => clearTimeout(cleanupTimeout);
  }, [location, navigate]);
  
  // Función para compartir la cita (podría ser por email, calendario, etc.)
  const handleShareAppointment = () => {
    if (!appointment) return;
    
    // Implementar lógica de compartir
    // Por simplicidad, aquí solo mostramos un toast
    toast.info('Función de compartir aún no implementada');
    
    // En un caso real, podríamos:
    // 1. Generar un archivo .ics para calendario
    // 2. Compartir un enlace
    // 3. Enviar por email, etc.
  };
  
  // Si no hay datos de cita, mostrar pantalla de carga
  if (!appointment) {
    return (
      <div className="pt-16 pb-20 md:pt-20 bg-gray-50 p-4 flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
      </div>
    );
  }
  
  // Formatear la fecha
  const appointmentDate = new Date(appointment.date);
  const formattedDate = format(appointmentDate, 'EEEE, d MMMM yyyy', { locale: es });
  
  return (
    <div className="pt-16 pb-20 md:pt-20 bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Banner de éxito */}
        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-r-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Check className="h-6 w-6 text-green-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                Tu cita ha sido confirmada con éxito
              </p>
            </div>
          </div>
        </div>
        
        {/* Tarjeta de confirmación */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="bg-amber-600 text-white p-6 text-center">
            <h1 className="text-2xl font-bold mb-2">¡Cita Reservada!</h1>
            <p>Te esperamos en nuestra peluquería</p>
          </div>
          
          <div className="p-6">
            <div className="space-y-6 mb-8">
              {/* Detalles de fecha y hora */}
              <div className="flex items-start gap-4">
                <Calendar className="h-6 w-6 text-amber-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-700">Fecha y Hora</h3>
                  <p className="text-gray-600">{formattedDate}</p>
                  <p className="text-gray-600">{appointment.time}</p>
                </div>
              </div>
              
              {/* Servicios */}
              <div className="flex items-start gap-4">
                <Scissors className="h-6 w-6 text-amber-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-700">Servicios</h3>
                  <ul className="text-gray-600 mt-1 space-y-1">
                    {appointment.services && appointment.services.map((service: any, index: number) => (
                      <li key={index} className="flex justify-between">
                        <span>{service.name}</span>
                        <span className="font-medium">{service.price ? `${service.price.toFixed(2)} €` : ''}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 font-bold text-gray-800">
                    Total: {appointment.totalPrice ? `${appointment.totalPrice.toFixed(2)} €` : 'N/A'}
                  </p>
                </div>
              </div>
              
              {/* Duración */}
              <div className="flex items-start gap-4">
                <Clock className="h-6 w-6 text-amber-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-700">Duración</h3>
                  <p className="text-gray-600">
                    {appointment.totalDuration ? `${appointment.totalDuration} minutos` : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Instrucciones */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold text-gray-700 mb-2">Recordatorio</h3>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 text-amber-600 flex-shrink-0">•</div>
                  <span>Por favor, llega 5-10 minutos antes de tu cita.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 text-amber-600 flex-shrink-0">•</div>
                  <span>Si necesitas cancelar o reprogramar, hazlo con al menos 24 horas de anticipación.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 text-amber-600 flex-shrink-0">•</div>
                  <span>Se ha enviado un correo de confirmación a tu dirección registrada.</span>
                </li>
              </ul>
            </div>
            
            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex-1 py-3 px-4 flex justify-center items-center gap-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                <ArrowLeft className="h-5 w-5" />
                Volver al Inicio
              </button>
              <button
                onClick={handleShareAppointment}
                className="flex-1 py-3 px-4 flex justify-center items-center gap-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
              >
                <Share2 className="h-5 w-5" />
                Añadir a Calendario
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ); 
};

export default AppointmentConfirmationPage;