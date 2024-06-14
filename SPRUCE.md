# Alpha for VA Form 24-SPRUCE

## Setting up your local environment
## 1. Install Docker:
- [Mac](https://docs.docker.com/desktop/mac/install/)
- [Windows](https://docs.docker.com/desktop/windows/install/)
- Linux
   - [Docker Engine](https://docs.docker.com/engine/install/#server)
   - [Docker Compose](https://docs.docker.com/compose/install/#install-compose-on-linux-systems) 

## 2.  Install git
- [Git - Installing Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

## 3. Get the source code
- Clone the agilesix copy of the VA.gov website provided by the VWO

```sh
git clone git@github.com:agilesix/vets-website.git
```

## 4. Build the container
- Use Docker Compose to build the container, this will check out needed content repos into the container
```sh
cd vets-website
docker compose build
```
## 5. Run the container
- Use Docker Compose to run the container
```sh
docker compose up
```
 note this will take a few minutes to build the application. The command line will indicate that the container is completly ready with the terminal output:

```
vets-website-1  | webpack compiled successfully in ___ ms
```

## 6. Open the application
- [VA Form 24-SPRUCE](http://localhost:3001/supporting-forms-for-claims/frame-for-certificate-form-24-spruce/introduction)
- [Mock Address Service](http://localhost:3000/vetsapi/verifyAddress?AddressLine1=123%20Test%20lane&City=Test&State=CA&ZipCode=12345)
