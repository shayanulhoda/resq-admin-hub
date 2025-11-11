import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminLayout } from "./components/admin/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Banners from "./pages/Banners";
import Restaurants from "./pages/Restaurants";
import Users from "./pages/Users";
import Orders from "./pages/Orders";
import Notifications from "./pages/Notifications";
import Roles from "./pages/Roles";
import Team from "./pages/Team";
import Config from "./pages/Config";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminLayout><Dashboard /></AdminLayout>} />
          <Route path="/banners" element={<AdminLayout><Banners /></AdminLayout>} />
          <Route path="/restaurants" element={<AdminLayout><Restaurants /></AdminLayout>} />
          <Route path="/users" element={<AdminLayout><Users /></AdminLayout>} />
          <Route path="/orders" element={<AdminLayout><Orders /></AdminLayout>} />
          <Route path="/notifications" element={<AdminLayout><Notifications /></AdminLayout>} />
          <Route path="/roles" element={<AdminLayout><Roles /></AdminLayout>} />
          <Route path="/team" element={<AdminLayout><Team /></AdminLayout>} />
          <Route path="/config" element={<AdminLayout><Config /></AdminLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
