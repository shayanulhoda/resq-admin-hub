import { useState } from "react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Image,
  UtensilsCrossed,
  Users,
  Package,
  Bell,
  Shield,
  UserCog,
  Settings,
  ChevronLeft,
  ChevronRight,
  FolderTree,
  Wallet,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import resqboxLogo from "@/assets/resqbox-logo.svg";

const menuItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Banners", url: "/banners", icon: Image },
  { title: "Categories", url: "/categories", icon: FolderTree },
  { title: "Restaurants", url: "/restaurants", icon: UtensilsCrossed },
  { title: "Users", url: "/users", icon: Users },
  { title: "Orders", url: "/orders", icon: Package },
  { title: "Notifications", url: "/notifications", icon: Bell },
  { title: "Roles", url: "/roles", icon: Shield },
  { title: "Team", url: "/team", icon: UserCog },
  { title: "Config", url: "/config", icon: Settings },
  { title: "Payouts", url: "/payouts", icon: Wallet },
];

export function AdminSidebar() {
  const { open, setOpen } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const collapsed = !open;

  return (
    <Sidebar
      className={`${
        collapsed ? "w-20" : "w-64"
      } transition-all duration-300 border-r border-sidebar-border bg-sidebar`}
      collapsible="icon"
    >
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!collapsed && (
          <img src={resqboxLogo} alt="ResQBox" className="h-10 w-auto" />
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpen(!open)}
          className="ml-auto hover:bg-sidebar-accent"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Main Menu
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className="flex items-center gap-3 px-3 py-2 rounded-lg transition-smooth hover:bg-sidebar-accent"
                      activeClassName="bg-gradient-to-r from-primary/10 to-secondary/10 text-primary font-medium border-l-4 border-primary"
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {!collapsed && (
        <div className="p-4 border-t border-sidebar-border">
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-4">
            <p className="text-xs font-medium text-sidebar-foreground">
              💚 Making every meal count
            </p>
          </div>
        </div>
      )}
    </Sidebar>
  );
}
