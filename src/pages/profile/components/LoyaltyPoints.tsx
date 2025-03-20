import { Gift, Award, TrendingUp } from 'lucide-react';

interface LoyaltyPointsProps {
  expanded?: boolean;
}

const LoyaltyPoints = ({ expanded = false }: LoyaltyPointsProps) => {
  const points = {
    current: 1250,
    nextLevel: 2000,
    progress: 62.5,
    history: [
      { date: '2024-02-15', points: 150, reason: 'Corte de pelo' },
      { date: '2024-02-01', points: 200, reason: 'Referido' },
      { date: '2024-01-20', points: 150, reason: 'Corte + Barba' }
    ],
    rewards: [
      { points: 500, name: 'Corte Gratis', icon: Gift },
      { points: 750, name: 'Tratamiento Premium', icon: Award },
      { points: 1000, name: 'Sesión Completa', icon: TrendingUp }
    ]
  };

  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900">
            Programa de Puntos
          </h3>
          <div className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
            Nivel Gold
          </div>
        </div>

        {/* Puntos actuales y progreso */}
        <div className="mb-6">
          <div className="flex items-end gap-2 mb-2">
            <span className="text-3xl font-bold text-gray-900">{points.current}</span>
            <span className="text-gray-500 mb-1">/ {points.nextLevel} puntos</span>
          </div>
          
          <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="absolute left-0 top-0 h-full bg-amber-600 rounded-full"
              style={{ width: `${points.progress}%` }}
            />
          </div>
          
          <p className="mt-2 text-sm text-gray-500">
            {points.nextLevel - points.current} puntos más para el siguiente nivel
          </p>
        </div>

        {expanded ? (
          <>
            {/* Historial de puntos */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-3">Historial</h4>
              <div className="space-y-3">
                {points.history.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b">
                    <div>
                      <p className="text-gray-900">{item.reason}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(item.date).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="text-green-600">+{item.points}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recompensas disponibles */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Recompensas Disponibles</h4>
              <div className="grid gap-4 md:grid-cols-2">
                {points.rewards.map((reward, index) => (
                  <div
                    key={index}
                    className="p-4 border rounded-lg hover:border-amber-600 transition-colors"
                  >
                    <reward.icon className="h-6 w-6 text-amber-600 mb-2" />
                    <h5 className="font-medium text-gray-900">{reward.name}</h5>
                    <p className="text-sm text-gray-500">{reward.points} puntos</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {points.rewards.slice(0, 3).map((reward, index) => (
              <div
                key={index}
                className="p-3 text-center border rounded-lg hover:border-amber-600 transition-colors"
              >
                <reward.icon className="h-5 w-5 text-amber-600 mx-auto mb-2" />
                <p className="text-sm text-gray-900">{reward.points}</p>
                <p className="text-xs text-gray-500">puntos</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoyaltyPoints;