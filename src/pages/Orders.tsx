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
import { Eye, Search, DollarSign } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const mockOrders = [
  {
    id: "#ORD-2024-001",
    restaurant: "Green Bites Café",
    customer: "Emma Wilson",
    items: 3,
    amount: "$45.50",
    status: "Completed",
    date: "2024-03-15 14:30",
    paymentMethod: "Card",
  },
  {
    id: "#ORD-2024-002",
    restaurant: "Eco Eats Restaurant",
    customer: "James Brown",
    items: 2,
    amount: "$32.00",
    status: "Pending",
    date: "2024-03-15 15:45",
    paymentMethod: "PayPal",
  },
  {
    id: "#ORD-2024-003",
    restaurant: "Fresh Harvest Bistro",
    customer: "Sophie Chen",
    items: 5,
    amount: "$67.80",
    status: "Completed",
    date: "2024-03-15 16:20",
    paymentMethod: "Card",
  },
];

export default function Orders() {
  const [searchQuery, setSearchQuery] = useState("");

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Completed":
        return "default";
      case "Pending":
        return "secondary";
      case "Cancelled":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        title="Order Management"
        subtitle="Track and manage all transactions"
      />

      <main className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-success/20 to-success/5 border border-success/20 rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-1">Total Orders</p>
            <p className="text-2xl font-bold">1,643</p>
          </div>
          <div className="bg-gradient-to-br from-warning/20 to-warning/5 border border-warning/20 rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-1">Pending</p>
            <p className="text-2xl font-bold">28</p>
          </div>
          <div className="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-1">Completed</p>
            <p className="text-2xl font-bold">1,598</p>
          </div>
          <div className="bg-gradient-to-br from-success/20 to-success/5 border border-success/20 rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-1">Revenue</p>
            <p className="text-2xl font-bold">$54,283</p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by order ID, restaurant, or customer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="bg-card rounded-lg border card-shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Restaurant</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockOrders.map((order) => (
                <TableRow key={order.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.restaurant}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell className="font-semibold">{order.amount}</TableCell>
                  <TableCell>{order.paymentMethod}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{order.date}</TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Order Details - {order.id}</DialogTitle>
                          <DialogDescription>
                            View complete order information
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Restaurant</p>
                              <p className="font-medium">{order.restaurant}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Customer</p>
                              <p className="font-medium">{order.customer}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Total Items</p>
                              <p className="font-medium">{order.items}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Amount</p>
                              <p className="font-semibold text-lg">{order.amount}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Payment Method</p>
                              <p className="font-medium">{order.paymentMethod}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Status</p>
                              <Badge variant={getStatusVariant(order.status)}>
                                {order.status}
                              </Badge>
                            </div>
                          </div>
                          <div className="border-t pt-4">
                            <p className="text-sm text-muted-foreground mb-2">Order Items</p>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Veggie Burger Combo</span>
                                <span className="font-medium">$15.50</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Green Smoothie</span>
                                <span className="font-medium">$8.00</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Organic Salad Bowl</span>
                                <span className="font-medium">$12.00</span>
                              </div>
                            </div>
                          </div>
                        </div>
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
