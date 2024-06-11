require_relative "app"
require 'rack/cors'

use Rack::Cors do
  allow do
    origins(ENV['ORIGINS'] || '*')
    resource(
      '*',
      headers: :any,
      methods: [:get, :patch, :put, :delete, :post, :options, :show]
    )
  end
end

run App.new