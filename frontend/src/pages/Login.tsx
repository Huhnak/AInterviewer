import { useState } from "react";
import { login } from "../api/authApi";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const data = await login(email, password);

    localStorage.setItem("token", data);

    navigate("/dashboard");
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-96 p-6 border rounded-lg">
        <h1 className="text-2xl mb-4">AI Interviewer</h1>

        <input
          className="border p-2 w-full mb-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border p-2 w-full mb-4"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-black text-white w-full p-2"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;