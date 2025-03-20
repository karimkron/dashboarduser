import { Scissors, Star, Calendar, Award } from 'lucide-react';

const ProfileStats = () => {
  const stats = [
    {
      icon: Scissors,
      label: "Cortes",
      value: "32",
      change: "+2 este mes",
      color: "text-blue-600"
    },
    {
      icon: Star,
      label: "Puntos",
      value: "1,250",
      change: "+150 disponibles",
      color: "text-amber-600"
    },
    {
      icon: Calendar,
      label: "Citas",
      value: "48",
      change: "Próxima: 25 Feb",
      color: "text-green-600"
    },
    {
      icon: Award,
      label: "Nivel",
      value: "Gold",
      change: "Top 10%",
      color: "text-purple-600"
    }
  ];

  return (
    <div className="bg-white border-b">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Estadísticas
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${stat.color} bg-opacity-10`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.label}
                  </p>
                  <p className="text-xl font-semibold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {stat.change}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileStats;