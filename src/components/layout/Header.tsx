import { Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUIStore } from '../../store/uiStore';

const Header = () => {
  const navigate = useNavigate();
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);

  return (
    <header className="h-16 border-b bg-white px-6 shadow-sm">
      <div className="flex h-full items-center justify-between">
        <button
          onClick={toggleSidebar}
          className="lg:hidden text-gray-600 hover:text-gray-900"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="flex items-center gap-4 ml-auto">
          <button 
            onClick={() => navigate('/dashboard/notifications')}
            className="relative text-gray-600 hover:text-gray-800"
          >
            <Bell className="h-6 w-6" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              3
            </span>
          </button>

          <button 
            onClick={() => navigate('/dashboard/profile')}
            className="flex items-center gap-3 hover:bg-gray-50 rounded-lg p-2 transition-colors"
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