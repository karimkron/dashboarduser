import { Camera, Mail, Phone, MapPin, Edit } from 'lucide-react';

const ProfileHeader = () => {
  const userData = {
    name: "John Doe",
    email: "john@example.com",
    phone: "+34 123 456 789",
    location: "Madrid, España",
    memberSince: "2023",
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    coverImage: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  };

  return (
    <div className="bg-white border-b">
      {/* Imagen de portada */}
      <div className="relative h-48 md:h-64">
        <img
          src={userData.coverImage}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <button className="absolute bottom-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors">
          <Camera className="h-5 w-5" />
        </button>
      </div>

      {/* Información del perfil */}
      <div className="relative px-4 pb-4 md:px-6 md:pb-6">
        {/* Foto de perfil */}
        <div className="absolute -top-16 left-4 md:left-6">
          <div className="relative">
            <img
              src={userData.profileImage}
              alt={userData.name}
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
            />
            <button className="absolute bottom-0 right-0 p-1.5 bg-amber-600 rounded-full text-white hover:bg-amber-700 transition-colors">
              <Camera className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="pt-20">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{userData.name}</h1>
              <p className="text-gray-500">Cliente desde {userData.memberSince}</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors">
              <Edit className="h-4 w-4" />
              <span>Editar Perfil</span>
            </button>
          </div>

          {/* Información de contacto */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Mail className="h-5 w-5" />
              <span>{userData.email}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Phone className="h-5 w-5" />
              <span>{userData.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="h-5 w-5" />
              <span>{userData.location}</span>
            </div>
          </div>

          {/* Badges/Etiquetas */}
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
              Cliente VIP
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              50+ Visitas
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              Miembro Gold
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;