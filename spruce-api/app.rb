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

  rescue Exception => e
    handle_internal_server_error(e)
  end

  private

  def handle_missing_path
    [404,
     { 'Content-Type': 'application/json' },
     [{ message: 'Page not found' }.to_json]
    ]
  end

  def handle_internal_server_error(e)
    puts e.message

    [
      500,
      { 'Content-Type': 'application/json' },
      [
        {
          "Error Message": "Internal server error",
          "Error Code": "500"
        }.to_json
      ]
    ]
  end
end