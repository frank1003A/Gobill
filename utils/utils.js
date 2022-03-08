/**Functions that are reused multiple time */

/**Date format: mm/dd/yyyy */
export const convertDate = (str) => {
    let date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    //return [date.getFullYear(), mnth, day].join("-");
    return [mnth, day, date.getFullYear()].join("/");
}

/**Returns an array of data sorted by date range. */
export const sortDataByDate = (data, startdate, enddate) => {
  const startDate = new Date(startdate);
  const endDate = new Date(enddate);

  const returndata = data.filter((a) => {
    const date = new Date(a.dateCreated);
    return date >= startDate && date <= endDate;
  });

  return returndata
};