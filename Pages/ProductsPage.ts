import { expect, Locator, Page } from '@playwright/test';
import data from '../test data/data.json';
import { af_ZA } from '@faker-js/faker';

export class ProductsPage {
  private page: Page;


  public emailSignupTextbox: Locator;
  public signupButton: Locator;
  public emailLoginTextbox: Locator;
  public passwordLoginTextbox: Locator;
  public loginButton: Locator;
  public productA: Locator;
  public continueShoppingButton: Locator;
  public productB: Locator;
  public viewCardButton: Locator;



  constructor(page: Page) {
    this.page = page;
    this.continueShoppingButton = this.page.getByRole('button', { name: 'Continue Shopping' });
    this.productA = this.page.getByRole('heading', { name: data.products.product1 }).first();
    this.productB = this.page.locator('div.productinfo h2', { hasText: data.products.product2 });
    this.viewCardButton = this.page.getByRole('link', { name: 'View Cart' });
  
  }

  async orderProducts() {

   const productContainer = this.productA.locator('xpath=ancestor::div[contains(@class, "single-products")]');
   await productContainer.hover();
   const addToCartButton = productContainer.locator('.product-overlay .add-to-cart');
   await expect(addToCartButton).toBeVisible({ timeout: 5000 });
   await addToCartButton.click();

  }

  get orderConfirmation() {
    return this.page.getByText('Your product has been added to cart. View Cart');
  }

  async continueShopping() {
    await this.continueShoppingButton.click()
  }

  get emailPassIncorrect() {
  
    return this.page.getByText('Your email or password is');
  }

  async orderProducts2() {
   const productContainer = this.productB.locator('xpath=ancestor::div[contains(@class, "single-products")]');
   await productContainer.hover();
   const addToCartButton = productContainer.locator('.product-overlay .add-to-cart');
   await expect(addToCartButton).toBeVisible({ timeout: 5000 });
   await addToCartButton.click();

  }

  async goToCart() {
    await this.viewCardButton.click();
  }

  
  }

