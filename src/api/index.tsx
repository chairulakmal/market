const endpoint: string = '/api/trade/price-changes/'

const fetcher: () => Promise<PriceData[]> = async () => {
  console.debug('Fetching prices...')
  try {
    const response = await fetch(endpoint)

    if (response.ok) {
      const data = await response.json()
      const prices = data.payload.map((item: any) => ({
        pair: item.pair,
        latestPrice: +item.latestPrice,
        day: +item.day,
        week: +item.week,
        month: +item.month,
        year: +item.year,
      }))
      console.debug({ prices })
      return prices
    } else {
      throw new Error('Request failed with status ' + response.status)
    }
  } catch (error) {
    console.error('Error fetching price data:', error)
    throw error
  }
}

const endpointCurrency: string = '/api/wallet/supportedCurrencies'

const fetchCurrencies: () => Promise<CurrencyData[]> = async () => {
  console.debug('Fetching currencies...')
  try {
    const response = await fetch(endpointCurrency)

    if (response.ok) {
      const data = await response.json()
      const currencies = data.payload.map((item: any) => ({
        currencyGroup: item.currencyGroup,
        color: item.color,
        currencySymbol: item.currencySymbol,
        name: item.name,
        logo: item.logo,
        decimal_point: item.decimal_point,
        listingDate: item.listingDate,
      }))
      console.debug({ currencies })
      return currencies
    } else {
      throw new Error('Request failed with status ' + response.status)
    }
  } catch (error) {
    console.error('Error fetching currency data:', error)
    throw error
  }
}

export default {
  fetchCurrencies,
  fetcher,
  endpoint,
}
