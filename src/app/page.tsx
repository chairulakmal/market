'use client'
import Navbar from '@/components/Navbar'
import Table from '@/components/Table'
import DarkModeToggle from '@/components/DarkModeButton'
import ThemeWatcher from '@/components/ThemeWatcher'

const HomePage: React.FC = () => {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <ThemeWatcher />
      <DarkModeToggle />
      <Navbar />
      <Table />
    </main>
  )
}

export default HomePage
