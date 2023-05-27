const Navbar = () => {
  return (
    <div className='mb-32 grid text-center lg:mb-0 lg:grid-cols-2 lg:text-left'>
      <a
        href='https://github.com/chairulakmal/market'
        className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
        target='_blank'
        rel='noopener noreferrer'>
        <h2 className={`mb-3 text-2xl font-semibold`}>
          Docs{' '}
          <span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
            -&gt;
          </span>
        </h2>
        <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
          Find the source code of this app
        </p>
      </a>

      <a
        href='https://pintu.co.id/academy'
        className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30'
        target='_blank'
        rel='noopener noreferrer'>
        <h2 className={`mb-3 text-2xl font-semibold`}>
          Learn{' '}
          <span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
            -&gt;
          </span>
        </h2>
        <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
          Learn more about cryptocurrencies
        </p>
      </a>
    </div>
  )
}

export default Navbar
