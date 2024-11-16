import { useAuth } from '@/contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { LogOut, User, Settings, Bell } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { user, userData } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Logo showText={true} size="sm" />
          </div>

          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 rounded-full p-1">
              <span className="sr-only">View notifications</span>
              <Bell className="h-6 w-6" />
            </button>

            {userData?.role === 'admin' ? (
              <Link to="/admin/users">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center"
                >
                  <User className="h-4 w-4 mr-2" />
                  Manage Users
                </Button>
              </Link>
            ) : (
              <Link to="/dashboard/settings">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </Link>
            )}

            <div className="border-l h-6 border-gray-200" />

            <Button
              variant="ghost"
              size="sm"
              className="flex items-center text-gray-700 hover:text-gray-900"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign out
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}