export const dateFormatter = (date) => {
  const dateObject = new Date(date);

  const day = dateObject.getUTCDate();
  const month = dateObject.getUTCMonth() + 1;
  const year = dateObject.getUTCFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
};