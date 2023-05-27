'use client'
import useSWR from 'swr'
import api from '@/api'
import { useState, useEffect } from 'react'

const Table: React.FC = (): JSX.Element => {
  const [currencies, setCurrencies] = useState<CurrencyData[]>([])
  const [prices, setPrices] = useState<PriceData[]>([])
  const [error, setError] = useState<PageError>({ message: '', code: 0 })

  useEffect(() => {
    api
      .fetchCurrencies()
      .then((currenciesData: CurrencyData[]) => {
        console.debug({ currenciesData })
        setCurrencies(currenciesData)
      })
      .catch((currenciesError) => {
        setError({
          message: currenciesError,
          code: 1,
        })
        console.debug(error)
      })
  }, [])

  const { data: pricesData, error: priceError } = useSWR<PriceData[]>(
    api.endpoint,
    api.fetcher,
    { refreshInterval: 1000 }
  )

  useEffect(() => {
    if (priceError) {
      console.debug({ priceError })
      setError({
        message: priceError,
        code: 2,
      })
    }

    if (pricesData) {
      setPrices(pricesData)
    }
  }, [pricesData, priceError])

  if (priceError) {
    setError({
      message: priceError,
      code: 2,
    })
  }

  if (error?.message) {
    return <div>Error...</div>
  }

  const priceMap = new Map<string, PriceData>()

  prices.forEach((price: PriceData) => {
    priceMap.set(price.pair.split('/')[0], price)
  })

  const filteredCurrencies = currencies
    .map((currency: CurrencyData) => {
      const matchingPrice = priceMap.get(currency.currencyGroup.toLowerCase())
      return {
        ...currency,
        price: matchingPrice || {
          pair: '',
          latestPrice: 0,
          day: 0,
          week: 0,
          month: 0,
          year: 0,
        },
      }
    })
    .filter((currency: CurrencyData) => {
      return currency.price.pair && currency.price.month && currency.price.day
    })

  return (
    <>
      <div className='overflow-x-auto'>
        <table className='min-w-full'>
          <thead>
            <tr>
              <th className='py-2 text-left sm:whitespace-normal'>Name</th>
              <th className='py-2 text-left sm:whitespace-normal hidden lg:table-cell'>
                Pair
              </th>
              <th className='py-2 text-left sm:whitespace-normal'>
                Latest Price
              </th>
              <th className='px-4 text-centre hidden sm:table-cell'>24h</th>
              <th className='px-4 text-centre hidden md:table-cell'>1w</th>
              <th className='px-4 text-centre hidden lg:table-cell'>1m</th>
              <th className='px-4 text-centre hidden md:table-cell'>1y</th>
            </tr>
          </thead>
          <tbody>
            {filteredCurrencies.map((currency: CurrencyData) => (
              <tr key={currency.currencyGroup}>
                <td className='py-2'>{currency.name}</td>
                <td className='py-2 hidden lg:table-cell'>
                  {currency.price.pair}
                </td>
                <td className='py-2'>
                  {currency.price.latestPrice.toFixed(2)}
                </td>
                <td className='px-4 text-right hidden sm:table-cell'>
                  {currency.price.day.toFixed(2)}
                </td>
                <td className='px-4 text-right hidden md:table-cell'>
                  {currency.price.week.toFixed(2)}
                </td>
                <td className='px-4 text-right hidden lg:table-cell'>
                  {currency.price.month.toFixed(2)}
                </td>
                <td className='px-4 text-right hidden md:table-cell'>
                  {currency.price.year.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <small className='text-left block mt-4'>
        Price shown is in Indonesian Rupiah (IDR)
      </small>
    </>
  )
}

export default Table
