import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/userStore";

export default function ProtectedRoute() {
    const authStore = useAuthStore();

    return authStore.isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to="/login" replace />
    );
}
