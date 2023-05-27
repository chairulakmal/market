'use client'
import { useState, useEffect } from 'react'
import api from '@/api'
import useSWR from 'swr'
import formatCurrency from '@/utils/formatCurrency'

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
        console.debug({ currenciesError })
        setError({
          message: currenciesError,
          code: 1,
        })
      })
  }, [])

  const { data: pricesData, error: priceError } = useSWR<PriceData[]>(
    api.endpoint,
    api.fetcher,
    { refreshInterval: 10000 }
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

  if (error?.message) {
    return <div>Error...</div>
  }

  const priceMap = new Map<string, PriceData>()

  prices.forEach((price: PriceData) => {
    const baseCurrency: string = price.pair.split('/')[0]
    priceMap.set(baseCurrency, price)
  })

  const filteredCurrencies = currencies
    .map((currency: CurrencyData) => {
      const matchingPrice: PriceData | undefined = priceMap.get(
        currency.currencyGroup.toLowerCase()
      )
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
              <th className='px-2 py-2 text-centre sm:whitespace-normal'>
                Token
              </th>
              <th className='pr-8 text-centre sm:whitespace-normal hidden lg:table-cell'>
                Pair
              </th>
              <th className='px-8 text-centre sm:whitespace-normal'>Price</th>
              <th className='px-8 text-centre hidden sm:table-cell'>24h</th>
              <th className='px-8 text-centre hidden md:table-cell'>1w</th>
              <th className='px-8 text-centre hidden lg:table-cell'>1m</th>
              <th className='px-8 text-centre hidden md:table-cell'>1y</th>
            </tr>
          </thead>
          <tbody>
            {filteredCurrencies.map((currency: CurrencyData) => (
              <tr key={currency.currencyGroup}>
                <td className='py-0 md:py-2'>{currency.name}</td>
                <td className='text-right hidden lg:table-cell'>
                  {currency.price.pair}
                </td>
                <td className='text-right font-mono'>
                  {formatCurrency(currency.price.latestPrice)}
                </td>
                <td className='text-right hidden sm:table-cell font-mono'>
                  {currency.price.day.toFixed(2)}
                </td>
                <td className='text-right hidden md:table-cell font-mono'>
                  {currency.price.week.toFixed(2)}
                </td>
                <td className='text-right hidden lg:table-cell font-mono'>
                  {currency.price.month.toFixed(2)}
                </td>
                <td className='text-right hidden md:table-cell font-mono'>
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
