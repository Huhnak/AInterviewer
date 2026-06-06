import { BrowserRouter, Routes, Route } from 'react-router-dom'

import LoginPage from '../pages/LoginPage.tsx'
import DashboardPage from '../pages/DashboardPage.tsx'
import InterviewPage from '../pages/InterviewPage.tsx'
import ResultsPage from '../pages/ResultsPage.tsx'
import NotFoundPage from '../pages/NotFoundPage.tsx'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/interview' element={<InterviewPage />} />
        <Route path='/results' element={<ResultsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter