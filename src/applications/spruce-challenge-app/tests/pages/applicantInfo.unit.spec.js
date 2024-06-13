import React from 'react';
import { expect } from 'chai';
import { DefinitionTester } from 'platform/testing/unit/schemaform-utils';
import { mount } from 'enzyme';
import sinon from 'sinon';
import formConfig from '../../config/form';

describe('Applicant Info', () => {
  const {
    schema,
    uiSchema,
  } = formConfig.chapters.applicantInformationChapter.pages.applicantInformation;

  it('should render', () => {
    const form = mount(
      <DefinitionTester
        definitions={formConfig.defaultDefinitions}
        schema={schema}
        uiSchema={uiSchema}
        data={{}}
      />,
    );
    expect(form.find('input').length).to.equal(4);
    expect(form.find('select').length).to.equal(3);
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
          userFullName: {
            first: 'John',
            middle: null,
            last: 'Doe',
            suffix: null,
          },
          dateOfBirth: '1959-04-18',
        }}
      />,
    );
    form.find('form').simulate('submit');
    expect(form.find('.usa-input-error-message').length).to.equal(0);
    expect(onSubmit.called).to.be.true;
    form.unmount();
  });

  it('should require first name', () => {
    const onSubmit = sinon.spy();
    const form = mount(
      <DefinitionTester
        definitions={formConfig.defaultDefinitions}
        schema={schema}
        uiSchema={uiSchema}
        onSubmit={onSubmit}
        data={{
          userFullName: {
            first: null,
            middle: null,
            last: 'Doe',
            suffix: null,
          },
          dateOfBirth: '1959-04-18',
        }}
      />,
    );
    form.find('form').simulate('submit');
    expect(form.find('.usa-input-error-message').length).to.equal(1);
    expect(onSubmit.called).to.be.false;
    form.unmount();
  });

  it('should require last name', () => {
    const onSubmit = sinon.spy();
    const form = mount(
      <DefinitionTester
        definitions={formConfig.defaultDefinitions}
        schema={schema}
        uiSchema={uiSchema}
        onSubmit={onSubmit}
        data={{
          userFullName: {
            first: 'John',
            middle: null,
            last: null,
            suffix: null,
          },
          dateOfBirth: '1959-04-18',
        }}
      />,
    );
    form.find('form').simulate('submit');
    expect(form.find('.usa-input-error-message').length).to.equal(1);
    expect(onSubmit.called).to.be.false;
    form.unmount();
  });

  it('should require date of birth', () => {
    const onSubmit = sinon.spy();
    const form = mount(
      <DefinitionTester
        definitions={formConfig.defaultDefinitions}
        schema={schema}
        uiSchema={uiSchema}
        onSubmit={onSubmit}
        data={{
          userFullName: {
            first: 'John',
            middle: null,
            last: 'Doe',
            suffix: null,
          },
          dateOfBirth: null,
        }}
      />,
    );
    form.find('form').simulate('submit');
    expect(form.find('.usa-input-error-message').length).to.equal(1);
    expect(onSubmit.called).to.be.false;
    form.unmount();
  });

  it('name fields should be at least 3 characters', () => {
    const onSubmit = sinon.spy();
    const form = mount(
      <DefinitionTester
        definitions={formConfig.defaultDefinitions}
        schema={schema}
        uiSchema={uiSchema}
        onSubmit={onSubmit}
        data={{
          userFullName: {
            first: 'no',
            middle: null,
            last: 'ty',
            suffix: null,
          },
          dateOfBirth: '1959-04-18',
        }}
      />,
    );
    form.find('form').simulate('submit');
    expect(form.find('.usa-input-error-message').length).to.equal(2);
    expect(onSubmit.called).to.be.false;
    form.unmount();
  });

  it('name fields should lead with valid characters (no spaces or dashes', () => {
    const onSubmit = sinon.spy();
    const form = mount(
      <DefinitionTester
        definitions={formConfig.defaultDefinitions}
        schema={schema}
        uiSchema={uiSchema}
        onSubmit={onSubmit}
        data={{
          userFullName: {
            first: ' Mark',
            middle: "'O",
            last: '-Brian',
            suffix: null,
          },
          dateOfBirth: '1959-04-18',
        }}
      />,
    );
    form.find('form').simulate('submit');
    expect(form.find('.usa-input-error-message').length).to.equal(3);
    expect(onSubmit.called).to.be.false;
    form.unmount();
  });

  it('name fields should not accept numbers', () => {
    const onSubmit = sinon.spy();
    const form = mount(
      <DefinitionTester
        definitions={formConfig.defaultDefinitions}
        schema={schema}
        uiSchema={uiSchema}
        onSubmit={onSubmit}
        data={{
          userFullName: {
            first: 'Jordan1',
            middle: '2',
            last: 'The 3rd',
            suffix: null,
          },
          dateOfBirth: '1959-04-18',
        }}
      />,
    );
    form.find('form').simulate('submit');
    expect(form.find('.usa-input-error-message').length).to.equal(3);
    expect(onSubmit.called).to.be.false;
    form.unmount();
  });
});
