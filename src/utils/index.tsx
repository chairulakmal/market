export const currencyFormatter = (n: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n)
}

export const percentageFormatter = (n: number) => {
  return n ? Math.abs(n).toFixed(2) : '0.00'
}
