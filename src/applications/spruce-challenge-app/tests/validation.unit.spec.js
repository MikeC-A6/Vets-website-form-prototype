import { expect } from 'chai';
import sinon from 'sinon';

import { isDateWithinTenYearsOfToday } from '../validation';

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
});
