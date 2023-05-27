# Tox Bazaar

This is a [Next.js](https://nextjs.org/) project template bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

To run the development server:

```bash
npm run dev
```

Open [`localhost:3000`](http://localhost:3000) with your browser to see the result.

You can start editing the app and the page will auto-update as you edit the files.

## Features

- **Font Optimization**: This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
- **Linting**: ESLint is set up to ensure code quality and consistency.
- **Styling**: Tailwind CSS is integrated for easy and responsive styling.
- **Deployment**: Automatic deployment with [Vercel](https://vercel.com/).
- **Data Fetching**: [SWR](https://swr.vercel.app/), the React hook library for data fetching, is utilized for efficient data management.

## Public Endpoints

The data presented in this project is obtained from the following public endpoints:

<details>
<summary>
  Supported Currencies
</summary>

---

Retrieves a list of supported currencies.

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
      "logo": "https://s3-ap-southeast-1.amazonaws.com/static.pintu.co.id/assets/images/logo/circle_IDRT.svg",
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
          "logo": "https://s3.ap-southeast-1.amazonaws.com/static.pintu.co.id/assets/images/logo/blockchain/ERC-20.svg"
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

## Price Changes

Retrieves the price changes for different trading pairs.

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
