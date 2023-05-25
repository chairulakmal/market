import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Price from '@/components/Price';
// const Price = dynamic(() => import('@/components/Price'), { ssr: false });

const HomePage: React.FC = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Navbar />
      <Price />
    </main>
  )
}

export default HomePage;
