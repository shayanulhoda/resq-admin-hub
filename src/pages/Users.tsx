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
import { Eye, Search, UserX, UserCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const mockUsers = [
  {
    id: 1,
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    phone: "+61 412 345 678",
    status: "Active",
    joinedAt: "2024-01-15",
    totalOrders: 24,
  },
  {
    id: 2,
    name: "James Brown",
    email: "james.brown@example.com",
    phone: "+61 423 456 789",
    status: "Active",
    joinedAt: "2024-02-20",
    totalOrders: 18,
  },
  {
    id: 3,
    name: "Sophie Chen",
    email: "sophie.chen@example.com",
    phone: "+61 434 567 890",
    status: "Inactive",
    joinedAt: "2024-03-10",
    totalOrders: 5,
  },
];

export default function Users() {
  const [searchQuery, setSearchQuery] = useState("");

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        title="User Management"
        subtitle="View and manage registered users"
      />

      <main className="p-6 space-y-6">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or email..."
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
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockUsers.map((user) => (
                <TableRow key={user.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.totalOrders}</TableCell>
                  <TableCell>
                    <Badge variant={user.status === "Active" ? "default" : "secondary"}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.joinedAt}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>User Details</DialogTitle>
                            <DialogDescription>
                              View and manage user information
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="flex items-center gap-4">
                              <Avatar className="h-16 w-16">
                                <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                                  {getInitials(user.name)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-semibold text-lg">{user.name}</h3>
                                <p className="text-sm text-muted-foreground">{user.email}</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label className="text-sm text-muted-foreground">Phone</Label>
                                <p className="font-medium">{user.phone}</p>
                              </div>
                              <div>
                                <Label className="text-sm text-muted-foreground">Status</Label>
                                <Badge variant={user.status === "Active" ? "default" : "secondary"}>
                                  {user.status}
                                </Badge>
                              </div>
                              <div>
                                <Label className="text-sm text-muted-foreground">Total Orders</Label>
                                <p className="font-medium">{user.totalOrders}</p>
                              </div>
                              <div>
                                <Label className="text-sm text-muted-foreground">Joined</Label>
                                <p className="font-medium">{user.joinedAt}</p>
                              </div>
                            </div>
                            <div className="flex gap-2 pt-4">
                              {user.status === "Active" ? (
                                <Button variant="destructive" className="flex-1">
                                  <UserX className="mr-2 h-4 w-4" />
                                  Disable User
                                </Button>
                              ) : (
                                <Button className="flex-1 bg-success hover:bg-success/90">
                                  <UserCheck className="mr-2 h-4 w-4" />
                                  Enable User
                                </Button>
                              )}
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
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

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={className}>{children}</p>;
}
