import { useState } from "react";
import { Header } from "@/components/admin/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Bell } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const mockRestaurants = [
  {
    id: "Rest1234",
    name: "Green Bites Café",
    city: "Sydney",
    phone: "+61 2 9876 5432",
    status: "Approved",
    certificateExpiry: "2025-06-15",
  },
  {
    id: "Rest4576",
    name: "Eco Eats Restaurant",
    city: "Melbourne",
    phone: "+61 3 8765 4321",
    status: "Pending",
    certificateExpiry: "2024-11-19",
  },
  {
    id: "Rest7890",
    name: "Fresh Harvest Bistro",
    city: "Brisbane",
    phone: "+61 7 7654 3210",
    status: "Approved",
    certificateExpiry: "2025-08-20",
  },
  {
    id: "Rest3456",
    name: "Waste Not Cafe",
    city: "Perth",
    phone: "+61 8 6543 2109",
    status: "Rejected",
    certificateExpiry: "2024-12-10",
  },
];

const mockAlerts = [
  {
    id: 1,
    message: "Rest1234 has uploaded a new document.",
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    message: "Rest4576: Food Certificate is expiring tomorrow.",
    timestamp: "5 hours ago",
  },
  {
    id: 3,
    message: "Rest7890 updated their profile information.",
    timestamp: "1 day ago",
  },
];

export default function Restaurants() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Approved":
        return "default";
      case "Pending":
        return "secondary";
      case "Rejected":
        return "destructive";
      default:
        return "outline";
    }
  };

  const filteredRestaurants = mockRestaurants.filter((restaurant) => {
    const matchesSearch =
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.phone.includes(searchQuery);

    const matchesTab =
      activeTab === "all" || restaurant.status.toLowerCase() === activeTab;

    return matchesSearch && matchesTab;
  });

  const renderTable = (showStatus: boolean) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Restaurant ID</TableHead>
          <TableHead>Restaurant Name</TableHead>
          <TableHead>Phone Number</TableHead>
          <TableHead>City</TableHead>
          <TableHead>Food Certificate Expiry Date</TableHead>
          {showStatus && <TableHead>Status</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredRestaurants.map((restaurant) => (
          <TableRow key={restaurant.id} className="hover:bg-muted/50">
            <TableCell className="font-medium">{restaurant.id}</TableCell>
            <TableCell>{restaurant.name}</TableCell>
            <TableCell>{restaurant.phone}</TableCell>
            <TableCell>{restaurant.city}</TableCell>
            <TableCell>{restaurant.certificateExpiry}</TableCell>
            {showStatus && (
              <TableCell>
                <Badge variant={getStatusVariant(restaurant.status)}>
                  {restaurant.status}
                </Badge>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header
        title="Restaurant Management"
        subtitle="View, approve, and manage restaurant applications"
      />

      <main className="p-6 space-y-6">
        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, city, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>

            {/* Critical Alerts Drawer */}
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline" className="gap-2 relative">
                  <Bell className="h-4 w-4" />
                  Critical Alerts
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center">
                    {mockAlerts.length}
                  </span>
                </Button>
              </DrawerTrigger>
              <DrawerContent className="h-[85vh] fixed right-0 top-0 bottom-0 left-auto w-[35%] rounded-l-lg">
                <DrawerHeader className="border-b">
                  <DrawerTitle>Critical Alerts</DrawerTitle>
                  <DrawerDescription>
                    Recent notifications requiring your attention
                  </DrawerDescription>
                </DrawerHeader>
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {mockAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 mt-1">
                          <Bell className="h-5 w-5 text-warning" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium text-foreground">
                            {alert.message}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {alert.timestamp}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t p-4">
                  <DrawerClose asChild>
                    <Button variant="outline" className="w-full">
                      Close
                    </Button>
                  </DrawerClose>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-card rounded-lg border card-shadow overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="p-4 border-b bg-muted/20">
              <TabsList className="bg-background h-11">
                <TabsTrigger
                  value="all"
                  className="rounded-full px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="approved"
                  className="rounded-full px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
                >
                  Approved
                </TabsTrigger>
                <TabsTrigger
                  value="pending"
                  className="rounded-full px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
                >
                  Pending
                </TabsTrigger>
                <TabsTrigger
                  value="rejected"
                  className="rounded-full px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
                >
                  Rejected
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="m-0">
              {renderTable(true)}
            </TabsContent>

            <TabsContent value="approved" className="m-0">
              {renderTable(false)}
            </TabsContent>

            <TabsContent value="pending" className="m-0">
              {renderTable(false)}
            </TabsContent>

            <TabsContent value="rejected" className="m-0">
              {renderTable(false)}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
