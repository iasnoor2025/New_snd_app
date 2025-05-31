export function formatCurrency(value: number) {
  return value?.toLocaleString('en-US', { style: 'currency', currency: 'SAR' }) ?? '—';
}

export function formatPercentage(value: number) {
  return value?.toLocaleString('en-US', { style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 1 }) ?? '—';
}
