# TokenBazar

This is a [Next.js](https://nextjs.org/) project template bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) using `TypeScript`, `Tailwind CSS`, `Cypress` and `ESLint`.

## Getting Started

To run the development server:

```bash
npm run dev
```

Open [`localhost:3000`](http://localhost:3000) with your browser to see the result.

You can start editing the app and the page will auto-update as you edit the files.

## Features

- **SWR**: [SWR](https://swr.vercel.app/), the React hook library is used for data fetching. It provides components with a stream of data updates.
- **Tailwind**: The app integrates Tailwind CSS, a popular utility-first CSS framework, to facilitate easy and responsive styling.
- **Linting**: ESLint and Prettier are set up to ensure code quality and consistency.
- **Cypress**: Cypress is used for both end-to-end (e2e) and unit testing.
- **Deployment**: The app is automatically deployed using [Vercel](https://vercel.com/), a popular hosting platform that provides seamless deployment workflows and scalability and works well with Next.js app.

## Token Prices Data

The app utilizes two primary data types for its functionality, `CurrencyData` and `PriceData`:

```typescript
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

declare type PriceData = {
  pair: string
  latestPrice: number
  day: number
  week: number
  month: number
  year: number
}
```

The data used in this project comes from two public endpoints listed below. The first endpoint gives us an array of `CurrencyData` objects that hold details about various cryptocurrencies or tokens. The second endpoint provides an array of `PriceData` objects, where the base currency in `PriceData.pair` matches the `CurrencyData.currencyGroup`. These endpoints allow the app to fetch real-time price data for presentation. However, it's important to note that only the second endpoint is used to update the data in real-time, as the first endpoint's data is not refreshed as frequently.

<details>
<summary>
  Supported Tokens
</summary>

---

Retrieves a list of supported tokens.

- **URL**: `https://api.pintu.co.id/v2/wallet/supportedCurrencies`
- **Method**: GET
- **Auth required**: No

### Success Response

- **Code**: 200 OK
- **Content example**:

```json
{
  "code": "success",
  "message": "",
  "payload": [
    {
      "currencyGroup": "IDR",
      "color": "#0A68F4",
      "currencySymbol": "Rp",
      "name": "Rupiah Token",
      "logo": "https://.../assets/images/logo/circle_IDRT.svg",
      "decimal_point": 0,
      "listingDate": "2020-09-15T09:43:42Z",
      "wallets": [
        {
          "currencyGroup": "IDR",
          "tokenSymbol": "IDRT",
          "decimal_point": 2,
          "tokenType": "ERC-20",
          "blockchain": "Ethereum",
          "explorer": "https://etherscan.io/tx/",
          "listingDate": "2020-09-15T09:43:43Z",
          "blockchainName": "Ethereum",
          "logo": "https://.../ERC-20.svg"
        },
        ...
      ]
    },
    ...
  ]
}
```

### Response Fields

- `currencyGroup` (string): The currency group code.
- `color` (string): The color associated with the currency.
- `currencySymbol` (string): The symbol of the currency.
- `name` (string): The name of the currency.
- `logo` (string): The URL of the currency logo.
- `decimal_point` (integer): The number of decimal points used for the currency.
- `listingDate` (string): The date when the currency was listed.
- `wallets` (array): An array of wallet objects representing different tokens for the currency.
  - `currencyGroup` (string): The currency group code.
  - `tokenSymbol` (string): The symbol of the token.
  - `decimal_point` (integer): The number of decimal points used for the token.
  - `tokenType` (string): The type of the token.
  - `blockchain` (string): The blockchain associated with the token.
  - `explorer` (string): The URL of the blockchain explorer for the token.
  - `listingDate` (string): The date when the token was listed.
  - `blockchainName` (string): The name of the blockchain.
  - `logo` (string): The URL of the token logo.

---

</details>

<details>
<summary>
  Prices
</summary>

---

Retrieves the price changes for different token trading pairs.

- **URL**: `https://api.pintu.co.id/v2/trade/price-changes`
- **Method**: GET
- **Auth required**: No

### Success Response

- **Code**: 200 OK
- **Content example**:

```json
{
  "code": "success",
  "message": "",
  "payload": [
    {
      "pair": "atom/idr",
      "latestPrice": "158494",
      "day": "1.06",
      "week": "-0.20",
      "month": "-3.58",
      "year": "12.22"
    },
    ...
  ]
}
```

### Response Fields

- `pair` (string): The trading pair symbol.
- `latestPrice` (string): The latest price for the trading pair in Rupiah (IDR).
- `day` (string): The percentage change in price for the last 24 hours.
- `week` (string): The percentage change in price for the week.
- `month` (string): The percentage change in price for the month.
- `year` (string): The percentage change in price for the year.

---

</details>
