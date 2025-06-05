
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  PieChart, 
  Target, 
  TrendingUp, 
  BarChart, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navigationItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/expenses', icon: PieChart, label: 'Expenses' },
    { path: '/goals', icon: Target, label: 'Goals' },
    { path: '/insights', icon: TrendingUp, label: 'AI Insights' },
    { path: '/reports', icon: BarChart, label: 'Reports' },
  ];

  const NavItem = ({ path, icon: Icon, label }: { path: string; icon: any; label: string }) => (
    <button
      onClick={() => {
        navigate(path);
        setIsMobileMenuOpen(false);
      }}
      className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-colors ${
        location.pathname === path
          ? 'bg-rose-200 text-rose-700'
          : 'text-rose-600 hover:bg-rose-100'
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-rose-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm border-b border-rose-200 p-4 flex justify-between items-center">
        <h1 className="text-xl font-comfortaa font-bold text-rose-600">BudgetBuddy</h1>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg hover:bg-rose-100"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      <div className="flex">
        {/* Sidebar */}
        <div className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}>
          <div className="p-6">
            <h1 className="text-2xl font-comfortaa font-bold text-rose-600 mb-2">BudgetBuddy</h1>
            <p className="text-sm text-rose-400">Women's Financial Companion</p>
          </div>

          {/* User Info */}
          <div className="px-6 py-4 bg-rose-50 mx-4 rounded-lg mb-6">
            <p className="font-medium text-rose-700">{user?.name}</p>
            <p className="text-sm text-rose-500 capitalize">{user?.category}</p>
          </div>

          {/* Navigation */}
          <nav className="px-4 space-y-2">
            {navigationItems.map((item) => (
              <NavItem key={item.path} {...item} />
            ))}
          </nav>

          {/* Logout Button */}
          <div className="absolute bottom-6 left-4 right-4">
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full border-rose-300 text-rose-600 hover:bg-rose-100"
            >
              <LogOut size={16} className="mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          <main className="p-4 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
