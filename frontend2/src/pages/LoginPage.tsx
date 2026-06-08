import { motion } from 'framer-motion'

const LoginPage = () => {
  return (
    <div className='min-h-screen grid grid-cols-2 bg-dark'>
      <div className='flex items-center justify-center'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className='bg-white/10 backdrop-blur-xl p-10 rounded-3xl w-[420px] border border-white/10 shadow-glass'
        >
          <h1 className='text-4xl font-bold mb-8'>Вход</h1>

          <div className='space-y-5'>
            <input
              type='text'
              placeholder='Логин'
              className='w-full p-4 rounded-2xl bg-white/5 border border-white/10 outline-none'
            />

            <input
              type='password'
              placeholder='Пароль'
              className='w-full p-4 rounded-2xl bg-white/5 border border-white/10 outline-none'
            />

            <button className='w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 p-4 rounded-2xl font-semibold hover:scale-[1.02] transition-all'>
              Войти
            </button>
          </div>
        </motion.div>
      </div>

      <div className='relative overflow-hidden flex items-center justify-center'>
        <div className='absolute w-[500px] h-[500px] bg-violet-600 rounded-full blur-[120px] opacity-30'></div>

        <h1 className='text-8xl font-black rotate-[-20deg] text-white/10 select-none'>
          AInterviewer
        </h1>
      </div>
    </div>
  )
}

export default LoginPage