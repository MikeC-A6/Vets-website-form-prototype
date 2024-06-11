require 'json'
require_relative 'address_controller'

class App
  def call(env)

    req = Rack::Request.new(env)
    path = req.path_info

    case path
    when "/verifyAddress"
      AddressController.verify(req.params)
    when "/address_api"
      [200, {}, [File.read("./address_api.yml")]]
    else
      handle_missing_path
    end
  end

  private

  def handle_missing_path
    [404,
     { 'Content-Type': 'application/json' },
     [{ message: 'Page not found' }.to_json]
    ]
  end
end