const { expect } = require('@playwright/test');
class Cookiesetting {
 constructor(page)
 {
   this.page = page;
   this.cookie = page.getByRole('link', { name: 'Cookie- und Werbeeinstellungen' });
   this.reject = page.getByLabel('Alles ablehnen');
 }

 async verifyAndAcceptCookies(page) {
    // verify the texts are correctly shown
    await expect(page).toHaveTitle(/Amazon.de: Günstige Preise für Elektronik & Foto, Filme, Musik, Bücher, Games, Spielzeug & mehr/);
    //Accept or Reject cookies
    await this.cookie.click();
    await this.reject.click();
  }

}
module.exports = {Cookiesetting};