declare type PriceData = {
  pair: string
  latestPrice: number
  day: number
  week: number
  month: number
  year: number
}

declare type CurrencyData = {
  currencyGroup: string
  name: string
  currencySymbol: string
  logo: number
  color: string
  decimal_point: number
  listingDate: Date
  price: PriceData
}

declare interface TableProps {
  currencies: CurrencyData[]
}

interface PageError {
  message: string
  code: number
}
