const { expect } = require('@playwright/test');
class Productandcart {
 constructor(page, criteria)
 {
   this.page = page;
   this.search = this.page.getByPlaceholder('Suche Amazon.de');
   this.empfohlen = this.page.locator('[aria-label= "Sortieren nach:"]').getByText('Empfohlen');
   this.criteria = this.page.getByLabel(criteria).getByText(criteria);
   this.einkaufswagen = this.page.getByRole('link', { name: 'Zum Einkaufswagen' });
 }
/**
 * Searches for items on Amazon.de and waits for the search results to load.
 *
 * @param {string} itemName - The name of the item to search for.
 */
async searchItems(itemName) {
  await expect(this.search).toBeVisible();
  await this.search.fill(itemName);
  await this.search.press('Enter');
  await this.page.waitForTimeout(2000);
}
 /**
 * Searches for items on Amazon.de and waits for the search results to load.
 *
 * @param {string} itemName - The name of the item to search for.
 */
async searchItems(itemName) {
  await expect(this.search).toBeVisible();
  await this.search.fill(itemName);
  await this.search.press('Enter');
  await this.page.waitForTimeout(2000);
}

  /**
 * Orders the items on Amazon.de by clicking the "Empfohlen" button and the "Sortieren nach" dropdown.
 */
async orderItems() {
    if (await this.empfohlen.isEnabled()) {
        await this.empfohlen.click();
    }
    await this.criteria.click({force: true});
}

  /**
 * Retrieves the price of the cheapest product in the search results.
 *
 * @returns {string} The price of the cheapest product in the format "€X,XX".
 */
async getCheapiestPrice() {
    // Adds the product to the cart
    await this.page.locator('[data-csa-c-content-id="s-search-add-to-cart-action"]').first().click({force: true});

    // Waits for the product container to be loaded
    await this.page.waitForSelector('.puis-card-container');
    await this.page.waitForSelector('.a-price');
    await this.page.waitForSelector('.a-offscreen');
    await this.page.waitForTimeout(1000);

    // Selects the first product in the container
    const prices = await this.page.locator('.puis-padding-right-small [data-cy="price-recipe"]')
      .filter({ has: this.page.locator('.a-price') })
      .filter({ has: this.page.locator('.a-offscreen') });

    // Retrieves the price of the cheapest product
    const cheapestPrice = await prices.first().locator('.a-offscreen').first().innerText();
    return cheapestPrice;
}

 /**
 * Retrieves the price of the selected product in the cart on Amazon.de.
 *
 * @returns {string} The total price of the selected product in the cart in the format "€X,XX".
 */
async getCartPrice() {
  // Then navigate to the cart
  await this.page.getByRole('link', { name: 'Zum Einkaufswagen' }).click({force: true});
  const cartprice = await this.page.locator('.sc-list-item').filter({has: this.page.locator('.sc-badge-price')}).filter({has: this.page.locator('.sc-product-price')});
  const cartPrice = await cartprice.first().locator('.sc-product-price').first().innerText();
  return cartPrice;
}
}
module.exports = {Productandcart};