import { Mail, User, Trophy, FileText } from "lucide-react";

import { useAuthStore } from "../store/userStore";
import { useThemeStore } from "../store/themeStore";

export default function Profile() {
    const { user } = useAuthStore();
    const { isDarkMode } = useThemeStore();

    return (
        <div className="mx-auto max-w-6xl py-8">
            <div className="bg-card/60 rounded-3xl border border-white/10 p-8 shadow-2xl backdrop-blur-xl">
                <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
                    <div
                        className={`${isDarkMode ? "bg-primary" : "bg-background"} flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-r text-5xl font-bold`}
                    >
                        {user?.username?.charAt(0).toUpperCase()}
                    </div>

                    <div className="flex-1">
                        <h1 className="mb-2 text-4xl font-bold">
                            {user?.username}
                        </h1>

                        <div className="text-muted space-y-3">
                            <div className="flex items-center gap-3">
                                <Mail size={18} />
                                {user?.email}
                            </div>

                            <div className="flex items-center gap-3">
                                <User size={18} />
                                {user?.roleName}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-10 grid gap-6 md:grid-cols-3">
                    <div className="bg-surface rounded-2xl border border-white/10 p-6">
                        <div className="mb-3 flex items-center gap-3">
                            <FileText className="text-primary" />
                            <span className="text-muted">Интервью</span>
                        </div>

                        <h2 className="text-4xl font-bold">-</h2>
                    </div>

                    <div className="bg-surface rounded-2xl border border-white/10 p-6">
                        <div className="mb-3 flex items-center gap-3">
                            <Trophy className="text-success" />
                            <span className="text-muted">Средний балл</span>
                        </div>

                        <h2 className="text-4xl font-bold">-</h2>
                    </div>

                    <div className="bg-surface rounded-2xl border border-white/10 p-6">
                        <div className="mb-3 flex items-center gap-3">
                            <User className="text-secondary" />
                            <span className="text-muted">Уровень</span>
                        </div>

                        <h2 className="text-4xl font-bold">-</h2>
                    </div>
                </div>

                <div className="bg-primary/10 border-primary/20 mt-8 rounded-2xl border p-6">
                    <h3 className="text-primary mb-2 font-semibold">О вас</h3>

                    <p className="text-muted">-</p>
                </div>
            </div>
        </div>
    );
}
