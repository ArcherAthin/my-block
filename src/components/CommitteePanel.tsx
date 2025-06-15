
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Vote,
  FileText,
  Calendar,
  AlertCircle,
  CheckCircle,
  BarChart3
} from 'lucide-react';

const CommitteePanel = () => {
  const navigate = useNavigate();

  const governance = [
    {
      title: "Fund Management",
      description: "Transparent tracking of community funds with detailed expenditure reports",
      icon: DollarSign,
      data: { balance: "$127,450", expenses: "$23,100", revenue: "$45,200" },
      status: "healthy"
    },
    {
      title: "Poll Publishing",
      description: "Democratic decision making with secure voting and real-time results",
      icon: Vote,
      data: { active: "3", completed: "47", participation: "87%" },
      status: "active"
    },
    {
      title: "Complaint Tracker",
      description: "Systematic issue resolution with priority management and status updates",
      icon: AlertCircle,
      data: { pending: "12", resolved: "145", satisfaction: "92%" },
      status: "improving"
    }
  ];

  const recentActivities = [
    { 
      id: 1,
      type: "poll", 
      title: "Swimming Pool Renovation Proposal", 
      time: "2 hours ago", 
      status: "active",
      route: "/poll/1"
    },
    { 
      id: 2,
      type: "expense", 
      title: "Garden Maintenance Payment", 
      time: "5 hours ago", 
      status: "completed",
      route: "/admin"
    },
    { 
      id: 3,
      type: "meeting", 
      title: "Community Festival Celebration", 
      time: "1 day ago", 
      status: "scheduled",
      route: "/event/1"
    },
    { 
      id: 4,
      type: "complaint", 
      title: "Noise Complaint Resolution", 
      time: "2 days ago", 
      status: "resolved",
      route: "/complaint/1"
    }
  ];

  const handleActivityClick = (activity: any) => {
    navigate(activity.route);
  };

  return (
    <section id="committee" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <Badge className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            🏛️ Democratic Governance
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            Committee <span className="bg-gradient-to-r from-[#ff6ec4] to-[#7873f5] bg-clip-text text-transparent">Admin Panel</span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Streamline community governance with transparent fund management, 
            democratic voting systems, and efficient complaint resolution.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {governance.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Card key={index} className="p-8 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105 group rounded-2xl">
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#7873f5] to-[#ff6ec4] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <Badge className={`${
                      item.status === 'healthy' ? 'bg-green-500/20 text-green-300 border-green-500/30' :
                      item.status === 'active' ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' :
                      'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                    }`}>
                      {item.status}
                    </Badge>
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                    <p className="text-white/70 text-sm leading-relaxed">{item.description}</p>
                  </div>

                  {/* Data Points */}
                  <div className="grid grid-cols-1 gap-3">
                    {Object.entries(item.data).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center py-2 px-3 rounded-lg bg-white/10">
                        <span className="text-sm text-white/60 capitalize">{key}</span>
                        <span className="text-sm font-bold text-white">{value}</span>
                      </div>
                    ))}
                  </div>

                  <Button 
                    onClick={() => navigate('/admin')}
                    className="w-full bg-gradient-to-r from-[#7873f5]/20 to-[#ff6ec4]/20 border border-white/30 text-white hover:from-[#7873f5]/30 hover:to-[#ff6ec4]/30 hover:scale-105 transition-all duration-300"
                  >
                    Manage {item.title.split(' ')[0]}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Recent Activities */}
        <Card className="p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white">Recent Activities</h3>
            <BarChart3 className="w-6 h-6 text-white/60" />
          </div>
          
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div 
                key={activity.id} 
                className="flex items-center justify-between p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                onClick={() => handleActivityClick(activity)}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${
                    activity.status === 'active' ? 'bg-blue-400' :
                    activity.status === 'completed' ? 'bg-green-400' :
                    activity.status === 'resolved' ? 'bg-green-400' :
                    'bg-yellow-400'
                  }`} />
                  <div>
                    <div className="text-white font-medium hover:text-white/90 transition-colors">{activity.title}</div>
                    <div className="text-white/60 text-sm">{activity.time}</div>
                  </div>
                </div>
                <Badge className="bg-white/20 text-white border-white/30 text-xs">
                  {activity.type}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default CommitteePanel;
