import React from 'react';
import { expect } from 'chai';
import { fireEvent, render } from '@testing-library/react';
import sinon from 'sinon';

import { DefinitionTester } from 'platform/testing/unit/schemaform-utils';
import { $ } from 'platform/forms-system/src/js/utilities/ui';

import formConfig from '../../config/form';

describe('Mailing Address', () => {
  const {
    schema,
    uiSchema,
  } = formConfig.chapters.shippingAddressChapter.pages.mailingAddress;

  it('should render', () => {
    const onSubmit = sinon.spy();
    const { container } = render(
      <DefinitionTester
        definitions={{}}
        schema={schema}
        uiSchema={uiSchema}
        data={{}}
        onSubmit={onSubmit}
      />,
    );

    expect($('form', container)).to.exist;
  });

  it('should not display an error when all required data is present', () => {
    const onSubmit = sinon.spy();
    const { container } = render(
      <DefinitionTester
        definitions={{}}
        schema={schema}
        uiSchema={uiSchema}
        data={{
          'view:mailingAddress': {
            mailingAddress: {
              country: 'USA',
              city: 'Test',
              street: 'Test',
              state: 'VT',
              postalCode: '12345',
            },
          },
        }}
        onSubmit={onSubmit}
      />,
    );
    fireEvent.submit($('form', container));
    expect($('.usa-input-error-message', container)).to.not.exist;
  });

  it('should display an error when missing city', () => {
    const onSubmit = sinon.spy();
    const { container } = render(
      <DefinitionTester
        definitions={{}}
        schema={schema}
        uiSchema={uiSchema}
        data={{
          'view:mailingAddress': {
            mailingAddress: {
              country: 'USA',
              street: 'Test',
              state: 'VT',
              postalCode: '12345',
            },
          },
        }}
        onSubmit={onSubmit}
      />,
    );
    fireEvent.submit($('form', container));
    expect($('.usa-input-error-message', container)).to.exist;
  });

  it('should display an error when missing street', () => {
    const onSubmit = sinon.spy();
    const { container } = render(
      <DefinitionTester
        definitions={{}}
        schema={schema}
        uiSchema={uiSchema}
        data={{
          'view:mailingAddress': {
            mailingAddress: {
              country: 'USA',
              city: 'Test',
              state: 'VT',
              postalCode: '12345',
            },
          },
        }}
        onSubmit={onSubmit}
      />,
    );
    fireEvent.submit($('form', container));
    expect($('.usa-input-error-message', container)).to.exist;
  });

  it('should display an error when missing state', () => {
    const onSubmit = sinon.spy();
    const { container } = render(
      <DefinitionTester
        definitions={{}}
        schema={schema}
        uiSchema={uiSchema}
        data={{
          'view:mailingAddress': {
            mailingAddress: {
              country: 'USA',
              city: 'Test',
              street: 'Test',
              postalCode: '12345',
            },
          },
        }}
        onSubmit={onSubmit}
      />,
    );
    fireEvent.submit($('form', container));
    expect($('.usa-input-error-message', container)).to.exist;
  });

  it('should display an error when missing postalCode', () => {
    const onSubmit = sinon.spy();
    const { container } = render(
      <DefinitionTester
        definitions={{}}
        schema={schema}
        uiSchema={uiSchema}
        data={{
          'view:mailingAddress': {
            mailingAddress: {
              country: 'USA',
              city: 'Test',
              street: 'Test',
              state: 'VT',
            },
          },
        }}
        onSubmit={onSubmit}
      />,
    );
    fireEvent.submit($('form', container));
    expect($('.usa-input-error-message', container)).to.exist;
  });
});
