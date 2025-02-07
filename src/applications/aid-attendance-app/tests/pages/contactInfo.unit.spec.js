import React from 'react';
import { expect } from 'chai';
import { fireEvent, render } from '@testing-library/react';
import sinon from 'sinon';

import { DefinitionTester } from 'platform/testing/unit/schemaform-utils';
import { $, $$ } from 'platform/forms-system/src/js/utilities/ui';

import formConfig from '../../config/form';

describe('Contact Info', () => {
  const {
    schema,
    uiSchema,
  } = formConfig.chapters.applicantInformationChapter.pages.phoneEmail;

  it('should render', () => {
    const { container } = render(
      <DefinitionTester
        definitions={formConfig.defaultDefinitions}
        schema={schema}
        uiSchema={uiSchema}
        data={{}}
      />,
    );
    expect($$('va-text-input', container)).to.exist;
  });

  it('should successfully submit with no data', () => {
    const onSubmit = sinon.spy();
    const { container } = render(
      <DefinitionTester
        definitions={formConfig.defaultDefinitions}
        schema={schema}
        uiSchema={uiSchema}
        onSubmit={onSubmit}
        data={{}}
      />,
    );
    fireEvent.submit($('form', container));
    expect(onSubmit.called).to.be.true;
  });

  it('should validate email address is correct format', () => {
    const onSubmit = sinon.spy();
    const { container } = render(
      <DefinitionTester
        definitions={{}}
        schema={schema}
        uiSchema={uiSchema}
        onSubmit={onSubmit}
        data={{
          'view:phoneNumbers': {
            phoneNumber: '',
          },
        }}
      />,
    );
    fireEvent.submit($('form', container));
    expect($('va-text-input', container).error).to.exist;
  });

  it('should fail if phone number is in incorrect format', () => {
    const onSubmit = sinon.spy();
    const { container, getByText } = render(
      <DefinitionTester
        definitions={formConfig.defaultDefinitions}
        schema={schema}
        uiSchema={uiSchema}
        onSubmit={onSubmit}
        data={{
          'view:phoneNumbers': {
            phoneNumber: 'foo',
          },
        }}
      />,
    );
    fireEvent.click(getByText('Submit'));
    expect($('va-text-input', container).error).to.exist;
  });

  it('should validate phone number is correct format', () => {
    const onSubmit = sinon.spy();
    const { container, getByText } = render(
      <DefinitionTester
        definitions={formConfig.defaultDefinitions}
        schema={schema}
        uiSchema={uiSchema}
        onSubmit={onSubmit}
        data={{
          'view:phoneNumbers': {
            phoneNumber: '312-532-7083',
          },
        }}
      />,
    );
    fireEvent.click(getByText('Submit'));
    expect($('va-text-input', container).error).to.not.exist;
  });
});
