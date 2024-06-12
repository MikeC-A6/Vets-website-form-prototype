require 'json'

class AddressController
  def self.verify(params)
    puts params
    verified, missing_params = verify_required_params(params)
    unless verified
      return [
        400,
        { 'Content-Type': 'application/json' },
        [
          {
            'Error Message': "Missing parameters for address verification: #{missing_params.join(', ')}.",
            'Error Code': "400"
          }.to_json
        ]
      ]
    end

    suggested_results = params.transform_values(&:upcase)

    [
      200,
      { 'Content-Type': 'application/json' },
      [
        {
          AddressLine1: suggested_results['AddressLine1'],
          AddressLine2: suggested_results['AddressLine2'],
          City: suggested_results['City'],
          State: suggested_results['State'],
          'Zip Code': suggested_results['ZipCode'],
        }.to_json
      ]
    ]
  end

  private

  def self.required_params
    %w[AddressLine1 City State ZipCode]
  end

  def self.verify_required_params(params)
    verified = true
    missing_params = []
    required_params.each do |param|
      unless params.include?(param)
        verified = false
        missing_params << param
      end
    end
    [verified, missing_params]
  end
end
