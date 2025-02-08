// In a real form this wouldn't be imported here. We'd pull the real schema that has this included.
import commonDefinitions from 'vets-json-schema/dist/definitions.json';

const fullSchema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Aid & Attendance Benefits Application',
  type: 'object',
  additionalProperties: false,
  required: ['veteranInformation'],
  properties: {
    veteranInformation: {
      type: 'object',
      required: ['veteranIdentifyingInfo', 'claimantInfo'],
      properties: {
        veteranIdentifyingInfo: {
          type: 'object',
          title: 'Veteran Information',
          required: ['dischargeDate'],
          properties: {
            'view:subHeadings': {
              type: 'object',
              properties: {},
            },
            veteranSocialSecurityNumber: {
              type: 'string',
              // pattern: '^[0-9]{9}$',
            },
            departmentOfDefenseID: {
              type: 'string',
              pattern: '^[0-9]{10}$',
            },
            dischargeDate: {
              $ref: '#/definitions/date'
            }
          }
        },
        claimantInfo: {
          type: 'object',
          title: 'Claimant Information',
          required: ['isClaimant'],
          properties: {
            'view:claimantSection': {
              type: 'object',
              properties: {},
            },
            isClaimant: {
              type: 'string',
              enum: ['Y', 'N'],
            },
            claimantFullName: {
              $ref: '#/definitions/fullName'
            },
            claimantSocialSecurityNumber: {
              type: 'string',
              pattern: '^[0-9]{9}$',
            },
            claimantDateOfBirth: {
              $ref: '#/definitions/date'
            },
            relationshipToVeteran: {
              type: 'string',
              enum: ['', 'SPOUSE', 'PARENT', 'CHILD']
            }
          },
          dependencies: {
            isClaimant: {
              oneOf: [
                {
                  properties: {
                    isClaimant: {
                      enum: ['Y']
                    }
                  }
                },
                {
                  properties: {
                    isClaimant: {
                      enum: ['N']
                    }
                  },
                  required: [
                    'claimantFullName',
                    'claimantSocialSecurityNumber',
                    'claimantDateOfBirth',
                    'relationshipToVeteran'
                  ]
                }
              ]
            }
          }
        }
      }
    }
  },
  definitions: {
    ...commonDefinitions,
  },
};

export default fullSchema;
