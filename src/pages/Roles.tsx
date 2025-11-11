import { useState } from "react";
import { Header } from "@/components/admin/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const mockRoles = [
  {
    id: 1,
    name: "Super Admin",
    permissions: ["All"],
    members: 2,
    createdBy: "System",
    lastUpdated: "2024-01-15",
  },
  {
    id: 2,
    name: "Manager",
    permissions: ["View", "Edit", "Approve"],
    members: 5,
    createdBy: "Admin",
    lastUpdated: "2024-02-20",
  },
  {
    id: 3,
    name: "Support Staff",
    permissions: ["View", "Comment"],
    members: 8,
    createdBy: "Admin",
    lastUpdated: "2024-03-10",
  },
];

const allPermissions = [
  { id: "dashboard", label: "Dashboard" },
  { id: "restaurants", label: "Restaurants" },
  { id: "users", label: "Users" },
  { id: "orders", label: "Orders" },
  { id: "banners", label: "Banners" },
  { id: "notifications", label: "Notifications" },
  { id: "team", label: "Team Management" },
  { id: "config", label: "Configuration" },
];

export default function Roles() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header
        title="Role Management"
        subtitle="Define permissions and manage team roles"
      />

      <main className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Total Roles: {mockRoles.length}
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="mr-2 h-4 w-4" />
                Create New Role
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Role</DialogTitle>
                <DialogDescription>
                  Define role name and assign permissions
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="roleName">Role Name</Label>
                  <Input id="roleName" placeholder="e.g., Content Manager" />
                </div>
                <div className="space-y-3">
                  <Label>Module Permissions</Label>
                  <div className="grid grid-cols-2 gap-4">
                    {allPermissions.map((permission) => (
                      <div key={permission.id} className="flex items-center space-x-2">
                        <Checkbox id={permission.id} />
                        <label
                          htmlFor={permission.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {permission.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-success hover:bg-success/90">Create Role</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="bg-card rounded-lg border card-shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role Name</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead>Members</TableHead>
                <TableHead>Created By</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockRoles.map((role) => (
                <TableRow key={role.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{role.name}</TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap">
                      {role.permissions.map((perm, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 bg-primary/10 text-primary rounded"
                        >
                          {perm}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{role.members}</TableCell>
                  <TableCell>{role.createdBy}</TableCell>
                  <TableCell>{role.lastUpdated}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
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
