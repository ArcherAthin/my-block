
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import Navigation from '@/components/Navigation';
import FloatingBackground from '@/components/FloatingBackground';
import { 
  Wrench, 
  Upload, 
  Clock, 
  ArrowLeft,
  Star,
  CheckCircle,
  AlertCircle,
  Camera,
  FileText,
  User
} from 'lucide-react';

const MaintenancePortal = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('submit-issue');
  const [issueForm, setIssueForm] = useState({
    subject: '',
    description: '',
    category: '',
    priority: 'Medium',
    location: ''
  });

  const [myIssues] = useState([
    { 
      id: 1, 
      subject: 'AC Not Working', 
      category: 'Electrical', 
      status: 'In Progress', 
      priority: 'High',
      submittedDate: '2024-01-18',
      description: 'Air conditioning unit in living room stopped working',
      rating: null
    },
    { 
      id: 2, 
      subject: 'Water Leakage', 
      category: 'Plumbing', 
      status: 'Completed', 
      priority: 'Medium',
      submittedDate: '2024-01-15',
      description: 'Kitchen sink has minor leakage issue',
      rating: 5
    },
    { 
      id: 3, 
      subject: 'Door Lock Issue', 
      category: 'Hardware', 
      status: 'Pending', 
      priority: 'Low',
      submittedDate: '2024-01-20',
      description: 'Main door lock is difficult to operate',
      rating: null
    }
  ]);

  const handleIssueSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const issueId = 'ISS' + Math.random().toString(36).substr(2, 6).toUpperCase();
    alert(`Issue submitted successfully!\nTicket ID: ${issueId}\nYou will receive updates via email.`);
    setIssueForm({
      subject: '',
      description: '',
      category: '',
      priority: 'Medium',
      location: ''
    });
  };

  const handleRating = (issueId: number, rating: number) => {
    alert(`Thank you for rating! You gave ${rating} stars for issue #${issueId}`);
  };

  const categories = ['Electrical', 'Plumbing', 'HVAC', 'Hardware', 'Cleaning', 'Other'];
  const priorities = ['Low', 'Medium', 'High', 'Critical'];

  const tabs = [
    { id: 'submit-issue', label: 'Submit Issue', icon: Wrench },
    { id: 'my-issues', label: 'My Issues', icon: FileText },
    { id: 'progress-tracker', label: 'Progress Tracker', icon: Clock }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingBackground />
      
      <div className="relative z-10">
        <Navigation />
        
        <main className="pt-24 pb-12 px-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <Button
                  onClick={() => navigate('/')}
                  variant="outline"
                  size="icon"
                  className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <div>
                  <h1 className="text-3xl font-bold text-white">Maintenance Portal</h1>
                  <p className="text-white/70">Submit and track maintenance requests</p>
                </div>
              </div>
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                24/7 Support
              </Badge>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <Button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    variant={activeTab === tab.id ? "default" : "outline"}
                    className={`flex items-center space-x-2 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-[#ff6ec4] to-[#7873f5] text-white border-0'
                        : 'border-white/30 text-white hover:bg-white/10 bg-transparent'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </Button>
                );
              })}
            </div>

            {/* Tab Content */}
            {activeTab === 'submit-issue' && (
              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                  <h3 className="text-xl font-bold text-white mb-6">Report Maintenance Issue</h3>
                  <form onSubmit={handleIssueSubmit} className="space-y-4">
                    <div>
                      <label className="block text-white/70 mb-2">Issue Subject</label>
                      <Input
                        value={issueForm.subject}
                        onChange={(e) => setIssueForm({...issueForm, subject: e.target.value})}
                        placeholder="Brief description of the issue"
                        required
                        className="bg-white/10 border-white/20 text-white placeholder-white/60"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white/70 mb-2">Category</label>
                        <select
                          value={issueForm.category}
                          onChange={(e) => setIssueForm({...issueForm, category: e.target.value})}
                          required
                          className="w-full p-2 rounded-md bg-white/10 border border-white/20 text-white"
                        >
                          <option value="">Select Category</option>
                          {categories.map(cat => (
                            <option key={cat} value={cat} className="bg-gray-800">{cat}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-white/70 mb-2">Priority</label>
                        <select
                          value={issueForm.priority}
                          onChange={(e) => setIssueForm({...issueForm, priority: e.target.value})}
                          className="w-full p-2 rounded-md bg-white/10 border border-white/20 text-white"
                        >
                          {priorities.map(priority => (
                            <option key={priority} value={priority} className="bg-gray-800">{priority}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-white/70 mb-2">Location</label>
                      <Input
                        value={issueForm.location}
                        onChange={(e) => setIssueForm({...issueForm, location: e.target.value})}
                        placeholder="e.g., Living Room, Kitchen, Balcony"
                        required
                        className="bg-white/10 border-white/20 text-white placeholder-white/60"
                      />
                    </div>

                    <div>
                      <label className="block text-white/70 mb-2">Detailed Description</label>
                      <textarea
                        value={issueForm.description}
                        onChange={(e) => setIssueForm({...issueForm, description: e.target.value})}
                        placeholder="Provide detailed description of the issue..."
                        required
                        rows={4}
                        className="w-full p-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60 resize-none"
                      />
                    </div>

                    <div className="border-2 border-dashed border-white/30 rounded-lg p-6 text-center">
                      <Camera className="w-8 h-8 text-white/60 mx-auto mb-2" />
                      <p className="text-white/70 mb-2">Upload Photos (Optional)</p>
                      <Button
                        type="button"
                        variant="outline"
                        className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Choose Files
                      </Button>
                      <p className="text-white/50 text-xs mt-2">Supports JPG, PNG, PDF (Max 5MB)</p>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#10b981] to-[#059669] text-white hover:scale-105 transition-all duration-300"
                    >
                      Submit Issue Report
                    </Button>
                  </form>
                </Card>

                <Card className="p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                  <h3 className="text-xl font-bold text-white mb-6">Support Information</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-white font-medium mb-3">Response Times</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-white/70">Critical Issues</span>
                          <span className="text-white">2-4 hours</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">High Priority</span>
                          <span className="text-white">8-12 hours</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Medium Priority</span>
                          <span className="text-white">1-2 days</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Low Priority</span>
                          <span className="text-white">3-5 days</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-white font-medium mb-3">Emergency Contact</h4>
                      <div className="p-4 rounded-lg bg-red-500/20 border border-red-500/30">
                        <p className="text-red-300 font-medium">24/7 Emergency Helpline</p>
                        <p className="text-white text-lg font-bold">+91 9999-000-111</p>
                        <p className="text-white/70 text-sm">For urgent issues like water leaks, electrical faults, security concerns</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-white font-medium mb-3">Tips for Better Service</h4>
                      <ul className="space-y-2 text-white/70 text-sm">
                        <li>• Be specific in your description</li>
                        <li>• Include photos when possible</li>
                        <li>• Mention exact location</li>
                        <li>• Select appropriate priority level</li>
                        <li>• Provide contact details</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {activeTab === 'my-issues' && (
              <div className="space-y-6">
                {myIssues.map((issue) => (
                  <Card key={issue.id} className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-white font-bold text-lg">{issue.subject}</h4>
                          <Badge className={`${
                            issue.status === 'Completed' ? 'bg-green-500/20 text-green-300' :
                            issue.status === 'In Progress' ? 'bg-yellow-500/20 text-yellow-300' :
                            'bg-gray-500/20 text-gray-300'
                          }`}>
                            {issue.status}
                          </Badge>
                          <Badge className={`${
                            issue.priority === 'Critical' ? 'bg-red-500/20 text-red-300' :
                            issue.priority === 'High' ? 'bg-orange-500/20 text-orange-300' :
                            issue.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                            'bg-gray-500/20 text-gray-300'
                          }`}>
                            {issue.priority}
                          </Badge>
                        </div>
                        <p className="text-white/70 mb-2">{issue.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-white/60">
                          <span>Category: {issue.category}</span>
                          <span>Submitted: {issue.submittedDate}</span>
                          <span>ID: #{issue.id}</span>
                        </div>
                      </div>
                      
                      {issue.status === 'Completed' && !issue.rating && (
                        <div className="ml-6">
                          <p className="text-white/70 text-sm mb-2">Rate this service:</p>
                          <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                onClick={() => handleRating(issue.id, star)}
                                className="text-yellow-400 hover:text-yellow-300 transition-colors"
                              >
                                <Star className="w-5 h-5" />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {issue.rating && (
                        <div className="ml-6 text-center">
                          <p className="text-white/70 text-sm mb-1">Your Rating:</p>
                          <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${star <= issue.rating! ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {activeTab === 'progress-tracker' && (
              <Card className="p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-6">Issue Progress Timeline</h3>
                <div className="space-y-8">
                  {/* Sample progress for issue #1 */}
                  <div className="border-l-2 border-white/30 pl-6 ml-3">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 rounded-full bg-green-400 -ml-8 relative z-10"></div>
                        <div>
                          <h4 className="text-white font-medium">Issue Submitted</h4>
                          <p className="text-white/60 text-sm">Your maintenance request has been received</p>
                          <span className="text-white/50 text-xs">Jan 18, 2024 - 2:30 PM</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 rounded-full bg-green-400 -ml-8 relative z-10"></div>
                        <div>
                          <h4 className="text-white font-medium">Assigned to Technician</h4>
                          <p className="text-white/60 text-sm">Technician John Smith has been assigned</p>
                          <span className="text-white/50 text-xs">Jan 18, 2024 - 4:15 PM</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 rounded-full bg-yellow-400 -ml-8 relative z-10"></div>
                        <div>
                          <h4 className="text-white font-medium">Work in Progress</h4>
                          <p className="text-white/60 text-sm">Technician is currently working on the issue</p>
                          <span className="text-white/50 text-xs">Jan 19, 2024 - 10:00 AM</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 rounded-full bg-gray-400 -ml-8 relative z-10"></div>
                        <div>
                          <h4 className="text-white/50 font-medium">Pending Completion</h4>
                          <p className="text-white/40 text-sm">Issue will be marked as completed after verification</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MaintenancePortal;
