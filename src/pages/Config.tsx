import { Header } from "@/components/admin/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DollarSign, Percent, FileText, RotateCcw } from "lucide-react";

export default function Config() {
  return (
    <div className="min-h-screen bg-background">
      <Header
        title="Platform Configuration"
        subtitle="Manage fees, commissions, taxes, and policies"
      />

      <main className="p-6 space-y-6">
        <Tabs defaultValue="financials" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="financials">Financials</TabsTrigger>
            <TabsTrigger value="taxes">Taxes</TabsTrigger>
            <TabsTrigger value="legal">Legal</TabsTrigger>
            <TabsTrigger value="refunds">Refund Rules</TabsTrigger>
          </TabsList>

          <TabsContent value="financials" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    Platform Fee
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="feeType">Fee Type</Label>
                    <Select defaultValue="percentage">
                      <SelectTrigger id="feeType">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">Percentage</SelectItem>
                        <SelectItem value="flat">Flat Amount</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="feeAmount">Fee Amount</Label>
                    <Input id="feeAmount" defaultValue="2.5" type="number" />
                  </div>
                  <Button className="w-full bg-success hover:bg-success/90">
                    Save Platform Fee
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Percent className="h-5 w-5 text-warning" />
                    Restaurant Commission
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="commissionType">Commission Type</Label>
                    <Select defaultValue="percentage">
                      <SelectTrigger id="commissionType">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">Percentage</SelectItem>
                        <SelectItem value="flat">Flat Amount</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="commissionAmount">Commission Rate (%)</Label>
                    <Input id="commissionAmount" defaultValue="15" type="number" />
                  </div>
                  <Button className="w-full bg-success hover:bg-success/90">
                    Save Commission
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="p-4 bg-muted/50">
                <p className="text-sm text-muted-foreground">
                  <strong>Last Updated:</strong> March 15, 2024 by Admin User
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="taxes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">GST Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gstRate">GST Rate (%)</Label>
                    <Input id="gstRate" defaultValue="10" type="number" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="taxDisplay">Tax Display Method</Label>
                    <Select defaultValue="inclusive">
                      <SelectTrigger id="taxDisplay">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inclusive">Inclusive</SelectItem>
                        <SelectItem value="exclusive">Exclusive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button className="bg-success hover:bg-success/90">Save Tax Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="legal" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Privacy Policy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input defaultValue="https://resqbox.com.au/privacy" />
                  <Button variant="outline" size="sm" className="w-full">
                    Update Link
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Terms of Service
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input defaultValue="https://resqbox.com.au/terms" />
                  <Button variant="outline" size="sm" className="w-full">
                    Update Link
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Refund Policy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input defaultValue="https://resqbox.com.au/refunds" />
                  <Button variant="outline" size="sm" className="w-full">
                    Update Link
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="refunds" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <RotateCcw className="h-5 w-5 text-primary" />
                  Refund Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="refundWindow">Auto-Refund Window (hours)</Label>
                    <Input id="refundWindow" defaultValue="24" type="number" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="feeResponsibility">Fee Responsibility</Label>
                    <Select defaultValue="restaurant">
                      <SelectTrigger id="feeResponsibility">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="restaurant">Restaurant</SelectItem>
                        <SelectItem value="platform">Platform</SelectItem>
                        <SelectItem value="customer">Customer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button className="bg-success hover:bg-success/90">Save Refund Rules</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20">
          <CardContent className="p-4">
            <p className="text-sm font-medium">⚠️ Configuration Changes</p>
            <p className="text-sm text-muted-foreground mt-1">
              All configuration changes will be effective immediately after saving. Please review carefully before confirming.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
