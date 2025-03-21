import { Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const Header = () => {
  const navigate = useNavigate();


  return (
    <header className="fixed top-0 left-0 right-0 h-16 border-b bg-white px-4 md:px-6 shadow-sm z-40">
      <div className="flex h-full items-center justify-between">
        <div className="flex items-center">
         
            
          
          
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/dashboard/notifications')}
            className="relative text-gray-600 hover:text-gray-800"
            aria-label="Notifications"
          >
            <Bell className="h-6 w-6" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              3
            </span>
          </button>

          <button 
            onClick={() => navigate('/dashboard/profile')}
            className="flex items-center gap-3 hover:bg-gray-50 rounded-lg p-2 transition-colors"
            aria-label="Profile"
          >
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Profile"
              className="h-8 w-8 rounded-full"
            />
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-800">John Doe</p>
              <p className="text-xs text-gray-500">john@example.com</p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;