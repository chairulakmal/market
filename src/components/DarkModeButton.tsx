'use client'
import { useState, useEffect } from 'react'

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark')
    } else {
      const prefersDarkMode = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches
      setIsDarkMode(prefersDarkMode)
    }
  }, [])

  const handleToggle = () => {
    const newMode = isDarkMode ? 'light' : 'dark'
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.add('transition')
    document.documentElement.setAttribute('data-theme', newMode)
    localStorage.setItem('theme', newMode)
  }

  return (
    <div className='p-2'>
      <button
        className='bg-gray-200 dark:bg-gray-800 rounded-full p-2 w-10 h-10 flex items-center justify-center'
        onClick={handleToggle}>
        {isDarkMode ? (
          <svg
            className='w-6 h-6 text-gray-600 dark:text-gray-400'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'>
            <circle cx='12' cy='12' r='5' />
            <line x1='12' y1='1' x2='12' y2='3' />
            <line x1='12' y1='21' x2='12' y2='23' />
            <line x1='4.22' y1='4.22' x2='5.64' y2='5.64' />
            <line x1='18.36' y1='18.36' x2='19.78' y2='19.78' />
            <line x1='1' y1='12' x2='3' y2='12' />
            <line x1='21' y1='12' x2='23' y2='12' />
            <line x1='4.22' y1='19.78' x2='5.64' y2='18.36' />
            <line x1='18.36' y1='5.64' x2='19.78' y2='4.22' />
          </svg>
        ) : (
          <svg
            className='w-6 h-6 text-gray-800 dark:text-white'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'>
            <path d='M12 2a9 9 0 000 20a9 9 0 000-20z' />
          </svg>
        )}
      </button>
    </div>
  )
}

export default DarkModeToggle
