import Sidebar from './Sidebar.tsx'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex bg-dark min-h-screen text-white'>
      <Sidebar />

      <main className='flex-1 p-8 overflow-y-auto'>
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout