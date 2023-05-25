"use client";
import useSWR from 'swr';

type PriceData = {
  pair: string;
  latestPrice: number;
  day: number;
  week: number;
  month: number;
  year: number;
};

// const endpoint = process.env.NODE_ENV === 'development' ? '/api/' : 'https://api.pintu.co.id/v2/trade/price-changes';
const endpoint = '/api/';

const fetcher: () => Promise<PriceData[]> = async () => {
  try {
    const response = await fetch(endpoint);

    if (response.ok) {
      const data = await response.json();
      const prices = data.payload.map((item: any) => ({
        pair: item.pair,
        latestPrice: +item.latestPrice,
        day: +item.day,
        week: +item.week,
        month: +item.month,
        year: +item.year,
      }));
      return prices;
    } else {
      console.log(response);
      throw new Error('Request failed with status ' + response.status);
    }
  } catch (error) {
    console.log('Error fetching data:', error);
    throw error;
  }
};

const Price = (): JSX.Element => {
  let prices: PriceData[] = [];
  const { data, error, isLoading } = useSWR<PriceData[]>(endpoint, fetcher, { refreshInterval: 1000 });

  if (error) {
    return <div>Failed to load</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (data) {
    prices = data.sort((a, b) => Math.abs(b.week) - Math.abs(a.week))
      .filter(el => el.day || el.week || el.month)
    console.log(prices.length, typeof prices[0].latestPrice)
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Pair</th>
            <th>Latest Price</th>
            <th>Day Change</th>
            <th>Week Change</th>
            <th>Month Change</th>
            <th>Year Change</th>
          </tr>
        </thead>
        <tbody>
          {prices.map((price: PriceData) => (
            <tr key={price.pair}>
              <td>{price.pair}</td>
              <td>{price.latestPrice.toFixed(2)}</td>
              <td>{price.day.toFixed(2)}</td>
              <td>{price.week.toFixed(2)}</td>
              <td>{price.month.toFixed(2)}</td>
              <td>{price.year.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <small>
            Price shown is in Indonesian Rupiah (IDR)
      </small>
    </>
  );
}

export default Price;
