import { expect } from 'chai';
import { formatReadableDate } from '../helpers';

describe('formatReadableDate', () => {
  it('should transform a raw date string to a human readable string', () => {
    const rawDate = '2000-12-31';
    const formatted = formatReadableDate(rawDate);

    expect(formatted).to.eq('December 31, 2000');
  });

  it('should return an empty string with an invalid date provided', () => {
    const rawDate = '2000/12/31';
    const formatted = formatReadableDate(rawDate);

    expect(formatted).to.eq('');
  });
});
