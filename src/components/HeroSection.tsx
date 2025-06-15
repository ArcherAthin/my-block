
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Users, Calendar, MessageSquare, Building, Star, Shield, Play } from 'lucide-react';

interface HeroSectionProps {
  scrollY: number;
}

const HeroSection = ({ scrollY }: HeroSectionProps) => {
  const [activeCard, setActiveCard] = useState(0);

  const featuredModules = [
    {
      title: "Resident Dashboard",
      description: "Comprehensive overview of community life with personalized insights",
      icon: Users,
      color: "from-[#ff6ec4] to-[#7873f5]",
      stats: { residents: "1,247", satisfaction: "94%" }
    },
    {
      title: "Committee Management",
      description: "Transparent governance with voting, polls, and fund tracking",
      icon: Shield,
      color: "from-[#7873f5] to-[#00f2fe]",
      stats: { decisions: "156", funds: "$45K" }
    },
    {
      title: "Smart Facilities",
      description: "Book amenities, track maintenance, and manage access seamlessly",
      icon: Building,
      color: "from-[#00f2fe] to-[#ff6ec4]",
      stats: { bookings: "89", available: "12" }
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % featuredModules.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleExplorePlatform = () => {
    const dashboardElement = document.querySelector('#dashboard');
    if (dashboardElement) {
      dashboardElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWatchDemo = () => {
    // For demo purposes, we'll show an alert. In a real app, this would open a modal or video
    alert('Demo video would open here. This is a placeholder for the demo functionality.');
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-6 py-20 pt-32">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div 
          className="space-y-8 animate-fade-in"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        >
          <div className="space-y-4">
            <Badge className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 transition-all duration-300">
              🏘️ Smart Neighborhood CRM
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight tracking-wide">
              Studio <span className="bg-gradient-to-r from-[#ff6ec4] to-[#7873f5] bg-clip-text text-transparent">Pley</span>
              <br />
              <span className="text-4xl lg:text-5xl">MyBlock</span>
            </h1>
            <p className="text-xl text-white/80 leading-relaxed max-w-lg font-light">
              Transform your neighborhood with intelligent civic management. 
              Connect residents, streamline governance, and build stronger communities 
              through beautiful, intuitive digital experiences.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={handleExplorePlatform}
              className="bg-gradient-to-r from-[#ff6ec4] to-[#7873f5] hover:scale-105 transition-all duration-300 text-white font-medium tracking-wide shadow-xl text-lg px-8 py-6 rounded-xl border-0 hover:shadow-2xl"
            >
              Explore Platform
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              onClick={handleWatchDemo}
              variant="outline" 
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-md transition-all duration-300 text-lg px-8 py-6 rounded-xl hover:border-white/50 hover:text-white"
            >
              <Play className="w-4 h-4 mr-2" />
              Watch Demo
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-6 pt-8">
            {[
              { label: "Active Communities", value: "500+" },
              { label: "Happy Residents", value: "25K+" },
              { label: "Issues Resolved", value: "15K+" }
            ].map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-white/60 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right - Featured Cards */}
        <div className="relative">
          <div className="relative h-96 lg:h-[500px]">
            {featuredModules.map((module, index) => {
              const IconComponent = module.icon;
              return (
                <Card 
                  key={index}
                  className={`absolute inset-0 p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl transition-all duration-700 cursor-pointer hover:scale-105 ${
                    index === activeCard 
                      ? 'opacity-100 transform translate-x-0 translate-y-0 z-20' 
                      : index === (activeCard + 1) % featuredModules.length
                      ? 'opacity-70 transform translate-x-8 translate-y-4 z-10'
                      : 'opacity-40 transform translate-x-16 translate-y-8 z-0'
                  }`}
                  onClick={() => setActiveCard(index)}
                >
                  <div className="h-full flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${module.color} flex items-center justify-center shadow-lg`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">{module.title}</h3>
                        <p className="text-white/70 leading-relaxed">{module.description}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-6">
                      {Object.entries(module.stats).map(([key, value]) => (
                        <div key={key} className="text-center p-3 rounded-xl bg-white/10">
                          <div className="text-lg font-bold text-white">{value}</div>
                          <div className="text-xs text-white/60 capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Card indicators */}
          <div className="flex justify-center space-x-3 mt-8">
            {featuredModules.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeCard 
                    ? 'bg-gradient-to-r from-[#ff6ec4] to-[#7873f5] scale-125' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                onClick={() => setActiveCard(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
