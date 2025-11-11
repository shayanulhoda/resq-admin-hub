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
import { Eye, Search, Filter } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mockRestaurants = [
  {
    id: 1,
    name: "Green Bites Café",
    city: "Sydney",
    phone: "+61 2 9876 5432",
    status: "Approved",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "Eco Eats Restaurant",
    city: "Melbourne",
    phone: "+61 3 8765 4321",
    status: "Pending",
    createdAt: "2024-03-20",
  },
  {
    id: 3,
    name: "Fresh Harvest Bistro",
    city: "Brisbane",
    phone: "+61 7 7654 3210",
    status: "Approved",
    createdAt: "2024-02-10",
  },
  {
    id: 4,
    name: "Waste Not Cafe",
    city: "Perth",
    phone: "+61 8 6543 2109",
    status: "Rejected",
    createdAt: "2024-03-01",
  },
];

export default function Restaurants() {
  const [searchQuery, setSearchQuery] = useState("");

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
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>

        {/* Restaurants Table */}
        <div className="bg-card rounded-lg border card-shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockRestaurants.map((restaurant) => (
                <TableRow key={restaurant.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{restaurant.name}</TableCell>
                  <TableCell>{restaurant.city}</TableCell>
                  <TableCell>{restaurant.phone}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(restaurant.status)}>
                      {restaurant.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{restaurant.createdAt}</TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl">
                        <DialogHeader>
                          <DialogTitle>{restaurant.name}</DialogTitle>
                          <DialogDescription>
                            View restaurant details and take actions
                          </DialogDescription>
                        </DialogHeader>

                        <Tabs defaultValue="details" className="w-full">
                          <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="details">Details</TabsTrigger>
                            <TabsTrigger value="documents">Documents</TabsTrigger>
                            <TabsTrigger value="images">Images</TabsTrigger>
                            <TabsTrigger value="history">History</TabsTrigger>
                          </TabsList>

                          <TabsContent value="details" className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                  Restaurant Name
                                </label>
                                <p className="text-base font-medium">{restaurant.name}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                  City
                                </label>
                                <p className="text-base font-medium">{restaurant.city}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                  Phone
                                </label>
                                <p className="text-base font-medium">{restaurant.phone}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                  Status
                                </label>
                                <div className="mt-1">
                                  <Badge variant={getStatusVariant(restaurant.status)}>
                                    {restaurant.status}
                                  </Badge>
                                </div>
                              </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                              <Button className="bg-success hover:bg-success/90 text-success-foreground">
                                ✅ Approve
                              </Button>
                              <Button variant="destructive">❌ Reject</Button>
                            </div>
                          </TabsContent>

                          <TabsContent value="documents">
                            <p className="text-muted-foreground">Documents will be displayed here</p>
                          </TabsContent>

                          <TabsContent value="images">
                            <p className="text-muted-foreground">Images will be displayed here</p>
                          </TabsContent>

                          <TabsContent value="history">
                            <p className="text-muted-foreground">Action history will be displayed here</p>
                          </TabsContent>
                        </Tabs>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
}
