
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useParams } from "react-router-dom";
import Navigation from '@/components/Navigation';
import FloatingBackground from '@/components/FloatingBackground';
import { ArrowLeft, Vote, Users, Calendar, CheckCircle } from 'lucide-react';

const PollDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [hasVoted, setHasVoted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  // Mock poll data
  const poll = {
    id: 1,
    title: "Swimming Pool Renovation Proposal",
    description: "Should we proceed with the swimming pool renovation project that includes new tiles, updated filtration system, and enhanced lighting? The total cost is ₹2.5 lakhs and will be funded from the maintenance reserve.",
    options: [
      { id: 1, text: "Yes, proceed with renovation", votes: 147 },
      { id: 2, text: "No, defer to next year", votes: 43 },
      { id: 3, text: "Modify the scope", votes: 28 }
    ],
    totalVotes: 218,
    endDate: "2024-02-15",
    createdBy: "Committee Administration",
    status: "Active"
  };

  const handleVote = () => {
    if (selectedOption !== null) {
      setHasVoted(true);
      alert(`Thank you for voting! Your vote for "${poll.options.find(o => o.id === selectedOption)?.text}" has been recorded.`);
    }
  };

  const getPercentage = (votes: number) => {
    return poll.totalVotes > 0 ? ((votes / poll.totalVotes) * 100).toFixed(1) : 0;
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingBackground />
      
      <div className="relative z-10">
        <Navigation />
        
        <main className="pt-24 pb-12 px-6">
          <div className="max-w-4xl mx-auto">
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
                <h1 className="text-3xl font-bold text-white">Community Poll</h1>
                <p className="text-white/70">Participate in community decision making</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Poll Content */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">{poll.title}</h2>
                      <p className="text-white/70 leading-relaxed">{poll.description}</p>
                    </div>
                    <Badge className={poll.status === 'Active' ? "bg-green-500/20 text-green-300" : "bg-gray-500/20 text-gray-300"}>
                      {poll.status}
                    </Badge>
                  </div>

                  {!hasVoted ? (
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-white">Cast Your Vote</h3>
                      {poll.options.map((option) => (
                        <div
                          key={option.id}
                          className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                            selectedOption === option.id
                              ? 'border-[#ff6ec4] bg-[#ff6ec4]/10'
                              : 'border-white/30 bg-white/10 hover:bg-white/20'
                          }`}
                          onClick={() => setSelectedOption(option.id)}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`w-4 h-4 rounded-full border-2 ${
                              selectedOption === option.id ? 'border-[#ff6ec4] bg-[#ff6ec4]' : 'border-white/50'
                            }`}>
                              {selectedOption === option.id && (
                                <div className="w-2 h-2 rounded-full bg-white m-0.5" />
                              )}
                            </div>
                            <span className="text-white font-medium">{option.text}</span>
                          </div>
                        </div>
                      ))}
                      
                      <Button
                        onClick={handleVote}
                        disabled={selectedOption === null}
                        className="w-full mt-6 bg-gradient-to-r from-[#ff6ec4] to-[#7873f5] text-white hover:scale-105 transition-all duration-300 disabled:opacity-50"
                      >
                        Submit Vote
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 mb-4">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <h3 className="text-lg font-bold text-white">Vote Submitted</h3>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-green-500/20 border border-green-500/30">
                        <p className="text-green-300">Thank you for participating! Your vote has been recorded.</p>
                      </div>
                    </div>
                  )}
                </Card>

                {/* Results */}
                <Card className="p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                  <h3 className="text-xl font-bold text-white mb-6">Current Results</h3>
                  <div className="space-y-4">
                    {poll.options.map((option) => (
                      <div key={option.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-white font-medium">{option.text}</span>
                          <div className="text-right">
                            <span className="text-white font-bold">{option.votes}</span>
                            <span className="text-white/60 text-sm ml-2">({getPercentage(option.votes)}%)</span>
                          </div>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-3">
                          <div 
                            className="h-3 rounded-full bg-gradient-to-r from-[#ff6ec4] to-[#7873f5]"
                            style={{ width: `${getPercentage(option.votes)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 rounded-lg bg-white/10">
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Total Votes:</span>
                      <span className="text-white font-bold">{poll.totalVotes}</span>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                  <h4 className="text-lg font-bold text-white mb-4">Poll Information</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-white/60" />
                      <div>
                        <p className="text-white/70 text-sm">Ends on</p>
                        <p className="text-white font-medium">{poll.endDate}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-white/60" />
                      <div>
                        <p className="text-white/70 text-sm">Created by</p>
                        <p className="text-white font-medium">{poll.createdBy}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Vote className="w-4 h-4 text-white/60" />
                      <div>
                        <p className="text-white/70 text-sm">Participation</p>
                        <p className="text-white font-medium">{poll.totalVotes} votes</p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                  <h4 className="text-lg font-bold text-white mb-4">Voting Guidelines</h4>
                  <div className="space-y-2 text-white/70 text-sm">
                    <p>• One vote per resident</p>
                    <p>• Votes cannot be changed once submitted</p>
                    <p>• Anonymous voting system</p>
                    <p>• Results are updated in real-time</p>
                    <p>• Poll closes automatically on end date</p>
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

export default PollDetails;
