import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Programme from "./pages/Programme";
import InfosPratiques from "./pages/InfosPratiques";
import Billetterie from "./pages/Billetterie";
import Paiement from "./pages/Paiement";
import PaiementSuccess from "./pages/PaiementSuccess";
import PaiementCancel from "./pages/PaiementCancel";
import Admin from "./pages/Admin";
import Scan from "./pages/Scan";
import CGV from "./pages/CGV";
import PolitiqueRemboursement from "./pages/PolitiqueRemboursement";
import MentionsLegales from "./pages/MentionsLegales";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/programme" element={<Programme />} />
          <Route path="/billetterie" element={<Billetterie />} />
          <Route path="/paiement/:reservationId" element={<Paiement />} />
          <Route path="/paiement/success" element={<PaiementSuccess />} />
          <Route path="/paiement/cancel" element={<PaiementCancel />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/scan" element={<Scan />} />
          <Route path="/infos-pratiques" element={<InfosPratiques />} />
          <Route path="/cgv" element={<CGV />} />
          <Route path="/politique-remboursement" element={<PolitiqueRemboursement />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
