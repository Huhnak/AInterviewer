import DashboardLayout from "../components/layout/DashboardLayout"

const InterviewPage = () => {
  return (
    <DashboardLayout>
      <div className='flex gap-6'>
      <div className='flex-1 bg-card rounded-3xl p-8'>
        <div className='flex justify-between mb-6'>
          <h1 className='text-3xl font-bold'>Frontend Interview</h1>
          <span className='text-violet-400 font-semibold'>09:00 / 10:00</span>
        </div>

        <div className='w-full h-3 bg-white/10 rounded-full overflow-hidden mb-8'>
          <div className='w-1/3 h-full bg-gradient-to-r from-violet-500 to-fuchsia-500'></div>
        </div>

        <div className='bg-white/5 p-8 rounded-3xl border border-white/10'>
          <h2 className='text-xl font-semibold mb-6'>
            Что такое Virtual DOM?
          </h2>

          <textarea
            placeholder='Введите ваш ответ...'
            className='w-full h-60 bg-dark rounded-2xl p-5 resize-none outline-none border border-white/10'
          />

          <button className='mt-5 bg-gradient-to-r from-violet-500 to-fuchsia-500 px-8 py-3 rounded-2xl font-semibold'>
            Отправить
          </button>
        </div>
      </div>
    </div>
    </DashboardLayout>
  )
}

export default InterviewPage