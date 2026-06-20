import { useEffect, useState } from "react";
import { login } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/userStore";

function Login() {
    const navigate = useNavigate();
    const authStore = useAuthStore();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const logout = () => {
        authStore.logout();
    };
    const handleLogin = async () => {
        if (isLoading) return;
        try {
            setIsLoading(true);
            const data = await login(username, password);
            authStore.login(
                {
                    email: data.email,
                    id: data.email,
                    username: data.username,
                    roleName: data.roleName,
                },
                data.token,
            );
            navigate("/home");
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        logout();
    }, []);
    return (
        <div className="flex min-h-[85vh] items-center justify-center">
            <div className="bg-card/60 w-full max-w-md rounded-3xl border border-white/10 p-8 shadow-2xl backdrop-blur-xl">
                <h1 className="mb-2 text-4xl font-bold">AInterviewer</h1>

                <p className="text-muted mb-8">Войдите в систему</p>

                <input
                    className="bg-surface focus:border-primary mb-4 w-full rounded-2xl border border-white/10 p-4 transition outline-none"
                    placeholder="Имя пользователя"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="password"
                    className="bg-surface focus:border-primary mb-6 w-full rounded-2xl border border-white/10 p-4 transition outline-none"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleLogin}
                    disabled={isLoading}
                    className="from-primary to-secondary w-full rounded-2xl bg-linear-to-r p-4 font-semibold transition-all hover:scale-[1.02] disabled:cursor-default disabled:opacity-50"
                >
                    {isLoading ? "Вход..." : "Войти"}
                </button>
                <p
                    onClick={() => {
                        navigate("/register");
                    }}
                    className="text-muted w-full cursor-pointer p-4 text-center transition-all hover:scale-[1.02]"
                >
                    Нет аккаунта?
                </p>
            </div>
        </div>
    );
}

export default Login;
