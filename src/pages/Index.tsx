
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Home, User, Search, Settings, Clock, Star, CheckCircle, Users, Building, Shield, CreditCard, MessageSquare, Bell, BookOpen, Trophy, MapPin } from 'lucide-react';
import HeroSection from '@/components/HeroSection';
import DashboardModules from '@/components/DashboardModules';
import CommitteePanel from '@/components/CommitteePanel';
import VendorMarketplace from '@/components/VendorMarketplace';
import FacilityBooking from '@/components/FacilityBooking';
import PricingSection from '@/components/PricingSection';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import FloatingBackground from '@/components/FloatingBackground';

const Index = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingBackground />
      
      <div className="relative z-10">
        <Navigation />
        
        <main className="relative">
          <HeroSection scrollY={scrollY} />
          <div id="dashboard">
            <DashboardModules />
          </div>
          <div id="committee">
            <CommitteePanel />
          </div>
          <VendorMarketplace />
          <FacilityBooking />
          <PricingSection />
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Index;
