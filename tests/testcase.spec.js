const { test, expect } = require('@playwright/test');
const {Cookiesetting} = require('../pageobjects/Cookiesetting');
const {Productandcart} = require('../pageobjects/Productandcart');

test('Search for a product with cheapest price and verify the price', async ({ page })=> {

/**
 * Wrapper function for the "Kauf"- process:
 * Searches for a product, orders the items based on the specified criteria,
 * retrieves the price of the cheapest product found in the search results,
 * and verifies the price in the cart.
 *
 * @param {import('@playwright/test').Page} page - The Playwright page object.
 * @param {string} product - The name of the product to search for on Amazon.de.
 */
  async function kaufe(page, product) {
    const productandcart = new Productandcart(page, 'Preis: Aufsteigend');
    // Searches for the specified product on Amazon.de and navigates to the search results page.
    await productandcart.searchItems(product);
    
    // Orders the items based on the specified criteria.
    await productandcart.orderItems();
    
    // Retrieves the price of the cheapest product found in the search results.
    const offerprice = await productandcart.getCheapiestPrice();
    
    // Retrieves the price of the product in the cart.
    const cartPrice = await productandcart.getCartPrice();
    
    // Logs the cheapest price found in the search results and the price in the cart.
    console.log("Billigster Preis: ", offerprice, "\n Preis im Einkaufswagen: ", cartPrice);
    
    // Verifies the price in the cart.
    const cartPriceComplete = await page.textContent('.sc-list-item-content .sc-product-price');
    console.log('Price in the cart:', cartPriceComplete);
    // Compare offer price and cart price, it should be same.
    await expect(offerprice).toBe(cartPriceComplete);
  }

  try {
    await page.goto('https://www.amazon.de/');
    const cookiesetting = new Cookiesetting(page);
    await cookiesetting.verifyAndAcceptCookies(cookiesetting.page);
    await kaufe(page, 'snickers');
    await kaufe(page, 'skittles');
    const ZurKasse = page.getByLabel('Zur Kasse gehen Zur Kasse');
    await ZurKasse.click();
    //New user need to create an account using registration page.
    const Konto = page.getByRole('link', { name: 'Dein Amazon Konto erstellen' });
    await Konto.click();

  } catch (error) {
    console.error('An error occurred:', error);
  }
});
