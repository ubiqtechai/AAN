import { NavLink } from 'react-router-dom';
import { 
  Home,
  User,
  Briefcase,
  Globe,
  FileText,
  TrendingUp,
  Settings,
  Users
} from 'lucide-react';

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: Home },
  { name: 'Profile', href: '/dashboard/profile', icon: User },
  { name: 'Projects', href: '/dashboard/projects', icon: Briefcase },
  { name: 'Jurisdictions', href: '/dashboard/jurisdictions', icon: Globe },
  { name: 'Content', href: '/dashboard/content', icon: FileText },
  { name: 'Marketing', href: '/dashboard/marketing', icon: TrendingUp },
  { name: 'Client Requirements', href: '/dashboard/client-requirements', icon: Users },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function DashboardSidebar() {
  return (
    <div className="hidden lg:flex lg:flex-shrink-0">
      <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
        <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-brand-50 text-brand-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <item.icon
                  className="mr-3 h-5 w-5 flex-shrink-0"
                  aria-hidden="true"
                />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}