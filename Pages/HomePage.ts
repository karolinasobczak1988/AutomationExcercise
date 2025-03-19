import { Locator, Page } from '@playwright/test';
import data from '../test data/data.json';

export class HomePage {
  private page: Page;
  public consentButton: Locator;
  public signupLoginButton: Locator;
  public productsButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signupLoginButton = this.page.getByRole('link', { name: 'Signup / Login' });
    this.consentButton = this.page.locator('p.fc-button-label', { hasText: 'Consent' });
    this.productsButton = this.page.getByRole('link', { name: 'Products' });
  }

  async acceptCookies() {
    if (await this.consentButton.isVisible({timeout: 5000})) {
        await this.consentButton.click();
        console.log("Cookies Accepted");
    }
      else (console.log("Consent button not found"))
  }

  async navigate() {
    await this.page.goto(data.url.autoExcerUrl);
  }

  async goToSignupLogin() {
    await this.signupLoginButton.click();
  }

  async goToProducts() {
    await this.productsButton.click()
  }
}
