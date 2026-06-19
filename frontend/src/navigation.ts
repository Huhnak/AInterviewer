import {
  Home,
  PlusCircle,
  History,
  User,
  LayoutDashboard
} from "lucide-react";

export const navItems = [
  {
    title: "Home",
    path: "/home",
    icon: Home,
  },
  {
    title: "New Interview",
    path: "/create",
    icon: PlusCircle,
  },
  {
    title: "History",
    path: "/history",
    icon: History,
  },
  {
    title: "Profile",
    path: "/profile",
    icon: User,
  },
  {
    title: "AdminPanel",
    path: "/admin-panel",
    icon: LayoutDashboard,
  },
];