import React from 'react';
import { expect } from 'chai';
import { fireEvent, render } from '@testing-library/react';
import sinon from 'sinon';

import { DefinitionTester } from 'platform/testing/unit/schemaform-utils';
import { $ } from 'platform/forms-system/src/js/utilities/ui';

import formConfig from '../../config/form';

describe('Service Period', () => {
  const {
    schema,
    uiSchema,
  } = formConfig.chapters.serviceHistory.pages.servicePeriods;

  it('should render', () => {
    const onSubmit = sinon.spy();
    const { container } = render(
      <DefinitionTester
        definitions={{}}
        schema={schema}
        uiSchema={uiSchema}
        data={{
          toursOfDuty: [
            {
              serviceBranch: 'Air Force',
              date: {
                from: '2020-01-01',
                to: '2021-01-01',
              },
              command: 'Test',
              rank: 'Test',
              duty: 'Test',
            },
          ],
        }}
        onSubmit={onSubmit}
      />,
    );
    expect($('form', container)).to.exist;
  });

  it('should display no error when all required data is passed in', () => {
    const onSubmit = sinon.spy();
    const { container } = render(
      <DefinitionTester
        definitions={{}}
        schema={schema}
        uiSchema={uiSchema}
        data={{
          toursOfDuty: [
            {
              serviceBranch: 'Air Force',
              date: {
                from: '2020-01-01',
                to: '2021-01-01',
              },
              command: 'Test',
              rank: 'Test',
              duty: 'Test',
            },
          ],
        }}
        onSubmit={onSubmit}
      />,
    );
    fireEvent.submit($('form', container));
    expect($('[error]', container)).to.not.exist;
  });

  it('should display an error when serviceBranch is not provided', () => {
    const onSubmit = sinon.spy();
    const { container } = render(
      <DefinitionTester
        definitions={{}}
        schema={schema}
        uiSchema={uiSchema}
        data={{
          toursOfDuty: [
            {
              date: {
                from: '2020-01-01',
                to: '2021-01-01',
              },
              command: 'Test',
              rank: 'Test',
              duty: 'Test',
            },
          ],
        }}
        onSubmit={onSubmit}
      />,
    );
    fireEvent.submit($('form', container));
    expect($('[error]', container)).to.exist;
  });

  it('should display an error when duty is not provided', () => {
    const onSubmit = sinon.spy();
    const { container } = render(
      <DefinitionTester
        definitions={{}}
        schema={schema}
        uiSchema={uiSchema}
        data={{
          toursOfDuty: [
            {
              serviceBranch: 'Air Force',
              date: {
                from: '2020-01-01',
                to: '2021-01-01',
              },
              command: 'Test',
              rank: 'Test',
            },
          ],
        }}
        onSubmit={onSubmit}
      />,
    );
    fireEvent.submit($('form', container));
    expect($('[error]', container)).to.exist;
  });
});
