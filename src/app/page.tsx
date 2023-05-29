'use client'
import ThemeWatcher from '@/components/ThemeWatcher'
import DarkModeButton from '@/components/DarkModeButton'
import Resources from '@/components/Resources'
import Table from '@/components/Table'

const HomePage: React.FC = () => {
  return (
    <>
      <div className='flex justify-end w-full' id='navbar'>
        <ThemeWatcher />
        <DarkModeButton />
      </div>
      <main className='flex min-h-screen flex-col items-center justify-between p-8'>
        <Resources />
        <Table />
      </main>
    </>
  )
}

export default HomePage
