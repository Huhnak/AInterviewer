import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import CreateInterview from "./pages/CreateInterview.tsx";
import Interview from "./pages/Interview.tsx";
import Result from "./pages/Result.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/create" element={<CreateInterview />} />
      <Route path="/interview/:id" element={<Interview />} />
      <Route path="/result/:id" element={<Result />} />
    </Routes>
  );
}

export default App;