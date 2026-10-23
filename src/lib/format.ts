export function formatDzd(value: number) {
  return new Intl.NumberFormat('fr-DZ', {
    style: 'currency',
    currency: 'DZD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
    .format(value)
    .replace(/[\u00a0\u202f]/g, ' ');
}

/** Display absolute source dates in cabinet format; retain relative/unknown labels honestly. */
export function formatDateDisplay(value: string): string {
  const months: Record<string, string> = {
    janv: '01',
    févr: '02',
    mars: '03',
    avr: '04',
    mai: '05',
    juin: '06',
    juil: '07',
    août: '08',
    sept: '09',
    oct: '10',
    nov: '11',
    déc: '12',
  };
  const legacy = value.match(/^(\d{1,2}) ([\p{L}]+)\.? (\d{4})$/u);
  const iso =
    legacy && months[legacy[2]]
      ? `${legacy[3]}-${months[legacy[2]]}-${legacy[1].padStart(2, '0')}`
      : value;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return value;
  const date = new Date(`${iso}T12:00:00Z`);
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== iso) return value;
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}
