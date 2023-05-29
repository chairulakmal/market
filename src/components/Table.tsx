'use client'
import { useState, useEffect } from 'react'
import api from '@/api'
import useSWR from 'swr'
import { currencyFormatter } from '@/utils'
import PercentageChange from '@/components/PercentageChange'
import CoinIcon from './CoinIcon'

const Table: React.FC = (): JSX.Element => {
  const [currencies, setCurrencies] = useState<CurrencyData[]>([])
  const [prices, setPrices] = useState<PriceData[]>([])
  const [error, setError] = useState<PageError>({ message: '', code: 0 })

  useEffect(() => {
    api
      .fetchCurrencies()
      .then((currenciesData: CurrencyData[]) => {
        // console.debug({ currenciesData })
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

  const {
    data: pricesData,
    error: priceError,
    isLoading,
  } = useSWR<PriceData[]>(api.endpoint, api.fetcher, { refreshInterval: 10000 })

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

  if (isLoading) {
    return <div>Loading...</div>
  }

  const priceMap = new Map<string, PriceData>()

  prices.forEach((price: PriceData) => {
    const baseCurrency: string = price.pair.split('/')[0].toUpperCase()
    priceMap.set(baseCurrency, price)
  })

  const filteredCurrencies = currencies
    .map((currency: CurrencyData) => {
      const matchingPrice: PriceData | undefined = priceMap.get(
        currency.currencyGroup
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
      return (
        currency.price.latestPrice &&
        (currency.price.month || currency.price.day)
      )
    })

  const handleRowClick = (baseCurrency: string) => {
    if (window) {
      window.open(
        `${api.baseURL}/en/market/${baseCurrency}`,
        '_blank',
        'noopener,noreferrer'
      )
    }
  }

  return (
    <>
      <small className='text-left hidden md:block lg:hidden mt-4'>
        Prices shown is in Indonesian Rupiah (IDR)
      </small>
      <div>
        <table className='table-auto w-full'>
          <thead>
            <tr>
              <th className='px-2 py-2 text-centre sm:whitespace-normal'>
                Token
              </th>
              <th className='pr-8 text-centre sm:whitespace-normal hidden lg:table-cell'>
                Pair
              </th>
              <th className='px-2 sm:px-8 text-centre sm:whitespace-normal'>
                Price
                <small className='text-left md:hidden mt-4'> (in IDR)</small>
              </th>
              <th className='px-8 text-centre hidden sm:table-cell'>24h</th>
              <th className='px-8 text-centre hidden md:table-cell'>1w</th>
              <th className='px-10 text-centre hidden lg:table-cell'>1m</th>
              <th className='px-10 text-centre hidden md:table-cell'>1y</th>
            </tr>
          </thead>
          <tbody>
            {filteredCurrencies.map((currency: CurrencyData) => (
              <tr
                key={currency.currencyGroup}
                className='hover:bg-gray-100 hover:dark:bg-gray-300 hover:dark:bg-opacity-30 cursor-pointer'
                onClick={() => handleRowClick(currency.currencyGroup)}>
                <td className='py-0 md:py-2'>
                  <CoinIcon
                    name={currency.name}
                    logo={currency.logo}
                    color={currency.color}
                  />
                </td>
                <td className='text-right hidden lg:table-cell'>
                  {currency.price.pair.toUpperCase()}
                </td>
                <td className='px-2 sm:px-4 text-right font-semibold font-mono'>
                  {currencyFormatter(currency.price.latestPrice)}
                </td>
                <td className='text-right hidden sm:table-cell font-mono'>
                  <PercentageChange percentage={currency.price.day} />
                </td>
                <td className='text-right hidden md:table-cell font-mono'>
                  <PercentageChange percentage={currency.price.week} />
                </td>
                <td className='text-right hidden lg:table-cell font-mono'>
                  <PercentageChange percentage={currency.price.month} />
                </td>
                <td className='text-right hidden md:table-cell font-mono'>
                  <PercentageChange percentage={currency.price.year} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Table
