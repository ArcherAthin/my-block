
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Calendar, 
  MessageSquare, 
  CreditCard, 
  Bell, 
  Users, 
  Wrench, 
  Shield,
  TrendingUp,
  Clock,
  Star
} from 'lucide-react';

const DashboardModules = () => {
  const modules = [
    {
      title: "Resident Dashboard",
      description: "Personal hub with dues, events, and community updates in real-time.",
      icon: Home,
      color: "from-[#6EE7B7] to-[#3B82F6]",
      features: ["Due Payments", "Event Calendar", "Announcements", "Quick Actions"],
      status: "Active",
      users: "1,247"
    },
    {
      title: "Visitor Management", 
      description: "Smart entry system with pre-approval, QR codes, and security logs.",
      icon: Shield,
      color: "from-[#F59E0B] to-[#EF4444]",
      features: ["QR Entry Codes", "Pre-approval", "Security Logs", "Guest Tracking"],
      status: "Enhanced",
      users: "856"
    },
    {
      title: "Maintenance Portal",
      description: "Submit tickets, track progress, and rate service quality seamlessly.",
      icon: Wrench,
      color: "from-[#8B5CF6] to-[#EC4899]",
      features: ["Issue Tracking", "Photo Upload", "Progress Updates", "Rating System"],
      status: "Popular",
      users: "692"
    }
  ];

  const quickStats = [
    { label: "Active Residents", value: "1,247", trend: "+12%", color: "text-green-400" },
    { label: "Pending Issues", value: "23", trend: "-8%", color: "text-red-400" },
    { label: "This Month Events", value: "15", trend: "+25%", color: "text-blue-400" },
    { label: "Satisfaction Rate", value: "94%", trend: "+3%", color: "text-green-400" }
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <Badge className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            📊 Intelligent Dashboard
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            Resident <span className="bg-gradient-to-r from-[#ff6ec4] to-[#7873f5] bg-clip-text text-transparent">Dashboard</span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Empower residents with transparent data access, seamless service requests, 
            and real-time community insights through beautiful interfaces.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {quickStats.map((stat, index) => (
            <Card key={index} className="p-6 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white/60 font-medium">{stat.label}</span>
                <TrendingUp className="w-4 h-4 text-white/40 group-hover:text-white/60 transition-colors" />
              </div>
              <div className="flex items-end space-x-2">
                <span className="text-2xl font-bold text-white">{stat.value}</span>
                <span className={`text-sm font-medium ${stat.color}`}>{stat.trend}</span>
              </div>
            </Card>
          ))}
        </div>

        {/* Main Modules */}
        <div className="grid lg:grid-cols-3 gap-8">
          {modules.map((module, index) => {
            const IconComponent = module.icon;
            return (
              <Card 
                key={index} 
                className="p-8 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105 group rounded-2xl"
              >
                <div className="space-y-6">
                  {/* Module Header */}
                  <div className="flex items-start justify-between">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${module.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-right">
                      <Badge className="bg-white/20 text-white border-white/30 text-xs">
                        {module.status}
                      </Badge>
                      <div className="text-xs text-white/50 mt-1">{module.users} users</div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-white/90 transition-colors">
                      {module.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed text-sm">
                      {module.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    {module.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#ff6ec4] to-[#7873f5]" />
                        <span className="text-sm text-white/60">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <Button className="w-full bg-gradient-to-r from-[#ff6ec4]/20 to-[#7873f5]/20 border border-white/30 text-white hover:from-[#ff6ec4]/30 hover:to-[#7873f5]/30 hover:scale-105 transition-all duration-300 backdrop-blur-md">
                    Explore Module
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DashboardModules;
