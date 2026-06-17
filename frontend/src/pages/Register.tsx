import { useState } from "react";
import { register } from "../api/authApi";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async () => {
        if (isLoading) return;
        try {
            setIsLoading(true);
            await register(username, email, password);
            navigate("/login");
        } catch (e) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-[85vh] items-center justify-center">
            <div className="bg-card/60 w-full max-w-md rounded-3xl border border-white/10 p-8 shadow-2xl backdrop-blur-xl">
                <h1 className="mb-2 text-4xl font-bold">AInterviewer</h1>

                <p className="text-muted mb-8">Зарегистрируйтесь</p>

                <input
                    className="bg-surface focus:border-primary mb-4 w-full rounded-2xl border border-white/10 p-4 transition outline-none"
                    placeholder="Почта"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
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
                    onClick={handleRegister}
                    disabled={isLoading}
                    className="from-primary to-secondary w-full rounded-2xl bg-linear-to-r p-4 font-semibold transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {isLoading ? "Регистрация..." : "Зарегистрироваться"}
                </button>
            </div>
        </div>
    );
}
