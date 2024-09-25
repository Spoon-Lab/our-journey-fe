export const formatTimeStamp = (date: string): string => {
  const [datePart] = date.split(' ');
  const [year, month, day] = datePart.split('-');
  return `${year} ${month}.${day}`;
};
