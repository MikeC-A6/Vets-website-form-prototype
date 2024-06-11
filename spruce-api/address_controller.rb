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

    [
      200,
      { 'Content-Type': 'application/json' },
      [
        {
          AddressLine1: params['AddressLine1'],
          AddressLine2: params['AddressLine2'],
          City: params['City'],
          State: params['State'],
          'Zip Code': params['ZipCode'],
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
