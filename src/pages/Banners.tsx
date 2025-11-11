import { useState } from "react";
import { Header } from "@/components/admin/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const mockBanners = [
  {
    id: 1,
    title: "Summer Sale 2024",
    redirectUrl: "https://resqbox.com.au/summer-sale",
    isActive: true,
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    title: "Save Food, Save Planet",
    redirectUrl: "https://resqbox.com.au/about",
    isActive: true,
    createdAt: "2024-02-20",
  },
  {
    id: 3,
    title: "Partner Restaurant Week",
    redirectUrl: "https://resqbox.com.au/partners",
    isActive: false,
    createdAt: "2024-03-10",
  },
];

export default function Banners() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header
        title="Banner Management"
        subtitle="Create and manage promotional banners"
      />

      <main className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Total Banners: {mockBanners.length}
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-warning hover:bg-warning/90 text-warning-foreground">
                <Plus className="mr-2 h-4 w-4" />
                Add New Banner
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Banner</DialogTitle>
                <DialogDescription>
                  Add a promotional banner with redirect link
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Banner Title</Label>
                  <Input id="title" placeholder="Enter banner title" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="url">Redirect URL</Label>
                  <Input id="url" placeholder="https://..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">Banner Image</Label>
                  <Input id="image" type="file" accept="image/*" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="active">Active</Label>
                  <Switch id="active" defaultChecked />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-success hover:bg-success/90">Create Banner</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockBanners.map((banner) => (
            <Card key={banner.id} className="hover-lift card-shadow">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                    <p className="text-sm text-muted-foreground">Banner Preview</p>
                  </div>
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold">{banner.title}</h3>
                      <Badge variant={banner.isActive ? "default" : "secondary"}>
                        {banner.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <a
                      href={banner.redirectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline flex items-center gap-1"
                    >
                      {banner.redirectUrl}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                    <p className="text-xs text-muted-foreground mt-2">
                      Created: {banner.createdAt}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Pencil className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
