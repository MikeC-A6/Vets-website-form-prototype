import React from 'react';
import { expect } from 'chai';
import { fireEvent, render } from '@testing-library/react';
import sinon from 'sinon';

import { DefinitionTester } from 'platform/testing/unit/schemaform-utils';
import { $, $$ } from 'platform/forms-system/src/js/utilities/ui';

import formConfig from '../../config/form';

describe('Frame Options', () => {
  const {
    schema,
    uiSchema,
  } = formConfig.chapters.frameSelectionChapter.pages.frameOptions;

  it('should render', () => {
    const { container } = render(
      <DefinitionTester
        definitions={formConfig.defaultDefinitions}
        schema={schema}
        uiSchema={uiSchema}
        data={{}}
      />,
    );
    expect($$('va-radio', container).length).to.equal(2);
  });

  it('should successfully submit with all data', () => {
    const onSubmit = sinon.spy();
    const { getByText } = render(
      <DefinitionTester
        definitions={formConfig.defaultDefinitions}
        schema={schema}
        uiSchema={uiSchema}
        onSubmit={onSubmit}
        data={{
          frameWood: 'Pine',
          frameMount: 'Table top',
        }}
      />,
    );
    fireEvent.click(getByText('Submit'));
    expect(onSubmit.called).to.be.true;
  });

  it('should require a choice of wood', () => {
    const onSubmit = sinon.spy();
    const { container, getByText } = render(
      <DefinitionTester
        definitions={formConfig.defaultDefinitions}
        schema={schema}
        uiSchema={uiSchema}
        onSubmit={onSubmit}
        data={{
          frameWood: null,
          frameMount: 'Table top',
        }}
      />,
    );
    fireEvent.click(getByText('Submit'));
    expect($('[error]', container)).to.exist;
    expect(onSubmit.called).to.be.false;
  });

  it('should require a choice of mount', () => {
    const onSubmit = sinon.spy();
    const { container, getByText } = render(
      <DefinitionTester
        definitions={formConfig.defaultDefinitions}
        schema={schema}
        uiSchema={uiSchema}
        onSubmit={onSubmit}
        data={{
          frameWood: 'Cedar',
          frameMount: null,
        }}
      />,
    );
    fireEvent.click(getByText('Submit'));
    expect($('[error]', container)).to.exist;
    expect(onSubmit.called).to.be.false;
  });

  it('must be a valid option', () => {
    const onSubmit = sinon.spy();
    const { container, getByText } = render(
      <DefinitionTester
        definitions={formConfig.defaultDefinitions}
        schema={schema}
        uiSchema={uiSchema}
        onSubmit={onSubmit}
        data={{
          frameWood: 'Mahogany',
          frameMount: 'Table top',
        }}
      />,
    );
    fireEvent.click(getByText('Submit'));
    expect($('[error]', container)).to.exist;
    expect(onSubmit.called).to.be.false;
  });
});
