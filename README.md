# Alpha for VA Form 24-SPRUCE

## Installing and running the Alpha
### 1. Install Docker:
- [Mac](https://docs.docker.com/desktop/mac/install/)
- [Windows](https://docs.docker.com/desktop/windows/install/)
- Linux
   - [Docker Engine](https://docs.docker.com/engine/install/#server)
   - [Docker Compose](https://docs.docker.com/compose/install/#install-compose-on-linux-systems) 

### 2.  Install git
- [Git - Installing Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

### 3. Get the source code
- Clone the agilesix copy of the VA.gov website provided by the VWO, and VA.gov git repos <strong>as sibling directories</strong>:
```sh
git clone git@github.com:agilesix/vets-website.git
git clone git@github.com:department-of-veterans-affairs/vagov-content.git
git clone git@github.com:department-of-veterans-affairs/content-build.git
```

### 4. Build the container
- Use Docker Compose to build the container, this will check out needed content repos into the container
```sh
cd vets-website
docker compose build
```
### 5. Run the container
- Use Docker Compose to run the container
```sh
docker compose up
```
 note this will take a few minutes to build the application. The command line will indicate that the container is completely ready with the terminal output:

```
vets-website-1  | webpack compiled successfully in ___ ms
```

### 6. Open the application
- [VA Form 24-SPRUCE](http://localhost:3001/supporting-forms-for-claims/frame-for-certificate-form-24-spruce/introduction)
- [Mock Address Service](http://localhost:3000/vetsapi/verifyAddress?AddressLine1=123%20Test%20lane&City=Test&State=CA&ZipCode=12345)

## Testing the Alpha automatically

#### 1.0 Ensure that any existing session are closed
- Close any browser open to the localhost address, e.g. http://localhost:3001/
- Use Docker Compose to stop the container
```sh
docker compose down
```

#### 1.1 Run the container
- Use Docker Compose to run the container
```sh
docker compose up
```

#### 1.2 Run the container to execute the unit tests with coverage
```sh
docker compose exec vets-website yarn test:coverage-app spruce-challenge-app
```

## Testing the Alpha manually

### 1. Verify address and service history pre-filled

#### 1.0 Ensure that any existing session are closed
- Close any browser open to the localhost address, e.g. http://localhost:3001/
- Use Docker Compose to stop the container
```sh
docker compose down
```

#### 1.1 Run the container
- Use Docker Compose to run the container
```sh
docker compose up
```

#### 1.2 Open the application
- [VA Form 24-SPRUCE](http://localhost:3001/supporting-forms-for-claims/frame-for-certificate-form-24-spruce/introduction)

#### 1.3 Mock log in:

- Go to your browser dev tools console and enter
`localStorage.setItem('hasSession', true)` 
  - Note: on Google Chrome, you may be required to type “allow pasting” when prompted
- Refresh the page. 

#### 1.4 Navigate through the form flow, when completing the form, fields should be populated with the following data: 
| Page      | Field | Pre-filled data |
| ----------- | ----------- | ----------- | 
 | /applicant/name-information | First name | Jane
 | /applicant/name-information | Middle name | 
 | /applicant/name-information | Last name | Doe
 | /applicant/name-information | Suffix | 
 | /applicant/name-information | Date of birth | January 1, 1985
 | /identifying-information | Social Security number (must have this or a VA file number) | 
 | /identifying-information | Department of Defense ID number (DoD ID number) | 
 | /identifying-information | Date of discharge | 
 | /applicant/contact-information | Email address | 
 | /applicant/contact-information | Phone number | 
 | /military-history/service-periods | Branch of service | Army
 | /military-history/service-periods | Service start date | March 21, 2001
 | /military-history/service-periods | Service end date | July 21, 2014
 | /military-history/service-periods | Grade, Rate or Rank at end of service period | Corporal
 | /military-history/service-periods | Duty assignment and major command | HHC 1ST BN
 | /frame-options | Choice of wood | 
 | /frame-options | Choice of mount | 
 | /shipping-information/mailing-address | Country | United States
 | /shipping-information/mailing-address | Street address line 1 | 123 MAIN ST
 | /shipping-information/mailing-address | Street address line 2 | BEN FRANKLIN VILLAGE
 | /shipping-information/mailing-address | City | SAN DIEGO
 | /shipping-information/mailing-address | State | California
 | /shipping-information/mailing-address | Zip code | 09028

### 2. Verify form validations

#### 2.0 Ensure that any existing session are closed
- Close any browser open to the localhost address, e.g. http://localhost:3001/
- Use Docker Compose to run the container
```sh
docker compose down
```

#### 2.1 Run the container
- Use Docker Compose to run the container
```sh
docker compose up
```

#### 2.2 Open the application
- [VA Form 24-SPRUCE](http://localhost:3001/supporting-forms-for-claims/frame-for-certificate-form-24-spruce/introduction)

#### 2.3 Navigate through the form flow Step 1 and follow the instructions in the "Test case" column, click continue to trigger the "Expected validation":

| Field      | Test case | Expected validation |
| ----------- | ----------- | ----------- | 
| First name | Leave blank | Blocks progress with "Please enter a first name"
| First name | Enter "J" | Blocks progress with "Enter a first name with 3 or more characters"
| First name | Enter "Jane" | Validation passes for this field
| Last name | Leave blank | Blocks progress with "Please enter a last name"
| Last name | Enter "D" | Blocks progress with "Enter a last name with 3 or more characters"
| Last name | Enter "Doe" | Validation passes for this field
| Date of birth | Leave blank | Blocks progress with "Please enter a date"
| Date of birth | Enter "January 2, 2020" | Blocks progress with "This birth date is too soon for you to have been discharged from the military. Enter a valid birth date."
| Date of birth | Enter "January 2, asdf" | Blocks progress with "Please enter a date."
| Date of birth | Enter "January 2, 1990" | Validation passes for this field

#### 2.4 Continue to the next form and follow the instructions in the "Test case" column, click continue to trigger the "Expected validation":

| Field      | Test case | Expected validation |
| ----------- | ----------- | ----------- | 
| Social Security Number | Leave blank | Blocks progress with "Enter a Social Security number or a Department of Defense ID number"
| Social Security Number | Enter "123-45-6789" | Blocks progress with "Please enter a valid 9 digit SSN (dashes allowed)"
| Social Security Number | Enter "001-01-0001" | Validation passes for this field
| Department of Defense ID number |  Leave blank | Blocks progress with "Enter a Social Security number or a Department of Defense ID number"
| Department of Defense ID number |  Enter "12345" | Blocks progress with "Department of Defense ID numbers are 10 digits"
| Department of Defense ID number |  Enter "1234567890" | Validation passes for this field
| Date of discharge | Leave blank | Blocks progress with "Enter a discharge date"
| Date of discharge | Enter "January 2, 2525" | Blocks progress with "Enter a year between 1900 and 2024"
| Date of discharge | Enter "January 2, 1990" | Validation passes for this field


#### 2.5 Continue to the next form and follow the instructions in the "Test case" column, click continue to trigger the "Expected validation":

| Field      | Test case | Expected validation |
| ----------- | ----------- | ----------- | 
| Phone Number | Enter "234-567" | Blocks progress with "Please enter a 10-digit phone number (with or without dashes)"
| Phone Number | Enter "555-555-1212" | Validation passes for this field
| Email address | Enter "invalid" | Blocks progress with "Enter a valid email address without spaces using this format: email@domain.com
| Email address | Enter "email@domain.com" | Validation passes for this field


#### 2.6 Continue to Step 2 and follow the instructions in the "Test case" column, click continue to trigger the "Expected validation":

| Field      | Test case | Expected validation |
| ----------- | ----------- | ----------- | 
| Branch of sevice | Leave blank | Blocks progress with "Please provide a response"
| Branch of sevice | Select 'Air Force' | Validation passes for this field
| Service start date | Leave blank | Blocks progress with "Please enter a date"
| Service start date | Enter "January 2, asdf" | Blocks progress with "Please enter a year between 1900 and 2124"
| Service start date | Enter "January 2, 2000" | Validation passes for this field
| Service end date | Leave blank | Blocks progress with "Please enter a date"
| Service end date | Enter "January 2, asdf" | Blocks progress with "Please enter a year between 1900 and 2124"
| Service end date | Enter "January 2, 1990" | Blocks progress with "End of service must be after start of service"
| Service end date | Enter "January 2, 2004" | Validation passes for this field
| Grade, rank, or rating | Leave blank | Content alert "Your rank was not entered for one or more service periods"
| Grade, rank, or rating | Enter "test" | Validation passes for this field
| Duty assignment | Leave blank | Blocks progress with "Please provide a response"
| Duty assignment | Enter "test" |  Validation passes for this field

#### 2.7 Continue to Step 3 and follow the instructions in the "Test case" column, click continue to trigger the "Expected validation":

| Field      | Test case | Expected validation |
| ----------- | ----------- | ----------- | 
| Choice of wood | Leave unselected | Blocks progress with "Please select a type of wood"
| Choice of wood | Select 'Cedar" | Validation passes for this field
| Choice of mount | Leave unselected | Blocks progress with "Please select a mounting style for your frame"
| Choice of mount | Select 'Wall mount" | Validation passes for this field

#### 2.8 Continue to Step 4 and follow the instructions in the "Test case" column, click continue to trigger the "Expected validation":

| Field      | Test case | Expected validation |
| ----------- | ----------- | ----------- | 
| Street address | Leave blank | Blocks progress with "Enter your full street address"
| Street address | Enter "test" |  Validation passes for this field
| City | Leave blank | Blocks progress with "Enter a valid city"
| City | Enter "test" |  Validation passes for this field
| State | Leave unselected | Blocks progress with "State is required"
| State | Select 'Alabama" | Validation passes for this field
| Postal Code | Leave blank | Blocks progress with "Zip code must be 5 digits"
| Postal Code | Enter "1234" |  Blocks progress with "Provide a valid postal code"
| Postal Code | Enter "12345" |  Validation passes for this field

#### 2.9 Continue to the next form and follow the instructions in the "Test case" column, click continue to trigger the "Expected validation":

| Field      | Test case | Expected validation |
| ----------- | ----------- | ----------- | 
| I have read and accept the privacy policy. | Leave unselected | Blocks progress with "You must accept the privacy policy before continuing."
| I have read and accept the privacy policy. | Check box | Validation passes for this field

