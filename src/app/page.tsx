import Navbar from '@/components/Navbar'
import Table from '@/components/Table'

const HomePage: React.FC = () => {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <Navbar />
      <Table />
    </main>
  )
}

export default HomePage
