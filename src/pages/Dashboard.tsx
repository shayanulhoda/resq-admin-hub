import { Header } from "@/components/admin/Header";
import { StatCard } from "@/components/admin/StatCard";
import { QuickActions } from "@/components/admin/QuickActions";
import { OrderTrendsChart } from "@/components/admin/OrderTrendsChart";
import { CategoryDistribution } from "@/components/admin/CategoryDistribution";
import {
  Store,
  Clock,
  CheckCircle,
  Package,
  Users,
  AlertCircle,
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Header
        title="Welcome to ResQBox Admin"
        subtitle="Empowering you to make every meal count."
      />

      <main className="p-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <StatCard
            title="Total Restaurants"
            value="248"
            icon={Store}
            variant="default"
          />
          <StatCard
            title="Pending Approvals"
            value="12"
            icon={Clock}
            variant="warning"
          />
          <StatCard
            title="Approved"
            value="236"
            icon={CheckCircle}
            variant="success"
          />
          <StatCard
            title="Total Orders"
            value="1,643"
            icon={Package}
            variant="default"
          />
          <StatCard
            title="Total Users"
            value="3,891"
            icon={Users}
            variant="success"
          />
          <StatCard
            title="Expiring Soon"
            value="8"
            icon={AlertCircle}
            variant="warning"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <OrderTrendsChart />
          <CategoryDistribution />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <QuickActions />
          
          {/* Additional Info Cards */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-success/10 to-success/5 border border-success/20 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2">💚 Impact Today</h3>
              <p className="text-3xl font-bold text-success mb-1">284</p>
              <p className="text-sm text-muted-foreground">Meals saved from waste</p>
            </div>
            
            <div className="bg-gradient-to-br from-warning/10 to-warning/5 border border-warning/20 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2">🌟 Revenue</h3>
              <p className="text-3xl font-bold text-warning mb-1">$12,458</p>
              <p className="text-sm text-muted-foreground">This month</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
