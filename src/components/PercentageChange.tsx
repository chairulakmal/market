import { percentageFormatter } from '@/utils'
import React from 'react'

const NumberFormat: React.FC<{
  number: number
}> = ({ number }) => {
  const formattedNumber = percentageFormatter(number)

  const numberStyle =
    number > 0 ? 'text-green-500' : number < 0 ? 'text-red-500' : 'text'

  const arrowIcon =
    number > 0 ? (
      <div className='flex items-start'>
        <svg
          className='w-4 h-4 ml-1'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'>
          <path d='M12 5v14m5-7l-5-5-5 5' />
        </svg>
      </div>
    ) : number < 0 ? (
      <div className='flex items-end'>
        <svg
          className='w-4 h-4 ml-1'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'>
          <path d='M12 19V5m5 7l-5 5-5-5' />
        </svg>
      </div>
    ) : null

  return (
    <div className={`flex justify-end font-medium ${numberStyle}`}>
      {arrowIcon}
      <div>{formattedNumber}</div>
    </div>
  )
}

export default NumberFormat
