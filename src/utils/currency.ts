export function formatCurrency(currency: number) {
  const currencyFormatted = new Intl.NumberFormat("pt-br", {
    currency: "BRL",
    style: "currency",
    maximumFractionDigits: 2
  }).format(currency);

  return currencyFormatted;
}
