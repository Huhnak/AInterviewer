export default function NotFoundPage() {
  const handleGoBack = () => {
    window.history.back();
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-dark text-white">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl">Page Not Found</p>
        <button onClick={handleGoBack} className="cursor-pointer mt-6 bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 py-3 rounded-2xl font-semibold hover:scale-[1.02] transition-all">
            Go Back
        </button>
    </div>
  );
}