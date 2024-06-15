/**
 * Formats a date in human-readable form. For example:
 * January 1, 2000.
 *
 * @param {*} rawDate A date in the form '2000-12-31' (December 31, 2000)
 * @returns A human-readable date string.
 */
export const formatReadableDate = rawDate => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  let dateParts;
  let date;

  if (rawDate) {
    dateParts = rawDate.split('-');
    date = new Date(
      Number.parseInt(dateParts[0], 10),
      Number.parseInt(dateParts[1], 10) - 1,
      Number.parseInt(dateParts[2], 10),
    );
  }

  if (!date || Number.isNaN(date.getDate())) {
    return '';
  }

  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};
