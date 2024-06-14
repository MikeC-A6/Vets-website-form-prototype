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
    const { getByText } = render(
      <DefinitionTester
        definitions={formConfig.defaultDefinitions}
        schema={schema}
        uiSchema={uiSchema}
        onSubmit={onSubmit}
        data={{}}
      />,
    );
    fireEvent.click(getByText('Submit'));
    expect(onSubmit.called).to.be.true;
  });

  it('should validate email address is correct format', () => {
    const onSubmit = sinon.spy();
    const { container, getByText } = render(
      <DefinitionTester
        definitions={formConfig.defaultDefinitions}
        schema={schema}
        uiSchema={uiSchema}
        onSubmit={onSubmit}
        data={{
          email: 'asdf',
        }}
      />,
    );
    fireEvent.click(getByText('Submit'));
    expect($('[error]', container)).to.exist;
    expect(onSubmit.called).to.be.false;
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
            phoneNumber: 'foo',
          },
        }}
      />,
    );
    fireEvent.click(getByText('Submit'));
    expect($('va-text-input', container).error).to.exist;
    expect(onSubmit.called).to.be.false;
  });
});
