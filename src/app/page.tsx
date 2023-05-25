import Navbar from '@/components/Navbar';
import Price from '@/components/Price';

const HomePage: React.FC = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Navbar />
      <Price />
    </main>
  )
}

export default HomePage;
