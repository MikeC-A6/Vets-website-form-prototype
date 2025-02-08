import React from 'react';
import { expect } from 'chai';
import { DefinitionTester } from 'platform/testing/unit/schemaform-utils';
import { mount } from 'enzyme';
import sinon from 'sinon';
import formConfig from '../../config/form';
import { formFields } from '../../../aid-attendance-app/constants';

describe('Applicant Info', () => {
  const {
    schema,
    uiSchema,
  } = formConfig.chapters.applicantInformationChapter.pages.identifyingInformation;

  it('should render', () => {
    const form = mount(
      <DefinitionTester
        definitions={formConfig.defaultDefinitions}
        schema={schema}
        uiSchema={uiSchema}
        data={{}}
      />,
    );
    expect(form.find('input').length).to.equal(3);
    expect(form.find('select').length).to.equal(2);
    form.unmount();
  });

  it('should successfully submit', () => {
    const onSubmit = sinon.spy();
    const form = mount(
      <DefinitionTester
        definitions={formConfig.defaultDefinitions}
        schema={schema}
        uiSchema={uiSchema}
        onSubmit={onSubmit}
        data={{
          [formFields.veteranSocialSecurityNumber]: '411411414',
          [formFields.departmentOfDefenseID]: null,
          [formFields.dischargeDate]: '1990-01-25',
        }}
      />,
    );
    form.find('form').simulate('submit');
    expect(form.find('.usa-input-error-message').length).to.equal(0);
    expect(onSubmit.called).to.be.true;
    form.unmount();
  });

  it('should require SSN', () => {
    const onSubmit = sinon.spy();
    const form = mount(
      <DefinitionTester
        definitions={formConfig.defaultDefinitions}
        schema={schema}
        uiSchema={uiSchema}
        onSubmit={onSubmit}
        data={{
          [formFields.veteranSocialSecurityNumber]: null,
          [formFields.departmentOfDefenseID]: '',
          [formFields.dischargeDate]: '1990-01-25',
        }}
      />,
    );
    form.find('form').simulate('submit');
    expect(form.find('.usa-input-error-message').length).to.equal(2);
    expect(onSubmit.called).to.be.false;
    form.unmount();
  });

  it('should require discharge date', () => {
    const onSubmit = sinon.spy();
    const form = mount(
      <DefinitionTester
        definitions={formConfig.defaultDefinitions}
        schema={schema}
        uiSchema={uiSchema}
        onSubmit={onSubmit}
        data={{
          [formFields.veteranSocialSecurityNumber]: '411411414',
          [formFields.departmentOfDefenseID]: null,
          [formFields.dischargeDate]: null,
        }}
      />,
    );
    form.find('form').simulate('submit');
    expect(form.find('.usa-input-error-message').length).to.equal(1);
    expect(onSubmit.called).to.be.false;
    form.unmount();
  });

  it('discharge date should not be in the future', () => {
    const onSubmit = sinon.spy();
    const form = mount(
      <DefinitionTester
        definitions={formConfig.defaultDefinitions}
        schema={schema}
        uiSchema={uiSchema}
        onSubmit={onSubmit}
        data={{
          [formFields.veteranSocialSecurityNumber]: '411411414',
          [formFields.departmentOfDefenseID]: null,
          [formFields.dischargeDate]: '2050-01-25',
        }}
      />,
    );
    form.find('form').simulate('submit');
    expect(form.find('.usa-input-error-message').length).to.equal(1);
    expect(onSubmit.called).to.be.false;
    form.unmount();
  });
});
