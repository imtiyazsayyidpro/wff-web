/** Formats a paise (minor-unit) amount as a localized currency string. */
export function formatMoney(paise: number, currency = "INR"): string {
  const major = paise / 100;
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      maximumFractionDigits: paise % 100 === 0 ? 0 : 2,
    }).format(major);
  } catch {
    return `${major.toFixed(2)} ${currency}`;
  }
}
