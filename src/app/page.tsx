'use client'
import Navbar from '@/components/Navbar'
import Table from '@/components/Table'
import DarkModeButton from '@/components/DarkModeButton'
import ThemeWatcher from '@/components/ThemeWatcher'

const HomePage: React.FC = () => {
  return (
    <>
      <div className='flex justify-end w-full'>
        <ThemeWatcher />
        <DarkModeButton />
      </div>
      <main className='flex min-h-screen flex-col items-center justify-between p-24'>
        <Navbar />
        <Table />
      </main>
    </>
  )
}

export default HomePage
