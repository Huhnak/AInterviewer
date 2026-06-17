import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { navItems } from "../../navigation";
import ThemeToggle from "../../components/ThemeToggle";
import "./Navbar.css";
import { useEffect } from "react";
import { useThemeStore } from "../../store/themeStore";
import { LogOutIcon } from "lucide-react";
import { useAuthStore } from "../../store/userStore";

export default function Navbar() {
    const location = useLocation();
    const { isDarkMode } = useThemeStore();
    const { logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    useEffect(() => {
        document.addEventListener("mousemove", (e) => {
            document
                .getElementById("logo-text")!
                .style.setProperty("--mouseX", `${e.clientX}px`);
            document
                .getElementById("logo-text")!
                .style.setProperty("--mouseY", `${e.clientY}px`);
        });
    }, []);

    if (
        location.pathname === "/" ||
        location.pathname === "/login" ||
        location.pathname === "/register"
    ) {
        return null;
    }
    return (
        <header className="sticky top-0 z-50 border-b border-white/10 bg-black/10 backdrop-blur-xl">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                <NavLink to="/">
                    <div
                        id="logo-text"
                        className="from-text to-muted cursor-pointer bg-linear-to-r bg-clip-text text-3xl font-bold text-transparent select-none"
                    >
                        AInterviewer
                    </div>
                </NavLink>

                <nav className="flex gap-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-2 rounded-xl px-4 py-2 transition-all duration-200 ${
                                        isActive
                                            ? isDarkMode
                                                ? "bg-primary text-white"
                                                : "bg-background text-white"
                                            : "text-muted hover:bg-white/5 hover:text-white"
                                    } `
                                }
                            >
                                <Icon size={18} />
                                <span>{item.title}</span>
                            </NavLink>
                        );
                    })}

                    <div
                        className="text-muted flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2 transition-all duration-200 hover:bg-red-500/25"
                        onClick={handleLogout}
                    >
                        <LogOutIcon size={18} />
                        <span>Logout</span>
                    </div>
                    <ThemeToggle />
                </nav>
            </div>
        </header>
    );
}
