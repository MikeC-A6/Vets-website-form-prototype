import { expect } from 'chai';
import prefillTransformer from '../config/prefill-transformer';
import {
  minPrefillData,
  minTransformedPrefillData,
  maxPrefillData,
  maxTransformedPrefillData,
} from '../mocks/prefillData';

describe('prefillTransformer', () => {
  it('should transform minimal prefill data correctly', () => {
    expect(prefillTransformer({}, minPrefillData, {}).formData).to.deep.equal(
      minTransformedPrefillData,
    );
  });

  it('should transform maximal prefill data correctly', () => {
    expect(prefillTransformer({}, maxPrefillData, {}).formData).to.deep.equal(
      maxTransformedPrefillData,
    );
  });
});
