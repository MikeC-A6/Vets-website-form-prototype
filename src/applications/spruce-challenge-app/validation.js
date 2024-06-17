export const isDateWithinTenYearsOfToday = (errors, date) => {
  const today = new Date();

  // convert field data to a date object for math
  const diff = Math.abs(today - new Date(date.replace(/-/g, '/')));

  // years * days * hours * minutes * seconds * milliseconds
  const tenYears = 10 * 365 * 24 * 60 * 60 * 1000;

  if (diff < tenYears) {
    errors.addError(
      'This birth date is too soon for you to have been discharged from the military. Please enter a valid birth date.',
    );
  }
};

export function isOnlyWhitespace(str) {
  return str && !str.trim().length;
}
