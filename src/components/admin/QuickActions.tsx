import { CheckCircle, Plus, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function QuickActions() {
  return (
    <Card className="hover-lift border card-shadow">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button
          className="w-full justify-start bg-success hover:bg-success/90 text-success-foreground"
          size="lg"
        >
          <CheckCircle className="mr-2 h-5 w-5" />
          Approve Pending Restaurants
        </Button>
        <Button
          className="w-full justify-start bg-warning hover:bg-warning/90 text-warning-foreground"
          size="lg"
        >
          <Plus className="mr-2 h-5 w-5" />
          Add New Banner
        </Button>
        <Button
          className="w-full justify-start"
          variant="outline"
          size="lg"
        >
          <Eye className="mr-2 h-5 w-5" />
          View Latest Orders
        </Button>
      </CardContent>
    </Card>
  );
}
