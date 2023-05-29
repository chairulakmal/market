import Image from 'next/image'

type IconProps = {
  logo: string
  name: string
  color: string
}

const CoinIcon: React.FC<IconProps> = ({ logo, name, color }) => {
  return (
    <div className='flex justify-between items-center'>
      <span>{name}</span>
      <div style={{ width: '25px', height: '25px', position: 'relative' }}>
        <div
          className='w-5 h-5'
          style={{
            backgroundImage: `url(${logo})`,
            backgroundSize: 'cover',
            filter: 'brightness(1) sepia(50%) saturate(200%)',
            width: '25px',
            height: '25px',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1,
          }}
        />
        <svg viewBox='0 0 20 20'>
          <circle cx='10' cy='10' r='10' style={{ fill: color, zIndex: -1 }} />
        </svg>
      </div>
    </div>
  )
}

export default CoinIcon
