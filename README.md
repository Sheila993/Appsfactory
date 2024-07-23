# Amazon cheapest product (Snickers and Skittles)
This project implements the search in Amazon.DE for the cheapest product available for Snickers and Skittels. Each product is put in the cart and it is checked whether or not the price in the cart equals the offer price. Finally the user is redirected to the register page for new users.

The project is implemented using playwright in the javascript flavour. 

## Installation
After standard installation Playwright offers out of the box to run the test for firefox, chrome and Safari. Please install playwright following the instructions on https://playwright.dev/docs/intro

After that you may clone the repository in a directory and run the tests on the commandline with: "npx playwright test". 

## Configuration
By default only chrome browser is enabled in the playwrigth config file.

Please consider changing the playwright config file to your needs. A documentation can be found in https://playwright.dev/docs/test-configuration.

# DRY principles of the implementation
## Page objects
The objects of the amazon pages are implemented in the file Productandcart.js. Also the cookie file has its own page object file (Cookiesettings.js) so that it can be reused in other test cases.
