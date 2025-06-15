
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ResidentDashboard from "./pages/ResidentDashboard";
import VisitorManagement from "./pages/VisitorManagement";
import MaintenancePortal from "./pages/MaintenancePortal";
import AdminPanel from "./pages/AdminPanel";
import ServiceProviders from "./pages/ServiceProviders";
import FacilityBookingPage from "./pages/FacilityBookingPage";
import PollDetails from "./pages/PollDetails";
import EventDetails from "./pages/EventDetails";
import ComplaintDetails from "./pages/ComplaintDetails";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/resident-dashboard" element={<ResidentDashboard />} />
            <Route path="/visitor-management" element={<VisitorManagement />} />
            <Route path="/maintenance-portal" element={<MaintenancePortal />} />
            <Route path="/service-providers" element={<ServiceProviders />} />
            <Route path="/facility-booking" element={<FacilityBookingPage />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/poll/:id" element={<PollDetails />} />
            <Route path="/event/:id" element={<EventDetails />} />
            <Route path="/complaint/:id" element={<ComplaintDetails />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
