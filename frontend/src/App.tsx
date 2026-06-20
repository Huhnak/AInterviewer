import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login.tsx";
import Home from "./pages/Home.tsx";
import CreateInterview from "./pages/CreateInterview.tsx";
import Interview from "./pages/Interview/Interview.tsx";
import Result from "./pages/Result.tsx";
import BaseLayout from "./pages/BaseLayout.tsx";
import Navbar from "./pages/Navbar/Navbar.tsx";
import Register from "./pages/Register.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import History from "./pages/History.tsx";
import { useThemeStore } from "./store/themeStore.ts";
import { useEffect } from "react";
import Profile from "./pages/Profile.tsx";
import AdminPanel from "./pages/AdminPanel.tsx";

function App() {
    const isDarkMode = useThemeStore((state) => state.isDarkMode);
    useEffect(() => {
        document.documentElement.classList.toggle("dark", isDarkMode);
    }, [isDarkMode]);
    return (
        <div className="bg-background text-text min-h-screen">
            <Navbar />
            <BaseLayout>
                <Routes>
                    <Route element={<ProtectedRoute />}>
                        <Route
                            index
                            element={<Navigate to="/home" replace />}
                        />
                        <Route path="/home" element={<Home />} />
                        <Route path="/create" element={<CreateInterview />} />
                        <Route path="/interview/:id" element={<Interview />} />
                        <Route path="/result/:id" element={<Result />} />
                        <Route path="/history" element={<History />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/admin-panel" element={<AdminPanel />} />
                    </Route>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </BaseLayout>
        </div>
    );
}
export default App;
