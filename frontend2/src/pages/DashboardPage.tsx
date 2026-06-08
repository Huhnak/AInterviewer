import DashboardLayout from '../components/layout/DashboardLayout.tsx'

const DashboardPage = () => {
  return (
    <DashboardLayout>
      <div className='grid grid-cols-3 gap-6'>
        <div className='bg-card p-8 rounded-3xl'>
          <h2 className='text-2xl font-bold'>Интервью</h2>
          <p className='text-gray-400 mt-2'>Начните новое интервью</p>
        </div>

        <div className='bg-card p-8 rounded-3xl'>
          <h2 className='text-2xl font-bold'>Результаты</h2>
          <p className='text-gray-400 mt-2'>Просмотр аналитики</p>
        </div>

        <div className='bg-card p-8 rounded-3xl'>
          <h2 className='text-2xl font-bold'>Статистика</h2>
          <p className='text-gray-400 mt-2'>AI анализ навыков</p>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default DashboardPage