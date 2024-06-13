// In a real form this wouldn't be imported here. We'd pull the real schema
import commonDefinitions from 'vets-json-schema/dist/definitions.json';

const fullSchema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title:
    'VETERAN APPLICATION FOR DD-217 DISCHARGE CERTIFICATE FRAME (24-SPRUCE)',
  type: 'object',
  additionalProperties: false,
  definitions: {
    ...commonDefinitions,
  },
};

export default fullSchema;
