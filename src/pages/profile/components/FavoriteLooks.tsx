import { Heart, Share2 } from 'lucide-react';

interface FavoriteLooksProps {
  expanded?: boolean;
}

const FavoriteLooks = ({ expanded = false }: FavoriteLooksProps) => {
  const looks = [
    {
      id: 1,
      name: "Fade Clásico",
      image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      barber: "Carlos Rodríguez",
      likes: 124
    },
    {
      id: 2,
      name: "Pompadour Moderno",
      image: "https://images.unsplash.com/photo-1622296089863-eb7fc530daa8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      barber: "Miguel Ángel",
      likes: 98
    },
    {
      id: 3,
      name: "Corte Texturizado",
      image: "https://images.unsplash.com/photo-1621605515504-775861266afd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      barber: "Juan Pérez",
      likes: 156
    }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            Looks Favoritos
          </h3>
          {!expanded && (
            <button className="text-sm text-amber-600 hover:text-amber-700">
              Ver todos
            </button>
          )}
        </div>

        <div className={`grid gap-4 ${expanded ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1'}`}>
          {(expanded ? looks : looks.slice(0, 2)).map((look) => (
            <div key={look.id} className="group relative">
              <div className="aspect-square rounded-lg overflow-hidden">
                <img
                  src={look.image}
                  alt={look.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h4 className="text-white font-medium">{look.name}</h4>
                  <p className="text-gray-300 text-sm">{look.barber}</p>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                      <span className="text-white text-sm">{look.likes}</span>
                    </div>
                    <button className="text-white hover:text-amber-400 transition-colors">
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavoriteLooks;