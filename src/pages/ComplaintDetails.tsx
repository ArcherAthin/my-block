
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useParams } from "react-router-dom";
import Navigation from '@/components/Navigation';
import FloatingBackground from '@/components/FloatingBackground';
import { ArrowLeft, AlertCircle, Clock, User, MessageSquare, CheckCircle, Phone, Mail } from 'lucide-react';

const ComplaintDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock complaint data
  const complaint = {
    id: 1,
    subject: "Noise Complaint - Late Night Music",
    description: "There has been consistently loud music playing from apartment 4B every night between 11 PM and 2 AM for the past week. This is disrupting sleep for multiple residents on floors 3-5. The music includes bass-heavy songs that can be heard through walls and floors.",
    category: "Noise",
    priority: "Medium",
    status: "In Review",
    submittedBy: "John Doe",
    submittedDate: "2024-01-20",
    location: "Building A, Floor 4",
    affectedUnits: ["A-301", "A-302", "A-401", "A-402", "A-501", "A-502"],
    updates: [
      {
        date: "2024-01-20 2:30 PM",
        update: "Complaint received and assigned to security team",
        by: "Admin System"
      },
      {
        date: "2024-01-20 4:15 PM", 
        update: "Security team contacted resident in 4B. Initial warning issued.",
        by: "Security Team"
      },
      {
        date: "2024-01-21 10:00 AM",
        update: "Follow-up scheduled for this evening to monitor compliance",
        by: "Committee Member"
      }
    ],
    assignedTo: {
      name: "Security Team Lead",
      phone: "+91 98765-99999",
      email: "security@myblock.com"
    },
    evidence: [
      "Audio recording from 11:30 PM (Jan 19)",
      "Written complaints from 3 other residents", 
      "Photos of noise level meter readings"
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'In Review': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'Open': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'High': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'Low': return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingBackground />
      
      <div className="relative z-10">
        <Navigation />
        
        <main className="pt-24 pb-12 px-6">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex items-center space-x-4 mb-8">
              <Button
                onClick={() => navigate('/')}
                variant="outline"
                size="icon"
                className="border-white/30 text-white hover:bg-white/10 bg-transparent"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-white">Complaint Details</h1>
                <p className="text-white/70">Track resolution progress</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Complaint Content */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h2 className="text-2xl font-bold text-white">{complaint.subject}</h2>
                        <Badge className={getStatusColor(complaint.status)}>
                          {complaint.status}
                        </Badge>
                        <Badge className={getPriorityColor(complaint.priority)}>
                          {complaint.priority}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-white/60 text-sm">
                        <span>ID: #{complaint.id}</span>
                        <span>Category: {complaint.category}</span>
                        <span>Submitted: {complaint.submittedDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-3">Description</h3>
                      <p className="text-white/70 leading-relaxed">{complaint.description}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-white mb-3">Affected Units</h3>
                      <div className="flex flex-wrap gap-2">
                        {complaint.affectedUnits.map((unit, index) => (
                          <Badge key={index} variant="outline" className="border-white/30 text-white/80">
                            {unit}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-white mb-3">Evidence Submitted</h3>
                      <div className="space-y-2">
                        {complaint.evidence.map((item, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span className="text-white/80">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Updates Timeline */}
                <Card className="p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                  <h3 className="text-xl font-bold text-white mb-6">Resolution Updates</h3>
                  <div className="space-y-6">
                    {complaint.updates.map((update, index) => (
                      <div key={index} className="flex space-x-4">
                        <div className="flex flex-col items-center">
                          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#ff6ec4] to-[#7873f5]"></div>
                          {index < complaint.updates.length - 1 && (
                            <div className="w-0.5 h-12 bg-white/20 mt-2"></div>
                          )}
                        </div>
                        <div className="flex-1 pb-6">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-white font-medium">{update.update}</p>
                            <span className="text-white/60 text-sm">{update.date}</span>
                          </div>
                          <p className="text-white/60 text-sm">Updated by: {update.by}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Response Section */}
                <Card className="p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                  <h3 className="text-xl font-bold text-white mb-6">Committee Response</h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-blue-500/20 border border-blue-500/30">
                      <p className="text-blue-300 font-medium mb-2">Official Response</p>
                      <p className="text-white/80 text-sm">
                        We take noise complaints seriously and have initiated immediate action. Our security team has contacted the resident and issued a formal warning. We will continue monitoring the situation closely over the next few days.
                      </p>
                      <p className="text-blue-300/80 text-xs mt-2">Response by: Committee Administration • Jan 21, 2024</p>
                    </div>

                    <div className="p-4 rounded-lg bg-green-500/20 border border-green-500/30">
                      <p className="text-green-300 font-medium mb-2">Next Steps</p>
                      <ul className="text-white/80 text-sm space-y-1">
                        <li>• Continued monitoring for 48 hours</li>
                        <li>• Final warning if violations continue</li>
                        <li>• Formal community meeting if unresolved</li>
                        <li>• Progress update by Jan 23, 2024</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                  <h4 className="text-lg font-bold text-white mb-4">Complaint Information</h4>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <User className="w-5 h-5 text-white/60 mt-0.5" />
                      <div>
                        <p className="text-white/70 text-sm">Submitted by</p>
                        <p className="text-white font-medium">{complaint.submittedBy}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-white/60 mt-0.5" />
                      <div>
                        <p className="text-white/70 text-sm">Location</p>
                        <p className="text-white font-medium">{complaint.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Clock className="w-5 h-5 text-white/60 mt-0.5" />
                      <div>
                        <p className="text-white/70 text-sm">Date Submitted</p>
                        <p className="text-white font-medium">{complaint.submittedDate}</p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                  <h4 className="text-lg font-bold text-white mb-4">Assigned Team</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-white font-medium">{complaint.assignedTo.name}</p>
                      <p className="text-white/70 text-sm">Handling this complaint</p>
                    </div>
                    
                    <div className="space-y-2">
                      <a
                        href={`tel:${complaint.assignedTo.phone}`}
                        className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        <span className="text-sm">{complaint.assignedTo.phone}</span>
                      </a>
                      
                      <a
                        href={`mailto:${complaint.assignedTo.email}`}
                        className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                        <span className="text-sm">{complaint.assignedTo.email}</span>
                      </a>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                  <h4 className="text-lg font-bold text-white mb-4">Complaint Guidelines</h4>
                  <div className="space-y-2 text-white/70 text-sm">
                    <p>• All complaints are reviewed within 24 hours</p>
                    <p>• You'll receive updates via email</p>
                    <p>• Emergency issues: Call security directly</p>
                    <p>• Anonymous complaints are accepted</p>
                    <p>• Follow-up if no response in 48 hours</p>
                  </div>
                </Card>

                <Card className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                  <h4 className="text-lg font-bold text-white mb-4">Additional Support</h4>
                  <div className="space-y-3">
                    <Button 
                      variant="outline"
                      className="w-full border-white/30 text-white hover:bg-white/10 bg-transparent"
                      onClick={() => alert('Opening feedback form...')}
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Provide Feedback
                    </Button>
                    
                    <Button 
                      variant="outline"
                      className="w-full border-white/30 text-white hover:bg-white/10 bg-transparent"
                      onClick={() => navigate('/maintenance-portal')}
                    >
                      <AlertCircle className="w-4 h-4 mr-2" />
                      Report New Issue
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ComplaintDetails;
