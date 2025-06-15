
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, Home, Users, Settings, Search } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Home', icon: Home, href: '#home' },
    { label: 'Dashboard', icon: Users, href: '#dashboard' },
    { label: 'Committee', icon: Settings, href: '#committee' },
    { label: 'Services', icon: Search, href: '#services' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto">
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
              <a
                key={item.label}
                href={item.href}
                className="flex items-center space-x-2 text-white/80 hover:text-white transition-all duration-300 hover:scale-105"
              >
                <item.icon className="w-4 h-4" />
                <span className="font-medium">{item.label}</span>
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <Button className="hidden md:flex bg-gradient-to-r from-[#ff6ec4] to-[#7873f5] hover:scale-105 transition-all duration-300 shadow-lg border-0 text-white font-medium tracking-wide">
            Get Started
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white"
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
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center space-x-3 text-white/80 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </a>
              ))}
              <Button className="mt-4 bg-gradient-to-r from-[#ff6ec4] to-[#7873f5] text-white font-medium">
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
