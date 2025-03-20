const NotificationsPage = () => {
    const notifications = [
      {
        id: 1,
        title: 'Nueva cita programada',
        message: 'Tienes una nueva cita para mañana a las 15:00',
        date: '2024-02-20T15:00:00',
        read: false
      },
      // Añade más notificaciones aquí
    ];
  
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6">Notificaciones</h2>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg border ${
                notification.read ? 'bg-gray-50' : 'bg-amber-50 border-amber-200'
              }`}
            >
              <h3 className="font-medium text-gray-900">{notification.title}</h3>
              <p className="text-gray-600 mt-1">{notification.message}</p>
              <span className="text-xs text-gray-500 mt-2 block">
                {new Date(notification.date).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default NotificationsPage;