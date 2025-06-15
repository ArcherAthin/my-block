
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Crown, Shield } from 'lucide-react';

const PricingSection = () => {
  const plans = [
    {
      name: "Basic",
      description: "Perfect for small communities",
      price: "Free",
      period: "Forever",
      color: "from-[#06b6d4] to-[#0891b2]",
      icon: Shield,
      popular: false,
      features: [
        "Up to 50 residents",
        "Basic resident portal",
        "Visitor management",
        "Simple notifications",
        "Email support",
        "Basic reporting"
      ],
      limitations: ["Limited storage", "Basic templates only"]
    },
    {
      name: "Pro", 
      description: "Most popular for growing neighborhoods",
      price: "$29",
      period: "per month",
      color: "from-[#ff6ec4] to-[#7873f5]",
      icon: Star,
      popular: true,
      features: [
        "Up to 500 residents",
        "Advanced dashboard",
        "Committee management",
        "Facility booking system",
        "Vendor marketplace",
        "Financial tracking",
        "Custom notifications",
        "Priority support",
        "Advanced analytics"
      ],
      limitations: []
    },
    {
      name: "Team",
      description: "Enterprise solution for large communities",
      price: "$99",
      period: "per month", 
      color: "from-[#1e293b] to-[#0f172a]",
      icon: Crown,
      popular: false,
      features: [
        "Unlimited residents",
        "Multi-community management",
        "Advanced governance tools",
        "Custom integrations",
        "White-label solution",
        "Dedicated account manager",
        "24/7 phone support",
        "Custom development",
        "SLA guarantee"
      ],
      limitations: []
    }
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <Badge className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            💎 Flexible Pricing
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            Choose Your <span className="bg-gradient-to-r from-[#ff6ec4] to-[#7873f5] bg-clip-text text-transparent">Plan</span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Scale with your community's needs. From small neighborhoods to large townships, 
            we have the perfect solution for your civic management requirements.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            
            return (
              <Card 
                key={index} 
                className={`relative p-8 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105 rounded-2xl overflow-hidden ${
                  plan.popular ? 'ring-2 ring-[#ff6ec4] shadow-xl shadow-[#ff6ec4]/20' : ''
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-[#ff6ec4] to-[#7873f5] text-white border-0 px-4 py-2">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Plan Header */}
                  <div className="text-center space-y-4">
                    <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${plan.color} flex items-center justify-center shadow-lg`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                      <p className="text-white/70 text-sm">{plan.description}</p>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-baseline justify-center space-x-1">
                        <span className="text-4xl font-bold text-white">{plan.price}</span>
                        {plan.price !== "Free" && <span className="text-white/60 text-sm">/{plan.period.split(' ')[1]}</span>}
                      </div>
                      <div className="text-white/60 text-sm">{plan.period}</div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span className="text-white/80 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Limitations */}
                  {plan.limitations.length > 0 && (
                    <div className="space-y-2 pt-4 border-t border-white/20">
                      <div className="text-white/60 text-xs font-medium uppercase tracking-wide">Limitations</div>
                      {plan.limitations.map((limitation, limitIndex) => (
                        <div key={limitIndex} className="flex items-center space-x-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-white/40 flex-shrink-0" />
                          <span className="text-white/60 text-xs">{limitation}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* CTA Button */}
                  <Button 
                    className={`w-full transition-all duration-300 hover:scale-105 ${
                      plan.popular 
                        ? "bg-gradient-to-r from-[#ff6ec4] to-[#7873f5] text-white border-0 shadow-lg" 
                        : plan.name === "Team"
                        ? "bg-gradient-to-r from-[#1e293b] to-[#0f172a] text-white border border-white/30"
                        : "bg-white/20 text-white border border-white/30 hover:bg-white/30"
                    }`}
                  >
                    {plan.name === "Basic" ? "Get Started Free" : 
                     plan.name === "Team" ? "Contact Sales" : 
                     "Start 14-Day Trial"}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 space-y-4">
          <p className="text-white/70">
            Need a custom solution? 
            <a href="#" className="text-[#ff6ec4] hover:text-[#7873f5] transition-colors ml-1 underline">
              Contact our sales team
            </a>
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-white/60">
            <span>✓ 14-day free trial</span>
            <span>✓ No setup fees</span>
            <span>✓ Cancel anytime</span>
            <span>✓ 24/7 support</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
