# 24-SPRUCE API

# Requirements
1. `docker` || `docker compose`

## Run the API

### Docker
```
docker build . -t agilesix/spruce-api:latest
docker run -p 6543:6543 agilesix/spruce-api
```

or use `docker compose`

### Docker Compose
```
docker compose up spruce-api
```

# API Specifications

### verifyAddress endpoint specifications
1. Browse to http://localhost:6543/address_api

# API Endpoint usage
## verify Address endpoint usage example
1. http://localhost:6543/verifyAddress?AddressLine1=123%20Test%20Lane&City=Test&ZipCode=12345&State=CA&AddressLine2=%231259
2. Any missing required parameters will return a `400` HTTP Response along with a list of missing required parameters.