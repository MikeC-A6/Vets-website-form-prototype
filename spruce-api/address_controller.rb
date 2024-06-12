require 'json'

class AddressController
  def self.verify(params)
    puts params

    # fake error generator
    status, error_message = handle_error_cases(params)
    if status > 0
      return [
        status,
        { 'Content-Type': 'application/json' },
        [
          {
            'Error Message': error_message,
            'Error Code': "#{status}"
          }.to_json
        ]
      ]
    end

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

  # if any params contain these strings,
  # return a forced error
  # it returns the first param with the text and throws out the rest
  def self.handle_error_cases(params)
    error_cases = %w[401-unauthorized 403-forbidden 404-not-found 500-internal-server-error 503-service-unavailable]

    text = ''

    params.values.each do |v|
      next unless error_cases.include?(v.downcase.strip)

      text = v

      break

    end

    case text
    when '401-unauthorized'
      puts 'forced unauthorized error'
      return [401, 'Unauthorized']
    when '403-forbidden'
      puts 'forced forbidden error'
      return [403, 'Forbidden']
    when '404-not-found'
      puts 'forced not found error'
      return [404, 'Resource not found']
    when '500-internal-server-error'
      puts 'forced internal server error'
      return [500, 'Internal Server Error']
    when '503-service-unavailable'
      puts 'forced service unavailable error'
      return [503, 'Service Unavailable']
    else
      return [0, nil]
    end
  end
end
