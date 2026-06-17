import {
  LayoutDashboard,
  PlusCircle,
  History,
  User,
} from "lucide-react";

export const navItems = [
  {
    title: "Home",
    path: "/home",
    icon: LayoutDashboard,
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
];