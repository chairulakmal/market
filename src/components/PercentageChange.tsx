import React from 'react'
import { percentageFormatter } from '@/utils'

const PercentageChange: React.FC<{
  percentage: number
}> = ({ percentage }) => {
  const formattedNumber = percentageFormatter(percentage)

  const textStyle =
    percentage > 0 ? 'text-green-500' : percentage < 0 ? 'text-red-500' : 'text'

  const arrowIcon =
    percentage > 0 ? (
      <div className='flex items-start'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 25 25'
          fill='currentColor'
          stroke='currentColor'
          strokeWidth={1}
          className='w-5 h-5'>
          <path
            fillRule='evenodd'
            d='M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z'
            clipRule='evenodd'
          />
        </svg>
      </div>
    ) : percentage < 0 ? (
      <div className='flex items-end'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 25 25'
          fill='currentColor'
          stroke='currentColor'
          strokeWidth={1}
          className='w-5 h-5'>
          <path
            fillRule='evenodd'
            d='M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z'
            clipRule='evenodd'
          />
        </svg>
      </div>
    ) : null

  return (
    <div className={`flex justify-end ${textStyle}`} id='percentage'>
      {arrowIcon}
      <div className='font-semibold'>
        {formattedNumber}
        {percentage ? '%' : ''}
      </div>
    </div>
  )
}

export default PercentageChange
