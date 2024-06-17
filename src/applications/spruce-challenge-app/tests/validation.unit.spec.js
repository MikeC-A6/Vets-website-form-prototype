import { expect } from 'chai';
import sinon from 'sinon';

import {
  isDateWithinTenYearsOfToday,
  isOnlyWhitespace,
  isTenNumeric,
} from '../validation';

describe('Schemaform validations', () => {
  describe('isDateWithinTenYearsOfToday', () => {
    it('should set a message if date is within 10 years of today', () => {
      const errors = { addError: sinon.spy() };

      const recentDate = '2024-01-16';
      isDateWithinTenYearsOfToday(errors, recentDate);

      expect(errors.addError.callCount).to.equal(1);
      expect(errors.addError.firstCall.args[0]).to.equal(
        'This birth date is too soon for you to have been discharged from the military. Please enter a valid birth date.',
      );
    });
  });

  describe('isOnlyWhitespace', () => {
    it('should detect when text is not only whitespace', () => {
      expect(isOnlyWhitespace('asdfasdf')).to.be.false;
    });

    it('should detect when there is whitespace', () => {
      expect(isOnlyWhitespace(' ')).to.be.true;
    });
  });

  describe('isTenNumeric', () => {
    it('should detect when text is not only numeric', () => {
      expect(isTenNumeric('asdfas12df')).to.be.false;
    });

    it('should detect when there is less than 10 digits', () => {
      expect(isTenNumeric('123456789')).to.be.false;
    });

    it('should pass when there are exactly 10 digits', () => {
      expect(isTenNumeric('1234567890')).to.be.true;
    });
  });
});
