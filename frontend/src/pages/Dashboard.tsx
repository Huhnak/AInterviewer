import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="max-w-5xl mx-auto p-8">

      <h1 className="text-3xl font-bold">
        Dashboard
      </h1>

      <Link
        to="/create"
        className="bg-black text-white px-4 py-2 mt-4 inline-block"
      >
        New Interview
      </Link>
    </div>
  );
}

export default Dashboard;