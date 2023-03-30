function calcDayGap(date) {
  const oneDay = 1000 * 60 * 60 * 24;
  const currDate = new Date();
  const departDate = new Date(date);
  const result = Math.round(departDate.getTime() - currDate.getTime()) / oneDay;
  return result.toFixed(0); // To remove the decimals from the (Result) resulting days value
}

export { calcDayGap };
