
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, Home, Users, Settings, Search, User, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from './AuthModal';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const { user, logout } = useAuth();

  const navItems = [
    { label: 'Home', icon: Home, href: '#home' },
    { label: 'Dashboard', icon: Users, href: '#dashboard' },
    { label: 'Committee', icon: Settings, href: '#committee' },
    { label: 'Services', icon: Search, href: '#services' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const handleAuthClick = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 shadow-lg">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#ff6ec4] to-[#7873f5] flex items-center justify-center shadow-lg">
                  <Home className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold text-white tracking-wide">MyBlock</span>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => scrollToSection(item.href)}
                    className="flex items-center space-x-2 text-white/80 hover:text-white transition-all duration-300 hover:scale-105 cursor-pointer"
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Auth Buttons or User Menu */}
              <div className="hidden md:flex items-center space-x-3">
                {user ? (
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2 text-white/80">
                      <User className="w-4 h-4" />
                      <span className="font-medium">{user.name}</span>
                    </div>
                    <Button
                      onClick={logout}
                      variant="ghost"
                      size="sm"
                      className="text-white/80 hover:text-white hover:bg-white/10"
                    >
                      <LogOut className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <Button
                      onClick={() => handleAuthClick('login')}
                      variant="ghost"
                      className="text-white hover:bg-white/10 font-medium"
                    >
                      Sign In
                    </Button>
                    <Button
                      onClick={() => handleAuthClick('signup')}
                      className="bg-gradient-to-r from-[#ff6ec4] to-[#7873f5] hover:scale-105 transition-all duration-300 shadow-lg border-0 text-white font-medium tracking-wide"
                    >
                      Get Started
                    </Button>
                  </>
                )}
              </div>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white hover:bg-white/10"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
              <div className="md:hidden mt-4 p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                <div className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => scrollToSection(item.href)}
                      className="flex items-center space-x-3 text-white/80 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10 cursor-pointer text-left"
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  ))}
                  
                  {user ? (
                    <div className="space-y-2 pt-4 border-t border-white/20">
                      <div className="flex items-center space-x-2 text-white/80 p-2">
                        <User className="w-5 h-5" />
                        <span className="font-medium">{user.name}</span>
                      </div>
                      <Button
                        onClick={logout}
                        variant="ghost"
                        className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2 pt-4 border-t border-white/20">
                      <Button
                        onClick={() => handleAuthClick('login')}
                        variant="ghost"
                        className="w-full text-white hover:bg-white/10 font-medium"
                      >
                        Sign In
                      </Button>
                      <Button
                        onClick={() => handleAuthClick('signup')}
                        className="w-full bg-gradient-to-r from-[#ff6ec4] to-[#7873f5] text-white font-medium"
                      >
                        Get Started
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
    </>
  );
};

export default Navigation;
