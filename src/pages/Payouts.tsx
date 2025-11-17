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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Search, Download, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const mockPayouts = [
  {
    id: 1,
    restaurantId: "REST001",
    restaurantName: "Green Bowl Cafe",
    address: "123 Main St, Downtown",
    ordersCount: 24,
    weeklyAmount: 1250.50,
    orders: [
      { orderId: "ORD-2024-001", amount: 45.99, receipt: "receipt-001.pdf" },
      { orderId: "ORD-2024-002", amount: 78.50, receipt: "receipt-002.pdf" },
      { orderId: "ORD-2024-003", amount: 32.25, receipt: "receipt-003.pdf" },
    ],
  },
  {
    id: 2,
    restaurantId: "REST002",
    restaurantName: "Spice Garden",
    address: "456 Oak Ave, Eastside",
    ordersCount: 18,
    weeklyAmount: 890.75,
    orders: [
      { orderId: "ORD-2024-004", amount: 52.30, receipt: "receipt-004.pdf" },
      { orderId: "ORD-2024-005", amount: 91.20, receipt: "receipt-005.pdf" },
    ],
  },
  {
    id: 3,
    restaurantId: "REST003",
    restaurantName: "Ocean Breeze Diner",
    address: "789 Beach Rd, Waterfront",
    ordersCount: 31,
    weeklyAmount: 1580.25,
    orders: [
      { orderId: "ORD-2024-006", amount: 65.80, receipt: "receipt-006.pdf" },
      { orderId: "ORD-2024-007", amount: 120.45, receipt: "receipt-007.pdf" },
      { orderId: "ORD-2024-008", amount: 43.90, receipt: "receipt-008.pdf" },
    ],
  },
];

export default function Payouts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPayout, setSelectedPayout] = useState<typeof mockPayouts[0] | null>(null);
  const [orderSearchQuery, setOrderSearchQuery] = useState("");
  const [autoPayEnabled, setAutoPayEnabled] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const { toast } = useToast();

  const handlePayNow = (restaurantName: string, amount: number) => {
    toast({
      title: "Payment Initiated",
      description: `Processing payment of $${amount.toFixed(2)} to ${restaurantName}`,
    });
  };

  const handleDownloadReceipt = (receipt: string) => {
    toast({
      title: "Download Started",
      description: `Downloading ${receipt}`,
    });
  };

  const filteredPayouts = mockPayouts.filter(
    (payout) =>
      payout.restaurantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payout.restaurantId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredOrders = selectedPayout?.orders.filter(
    (order) =>
      order.orderId.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
      order.amount.toString().includes(orderSearchQuery)
  );

  const getNextPayoutDate = () => {
    const today = new Date();
    const daysUntilSunday = (7 - today.getDay()) % 7 || 7;
    const nextSunday = new Date(today);
    nextSunday.setDate(today.getDate() + daysUntilSunday);
    return nextSunday.toLocaleDateString("en-US", { 
      weekday: "long", 
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    });
  };

  return (
    <div className="p-8 space-y-6 bg-background min-h-screen">
      <div className="flex items-center justify-between">
        <Header
          title="Payouts Management"
          subtitle="Manage restaurant payouts and auto-payment settings"
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowSettings(!showSettings)}
          className="gap-2"
        >
          <Settings className="h-4 w-4" />
          Settings
        </Button>
      </div>

      {showSettings && (
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle>Payout Settings</CardTitle>
            <CardDescription>Configure automatic payment processing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="auto-pay" className="text-base font-medium">
                  Enable Weekly Auto-Pay
                </Label>
                <p className="text-sm text-muted-foreground">
                  {autoPayEnabled
                    ? "Auto-pay will automatically process payments every week on Sunday at 11:59 PM."
                    : "Manual approval required for all payments."}
                </p>
              </div>
              <Switch
                id="auto-pay"
                checked={autoPayEnabled}
                onCheckedChange={setAutoPayEnabled}
              />
            </div>

            {autoPayEnabled && (
              <div className="rounded-lg bg-success/10 border border-success/20 p-4">
                <p className="text-sm font-medium text-success-foreground">
                  Next Scheduled Payout
                </p>
                <p className="text-2xl font-bold text-success mt-1">
                  {getNextPayoutDate()} at 11:59 PM
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Card className="card-shadow">
        <CardHeader>
          <CardTitle>Weekly Payouts</CardTitle>
          <CardDescription>Current week's pending restaurant payments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by Restaurant Name or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Restaurant ID</TableHead>
                  <TableHead>Restaurant Name</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead className="text-center">Orders (This Week)</TableHead>
                  <TableHead className="text-center">Order Details</TableHead>
                  <TableHead className="text-right">Amount to Be Paid</TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayouts.map((payout) => (
                  <TableRow key={payout.id}>
                    <TableCell className="font-medium">{payout.restaurantId}</TableCell>
                    <TableCell className="font-semibold">{payout.restaurantName}</TableCell>
                    <TableCell className="text-muted-foreground">{payout.address}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        {payout.ordersCount} orders
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="link"
                        size="sm"
                        onClick={() => {
                          setSelectedPayout(payout);
                          setOrderSearchQuery("");
                        }}
                        className="text-primary hover:text-primary/80"
                      >
                        View
                      </Button>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="text-lg font-bold text-success">
                        ${payout.weeklyAmount.toFixed(2)}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        size="sm"
                        onClick={() => handlePayNow(payout.restaurantName, payout.weeklyAmount)}
                        className="bg-success hover:bg-success/90 text-success-foreground"
                      >
                        Pay Now
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredPayouts.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No payouts found matching your search.
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!selectedPayout} onOpenChange={() => setSelectedPayout(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Order Details - {selectedPayout?.restaurantName}</DialogTitle>
            <DialogDescription>
              Weekly orders included in this payout cycle for {selectedPayout?.restaurantId}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by Order ID or Amount..."
                value={orderSearchQuery}
                onChange={(e) => setOrderSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead className="text-right">Order Amount</TableHead>
                    <TableHead className="text-center">Order Receipt</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders?.map((order) => (
                    <TableRow key={order.orderId}>
                      <TableCell className="font-medium">{order.orderId}</TableCell>
                      <TableCell className="text-right font-semibold">
                        ${order.amount.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadReceipt(order.receipt)}
                          className="gap-2"
                        >
                          <Download className="h-4 w-4" />
                          Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredOrders?.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No orders found matching your search.
              </div>
            )}

            <div className="flex justify-between items-center pt-4 border-t">
              <span className="font-medium text-muted-foreground">Total Weekly Amount:</span>
              <span className="text-2xl font-bold text-success">
                ${selectedPayout?.weeklyAmount.toFixed(2)}
              </span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
