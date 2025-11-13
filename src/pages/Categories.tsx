import { useState } from "react";
import { Header } from "@/components/admin/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Category {
  id: string;
  name: string;
  icon: string;
  type: "restaurant" | "food";
  status: "active" | "inactive";
}

const mockCategories: Category[] = [
  { id: "1", name: "Veg", icon: "🌱", type: "restaurant", status: "active" },
  { id: "2", name: "Non-Veg", icon: "🍖", type: "restaurant", status: "active" },
  { id: "3", name: "Vegan", icon: "🥗", type: "restaurant", status: "active" },
  { id: "4", name: "Halal", icon: "☪️", type: "restaurant", status: "active" },
  { id: "5", name: "Spicy", icon: "🌶️", type: "food", status: "active" },
  { id: "6", name: "Sweet", icon: "🍰", type: "food", status: "active" },
  { id: "7", name: "Gluten-Free", icon: "🌾", type: "food", status: "active" },
];

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [categoryName, setCategoryName] = useState("");
  const [categoryIcon, setCategoryIcon] = useState("");
  const [activeTab, setActiveTab] = useState<"restaurant" | "food">("restaurant");
  const { toast } = useToast();

  const handleAdd = () => {
    if (!categoryName.trim()) {
      toast({ title: "Please enter a category name", variant: "destructive" });
      return;
    }

    const newCategory: Category = {
      id: Date.now().toString(),
      name: categoryName,
      icon: categoryIcon || "📁",
      type: activeTab,
      status: "active",
    };

    setCategories([...categories, newCategory]);
    toast({ title: "Category added successfully! 🎉" });
    resetForm();
  };

  const handleEdit = () => {
    if (!editCategory || !categoryName.trim()) return;

    setCategories(categories.map((cat) =>
      cat.id === editCategory.id ? { ...cat, name: categoryName, icon: categoryIcon || cat.icon } : cat
    ));
    toast({ title: "Category updated successfully! ✨" });
    resetForm();
  };

  const handleDelete = (id: string) => {
    setCategories(categories.filter((cat) => cat.id !== id));
    toast({ title: "Category deleted", description: "The category has been removed." });
  };

  const toggleStatus = (id: string) => {
    setCategories(categories.map((cat) =>
      cat.id === id ? { ...cat, status: cat.status === "active" ? "inactive" : "active" } : cat
    ));
  };

  const resetForm = () => {
    setCategoryName("");
    setCategoryIcon("");
    setEditCategory(null);
    setIsAddOpen(false);
  };

  const openEditDialog = (category: Category) => {
    setEditCategory(category);
    setCategoryName(category.name);
    setCategoryIcon(category.icon);
    setIsAddOpen(true);
  };

  const filteredCategories = categories.filter((cat) => cat.type === activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Header
        title="Categories"
        subtitle="Organize your restaurant and food categories"
      />

      <div className="container mx-auto p-6 space-y-6">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "restaurant" | "food")} className="w-full">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="restaurant">Restaurant Categories</TabsTrigger>
              <TabsTrigger value="food">Food Categories</TabsTrigger>
            </TabsList>

            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => { setEditCategory(null); setCategoryName(""); setCategoryIcon(""); }}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Category
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editCategory ? "Edit Category" : "Add New Category"}</DialogTitle>
                  <DialogDescription>
                    {editCategory ? "Update the category details below." : "Create a new category for your platform."}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="categoryName">Category Name</Label>
                    <Input
                      id="categoryName"
                      placeholder="e.g., Veg, Spicy, Gluten-Free"
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="categoryIcon">Icon (emoji or URL)</Label>
                    <div className="flex gap-2">
                      <Input
                        id="categoryIcon"
                        placeholder="🌱 or upload icon"
                        value={categoryIcon}
                        onChange={(e) => setCategoryIcon(e.target.value)}
                      />
                      <Button variant="outline" size="icon">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={resetForm}>Cancel</Button>
                  <Button onClick={editCategory ? handleEdit : handleAdd}>
                    {editCategory ? "Update" : "Add"} Category
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <TabsContent value="restaurant" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Restaurant Categories</CardTitle>
                <CardDescription>Manage categories for restaurant types</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category Name</TableHead>
                      <TableHead>Icon</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCategories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell className="font-medium">{category.name}</TableCell>
                        <TableCell className="text-2xl">{category.icon}</TableCell>
                        <TableCell className="capitalize">{category.type}</TableCell>
                        <TableCell>
                          <Badge
                            variant={category.status === "active" ? "default" : "secondary"}
                            className={category.status === "active" ? "bg-[#00d341] hover:bg-[#00d341]/90" : ""}
                            onClick={() => toggleStatus(category.id)}
                            style={{ cursor: "pointer" }}
                          >
                            {category.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEditDialog(category)}
                            className="text-[#f47923] border-[#f47923] hover:bg-[#f47923]/10"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(category.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="food" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Food Categories</CardTitle>
                <CardDescription>Manage categories for food types and dietary preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category Name</TableHead>
                      <TableHead>Icon</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCategories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell className="font-medium">{category.name}</TableCell>
                        <TableCell className="text-2xl">{category.icon}</TableCell>
                        <TableCell className="capitalize">{category.type}</TableCell>
                        <TableCell>
                          <Badge
                            variant={category.status === "active" ? "default" : "secondary"}
                            className={category.status === "active" ? "bg-[#00d341] hover:bg-[#00d341]/90" : ""}
                            onClick={() => toggleStatus(category.id)}
                            style={{ cursor: "pointer" }}
                          >
                            {category.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEditDialog(category)}
                            className="text-[#f47923] border-[#f47923] hover:bg-[#f47923]/10"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(category.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
