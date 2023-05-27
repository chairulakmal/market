import { useEffect } from 'react'

const ThemeWatcher = () => {
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme)
    } else {
      const prefersDarkMode = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches
      document.documentElement.setAttribute(
        'data-theme',
        prefersDarkMode ? 'dark' : 'light'
      )
    }
  }, [])

  return null
}

export default ThemeWatcher
