export const formatTimeStamp = (date: string): string => {
  if (!date) return '';
  const [datePart] = date.split(' ');
  const [year, month, day] = datePart.split('-');
  return `${year} ${month}.${day}`;
};

export const defaultFormatTimeStamp = (date: string): string => {
  if (!date) return '';

  const [datePart] = date.split(' ');
  const [year, month, day] = datePart.split('-');
  return `${year}.${month}.${day}`;
};
