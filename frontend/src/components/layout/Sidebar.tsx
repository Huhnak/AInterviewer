import {
  LayoutDashboard,
  BrainCircuit,
  History,
  BarChart3,
  User,
  Settings,
} from 'lucide-react'
import AppRouter from '../../routes/AppRouter'
import { useNavigate } from 'react-router-dom';
  

const Sidebar = () => {
  return (
    <aside className='w-72 h-screen bg-card border-r border-white/10 p-6 flex flex-col'>
      <h1 className='text-3xl font-bold mb-10 bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent'>
        AInterviewer
      </h1>

      <nav className='flex flex-col gap-3'>
        <SidebarItem icon={<LayoutDashboard />} title='Главная' link='/dashboard' />
        <SidebarItem icon={<BrainCircuit />} title='Интервью' link='/interview' />
        <SidebarItem icon={<History />} title='История' link='/history' />
        <SidebarItem icon={<BarChart3 />} title='Статистика' link='/statistics' />
        <SidebarItem icon={<User />} title='Профиль' link='/profile' />
        <SidebarItem icon={<Settings />} title='Настройки' link='/settings' />
      </nav>
    </aside>
  )
}
const handleSidebarItemClick = (title: string) => {
  

}
const SidebarItem = ({ icon, title,link }: { icon: React.ReactNode; title: string, link: string }) => {
  const navigate = useNavigate();
  return (
    <button 
      className='flex items-center gap-4 p-4 rounded-2xl hover:bg-white/10 transition-all duration-300 cursor-pointer'
      onClick={() => navigate(link)}
    >
      {icon}
      <span>{title}</span>
    </button>
  )
}

export default Sidebar