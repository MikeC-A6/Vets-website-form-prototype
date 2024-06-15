/* eslint-disable camelcase */
module.exports = {
  data: {
    attributes: {
      profile: {
        sign_in: {
          service_name: 'idme',
        },
        email: 'fake@fake.com',
        loa: { current: 3 },
        first_name: 'Jane',
        middle_name: '',
        last_name: 'Doe',
        gender: 'F',
        birth_date: '1985-01-01',
        verified: true,
      },
      veteran_status: {
        status: 'OK',
        is_veteran: true,
        served_in_military: true,
      },
      in_progress_forms: [],
      prefills_available: ['24-SPRUCE'],
      services: [
        'facilities',
        'hca',
        'edu-benefits',
        'evss-claims',
        'form526',
        'user-profile',
        'health-records',
        'rx',
        'messaging',
      ],
      va_profile: {
        status: 'OK',
        birth_date: '1985-01-01',
        family_name: 'Doe',
        gender: 'F',
        given_names: ['Jane'],
        active_status: 'active',
        facilities: [
          {
            facility_id: '983',
            is_cerner: false,
          },
          {
            facility_id: '984',
            is_cerner: false,
          },
        ],
      },
    },
  },
  meta: { errors: null },
};
