import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import SmartNavbar from "@/components/SmartNavbar";
import Navbar from "@/components/Navbar";
import Index from "./pages/Index";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import Services from "./pages/Services";
import Training from "./pages/Training";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MarketReports from "./pages/MarketReports";
import Investments from "./pages/Investments";
import AdminDashboard from "./pages/AdminDashboard";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <div className="min-h-screen">
          <Toaster />
          <Sonner />
          <SmartNavbar>
            <Navbar />
          </SmartNavbar>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/properties/:slug" element={<PropertyDetail />} />
            <Route path="/services" element={<Services />} />
            <Route path="/training" element={<Training />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/reports" element={<MarketReports />} />
            <Route path="/investments" element={<Investments />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<AdminDashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
