function calcDayGap (date) {
  const one_day = 1000 * 60 * 60 * 24;
  const currDate = new Date();
  const departDate = new Date(date);
  const result =
    Math.round(departDate.getTime() - currDate.getTime()) / one_day;
  return result.toFixed(0); // To remove the decimals from the (Result) resulting days value
}

export {calcDayGap}