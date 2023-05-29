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
  logo: string
  color: string
  decimal_point: number
  listingDate: Date
  price: PriceData
}

interface IconProps {
  logo: string
  name: string
  color: string
}

interface TableProps {
  currencies: CurrencyData[]
}

interface PageError {
  message: string
  code: number
}
