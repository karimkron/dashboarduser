// src/pages/dashboard/DashboardPage.tsx
import { 
    Calendar, 
    Clock, 
    Scissors, 
    Award, 
    Gift, 
    Star 
  } from 'lucide-react';
  
  const DashboardPage = () => {
    return (
      <div className="space-y-6 -m-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-amber-600 to-amber-800 border-b">
          <div className="max-w-7xl mx-auto p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="text-white">
                <h1 className="text-2xl font-bold">¡Bienvenido, John!</h1>
                <p className="text-amber-100">Tu próxima cita es el 25 de Febrero a las 15:00</p>
              </div>
              <button className="px-4 py-2 bg-white text-amber-600 rounded-lg hover:bg-amber-50 transition-colors">
                Reservar Cita
              </button>
            </div>
          </div>
        </div>
  
        <div className="max-w-7xl mx-auto p-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Quick Stats */}
            <div className="bg-white p-6 rounded-lg border">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                  <Scissors className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Citas Completadas</p>
                  <p className="text-2xl font-bold text-gray-900">24</p>
                </div>
              </div>
            </div>
  
            <div className="bg-white p-6 rounded-lg border">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-amber-100 text-amber-600 rounded-lg">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Puntos de Fidelidad</p>
                  <p className="text-2xl font-bold text-gray-900">1,250</p>
                </div>
              </div>
            </div>
  
            <div className="bg-white p-6 rounded-lg border">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                  <Gift className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Recompensas Disponibles</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                </div>
              </div>
            </div>
  
            <div className="bg-white p-6 rounded-lg border">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
                  <Star className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Nivel de Cliente</p>
                  <p className="text-2xl font-bold text-gray-900">Gold</p>
                </div>
              </div>
            </div>
          </div>
  
          <div className="grid gap-6 md:grid-cols-2 mt-6">
            {/* Próximas Citas */}
            <div className="bg-white p-6 rounded-lg border">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Próximas Citas</h2>
              <div className="space-y-4">
                {[1, 2].map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Corte + Barba</p>
                        <p className="text-sm text-gray-500">25 Feb, 15:00</p>
                      </div>
                    </div>
                    <button className="text-sm text-amber-600 hover:text-amber-700">
                      Ver Detalles
                    </button>
                  </div>
                ))}
              </div>
            </div>
  
            {/* Recompensas Disponibles */}
            <div className="bg-white p-6 rounded-lg border">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Recompensas Disponibles</h2>
              <div className="space-y-4">
                {[
                  { name: "Corte Gratis", points: 500 },
                  { name: "Tratamiento Premium", points: 750 },
                  { name: "Sesión Completa", points: 1000 }
                ].map((reward, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                        <Gift className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{reward.name}</p>
                        <p className="text-sm text-gray-500">{reward.points} puntos</p>
                      </div>
                    </div>
                    <button className="px-3 py-1 text-sm bg-amber-600 text-white rounded-lg hover:bg-amber-700">
                      Canjear
                    </button>
                  </div>
                ))}
              </div>
            </div>
  
            {/* Servicios Populares */}
            <div className="bg-white p-6 rounded-lg border">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Servicios Populares</h2>
              <div className="space-y-4">
                {[
                  { name: "Fade Clásico", rating: 4.9, price: 25 },
                  { name: "Corte + Barba", rating: 4.8, price: 35 },
                  { name: "Tratamiento Capilar", rating: 4.7, price: 40 }
                ].map((service, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{service.name}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm text-gray-500">{service.rating}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">${service.price}</p>
                      <button className="text-sm text-amber-600 hover:text-amber-700">
                        Reservar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
  
            {/* Últimas Visitas */}
            <div className="bg-white p-6 rounded-lg border">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Últimas Visitas</h2>
              <div className="space-y-4">
                {[
                  { service: "Corte Clásico", date: "15 Feb 2024", barber: "Carlos R." },
                  { service: "Fade + Diseño", date: "01 Feb 2024", barber: "Miguel A." },
                  { service: "Afeitado", date: "15 Ene 2024", barber: "Juan P." }
                ].map((visit, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                        <Clock className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{visit.service}</p>
                        <p className="text-sm text-gray-500">{visit.barber}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">{visit.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default DashboardPage;